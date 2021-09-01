import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { IAnswer } from "src/model/answer.interface";
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Restaurant } from "../../model/orm/restaurant.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IRestaurantCreate } from "./dto/restaurant.create.interface";
import { Employee } from "src/model/orm/employee.entity";
import { IRestaurantUpdate } from "./dto/restaurant.update.interface";
import { MailService } from "src/common/mail.service";

@Injectable()
export class RestaurantsService extends APIService {
    constructor (
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        private mailService: MailService,
    ) {
        super();
    }    
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<Restaurant[]>> {
        try {
            let sortBy: string = dto.sortBy;
            let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            let from: number = dto.from;
            let q: number = dto.q;
            let filter: string = "TRUE";

            if (dto.filter.active !== undefined) {                
                filter += dto.filter.active ? ` AND restaurants.active_until >= NOW()` : ` AND (restaurants.active_until < NOW() OR restaurants.active_until IS NULL)`;                
            }     
            
            if (dto.filter.name) {
                filter += ` AND LOWER(restaurants.name) LIKE LOWER('%${dto.filter.name}%')`;
            }

            if (dto.filter.active_until[0]) {
                let from: string = this.mysqlDate(new Date(dto.filter.active_until[0]));
                let to: string = dto.filter.active_until[1] ? this.mysqlDate(new Date(dto.filter.active_until[1])) : from;
                filter += ` AND active_until BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`;
            }
            
            let query = this.restaurantRepository.createQueryBuilder("restaurants").where(filter);
            let data: Restaurant[] = await query.orderBy({[`restaurants.${sortBy}`]: sortDir}).take(q).skip(from).getMany();
            let allLength: number = await query.getCount();
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IRestaurantCreate): Promise<IAnswer<Restaurant>> {        
        try { 
            let restaurant = await this.restaurantRepository.findOne({where: {domain: dto.domain}});            

            if (restaurant) {
                return {statusCode: 409, error: "restaurant domain in use"};    
            }

            let employee = await this.employeeRepository.findOne({where: {email: dto.employees[0].email}});

            if (employee) {
                return {statusCode: 410, error: "employee email in use"};    
            }
            
            let rawPassword = dto.employees[0].password;
            dto.employees[0].password = bcrypt.hashSync(dto.employees[0].password, 10);
            let x: Restaurant = this.restaurantRepository.create(dto);            
            await this.restaurantRepository.save(x);
            // mail
            x = await this.restaurantRepository.findOne(x.id, {relations: ["currency", "employees", "lang"]});
            x.employees[0].password = rawPassword;
            this.mailService.mailEmployeeRestaurantCreated(x);

            return {statusCode: 200, data: x};
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

    public async update(dto: IRestaurantUpdate): Promise<IAnswer<Restaurant>> {
        try {             
            let x: Restaurant = this.restaurantRepository.create(dto);
            await this.restaurantRepository.save(x);            
            return {statusCode: 200, data: x};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async prolong(dto: IRestaurantUpdate): Promise<IAnswer<Restaurant>> {
        try {             
            let x: Restaurant = this.restaurantRepository.create(dto);
            x.prolonged_at = new Date();
            await this.restaurantRepository.save(x);            
            return {statusCode: 200, data: x};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.prolong: ${String(err)}`;
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
}
