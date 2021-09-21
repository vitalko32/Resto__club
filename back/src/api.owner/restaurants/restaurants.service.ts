import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Restaurant } from "../../model/orm/restaurant.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IRestaurantCreate } from "./dto/restaurant.create.interface";
import { Employee } from "src/model/orm/employee.entity";
import { IRestaurantUpdate } from "./dto/restaurant.update.interface";
import { MailService } from "src/common/mail.service";
import { Admin } from "src/model/orm/admin.entity";
import { IRestaurantRecharge } from "./dto/restaurant.recharge.interface";
import { Transaction, TransactionType } from "src/model/orm/transaction.entity";
import { Setting } from "src/model/orm/setting.entity";
import { db_name, db_schema } from "src/options";
import { IRestaurant } from "./dto/restaurant.interface";

@Injectable()
export class RestaurantsService extends APIService {
    constructor (
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        private mailService: MailService,
    ) {
        super();
    }    
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<IRestaurant[]>> {
        try {
            const strPrice: string = (await this.settingRepository.findOne({where: {p: "price"}}))?.v;
            const price: number = strPrice ? parseFloat(strPrice) : 999999999;
            const sortBy: string = dto.sortBy !== "daysleft" ? `r.${dto.sortBy}` : dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;            
            const t_restaurants: string = `${db_name}.${db_schema}.vne_restaurants`;
            const t_employees: string = `${db_name}.${db_schema}.vne_employees`;
            let filterStatement: string = "TRUE";
            let havingStatement: string = "TRUE";

            if (dto.filter.active !== undefined) {                
                filterStatement += dto.filter.active ? ` AND r.money >= 0` : ` AND r.money < 0`;                
            }     
            
            if (dto.filter.name) {
                filterStatement += ` AND LOWER(r.name) LIKE LOWER('%${dto.filter.name}%')`;
            }

            if (dto.filter.daysleft) {
                havingStatement += ` AND r.money / NULLIF(COUNT(DISTINCT e.id) * ${price}, 0) = '${dto.filter.daysleft}'`;
            }            
            
            const mainStatement: string = `
                SELECT 
                    r.*, 
                    CAST(COUNT(DISTINCT e.id) AS INT) AS employees_q,
                    CAST(r.money / NULLIF(COUNT(DISTINCT e.id) * ${price}, 0) AS INT) AS daysleft
                FROM ${t_restaurants} AS r
                LEFT JOIN ${t_employees} AS e ON r.id=e.restaurant_id
                WHERE ${filterStatement}                
                GROUP BY r.id
                HAVING ${havingStatement}
                ORDER BY ${sortBy} ${sortDir}                                                
            `;
            const chunkStatement: string = `LIMIT ${q} OFFSET ${from}`;   
            const countStatement: string = `SELECT CAST(COUNT(*) AS INT) AS count FROM (${mainStatement}) AS t`;            
            const data: IRestaurant[] = await getManager().query(`${mainStatement} ${chunkStatement}`);
            const allLength: number = (await getManager().query(countStatement))[0]?.count || 0;

            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IRestaurantCreate): Promise<IAnswer<void>> {        
        try {
            let employee = await this.employeeRepository.findOne({where: {email: dto.employees[0].email}});

            if (employee) {
                return {statusCode: 409, error: "employee email in use"};    
            }
            
            let rawPassword = dto.employees[0].password;
            dto.employees[0].password = bcrypt.hashSync(dto.employees[0].password, 10);
            let x: Restaurant = this.restaurantRepository.create(dto);            
            await this.restaurantRepository.save(x);
            // mail
            x = await this.restaurantRepository.findOne(x.id, {relations: ["currency", "employees", "lang"]});
            x.employees[0].password = rawPassword;
            this.mailService.mailEmployeeRestaurantCreated(x);

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async one(id: number): Promise<IAnswer<Restaurant>> {
        try {
            let data: Restaurant = await this.restaurantRepository.findOne(id);                   
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "restaurant not found"};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IRestaurantUpdate): Promise<IAnswer<void>> {
        try {             
            let x: Restaurant = this.restaurantRepository.create(dto);
            await this.restaurantRepository.save(x);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }    

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.restaurantRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }  

    public async recharge(dto: IRestaurantRecharge): Promise<IAnswer<void>> {
        try {
            if (!(await this.validateAdmin(dto.admin_id, dto.admin_password))) {
                return {statusCode: 401};
            }

            let x: Restaurant = await this.restaurantRepository.findOne(dto.restaurant_id);

            if (!x) {
                return {statusCode: 404, error: "restaurant not found"};
            }

            x.money += dto.amount;
            await this.restaurantRepository.save(x);
            let t = new Transaction();
            t.amount = dto.amount;
            t.restaurant_id = dto.restaurant_id;
            t.type = TransactionType.Admin;
            await this.transactionRepository.save(t);

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.recharge: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }  
    }
    
    private async validateAdmin(id: number, password: string): Promise<boolean> {
        let admin: Admin = await this.adminRepository
            .createQueryBuilder("admin")
            .addSelect("admin.password")
            .where({id})
            .getOne();      
        
        return admin && admin.active && await this.comparePassHash(password, admin.password);        
    }
}
