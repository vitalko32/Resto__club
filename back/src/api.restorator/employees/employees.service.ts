import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/answer.interface";
import { Employee } from "src/model/orm/employee.entity";
import { IEmployeeAuthData } from "./dto/employee.authdata.interface";
import { IEmployeeLogin } from "./dto/employee.login.interface";
import { IEmployeeLoginByEmail } from "./dto/employee.loginbyemail.interface";
import { Setting } from "src/model/orm/setting.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { IRestaurant } from "./dto/restaurant.interface";
import { IEmployee } from "./dto/employee.interface";
import { IEmployeeSetStatus } from "./dto/employee.setstatus.interface";
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { Sortdir } from "src/model/sortdir.type";

@Injectable()
export class EmployeesService extends APIService {
    constructor (
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        private jwtService: JwtService,               
    ) {
        super();
    }

    public async login(dto: IEmployeeLogin): Promise<IAnswer<IEmployeeAuthData>> {
        try {            
            let employee: IEmployee = await this.validateEmployee(dto.email, dto.password);

            if (!employee || !employee.restaurant) {
                return {statusCode: 401, error: "Unauthorized"};               
            }             

            employee.restaurant.daysleft = await this.getRestaurantDaysleft(employee.restaurant);
            const payload: Object = {username: employee.email, sub: employee.id};
            return {statusCode: 200, data: {token: this.jwtService.sign(payload), employee}};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.login: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async loginByEmail(dto: IEmployeeLoginByEmail): Promise<IAnswer<IEmployeeAuthData>> {
        try {
            let employee: IEmployee = await this.getEmployeeByEmail(dto.email);
            
            if (!employee || !employee.restaurant) {
                return {statusCode: 401, error: "Unauthorized"};
            }

            employee.restaurant.daysleft = await this.getRestaurantDaysleft(employee.restaurant);
            const payload: Object = {username: employee.email, sub: employee.id};    
            return {statusCode: 200, data: {token: this.jwtService.sign(payload), employee}};            
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.loginByEmail: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async setStatus(dto: IEmployeeSetStatus): Promise<IAnswer<void>> {
        try {
            let employee = await this.employeeRepository.findOne(dto.employee_id);

            if (!employee) {
                return {statusCode: 404, error: "employee not found"};
            }

            employee.employee_status_id = dto.employee_status_id;
            await this.employeeRepository.save(employee);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.setStatus: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
    
    public async check(id: number): Promise<IAnswer<IEmployee>> { // проверка актуальности аккаунта и подгрузка актуальных данных
        try {                                    
            let employee: IEmployee = await this.getEmployeeById(id);
                        
            if (!employee || !employee.restaurant) {
                return {statusCode: 403, error: "access forbidden"};
            }
            
            employee.restaurant.daysleft = await this.getRestaurantDaysleft(employee.restaurant);
            return {statusCode: 200, data: employee};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.check: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<IEmployee[]>> {
        try {
            let sortBy: string = dto.sortBy;
            let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            let from: number = dto.from;
            let q: number = dto.q;
            let filter: string = "TRUE"; 

            if (dto.filter.created_at[0]) {
                let from: string = this.mysqlDate(new Date(dto.filter.created_at[0]));
                let to: string = dto.filter.created_at[1] ? this.mysqlDate(new Date(dto.filter.created_at[1])) : from;
                filter += ` AND e.created_at BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`;
            }

            if (dto.filter.name) {
                filter += ` AND LOWER(e.name) LIKE LOWER('%${dto.filter.name}%')`;
            }

            if (dto.filter.restaurant_id) {
                filter += ` AND e.restaurant_id = '${dto.filter.restaurant_id}'`;
            }

            let query = this.employeeRepository.createQueryBuilder("e").where(filter);
            let data: IEmployee[] = await query
                .leftJoinAndSelect("e.status", "status")
                .leftJoinAndSelect("status.translations", "translations")
                .orderBy({[`e.${sortBy}`]: sortDir})
                .take(q)
                .skip(from)
                .getMany();
            let allLength: number = await query.getCount();

            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in EmployeesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    ///////////////////////////////
    private getEmployeeByEmail(email: string): Promise<IEmployee> {
        return this.employeeRepository
            .createQueryBuilder("employee")
            .leftJoinAndSelect("employee.restaurant", "restaurant")
            .loadRelationCountAndMap("restaurant.employees_q", "restaurant.employees")
            .where({email})
            .getOne();
    }

    private getEmployeeById(id: number): Promise<IEmployee> {
        return this.employeeRepository
            .createQueryBuilder("employee")
            .leftJoinAndSelect("employee.restaurant", "restaurant")
            .loadRelationCountAndMap("restaurant.employees_q", "restaurant.employees")
            .where({id})
            .getOne();
    }    

    private async validateEmployee(email: string, password: string): Promise<IEmployee> {
        let employee: Employee = await this.employeeRepository
            .createQueryBuilder("employee")
            .addSelect("employee.password")
            .leftJoinAndSelect("employee.restaurant", "restaurant")
            .loadRelationCountAndMap("restaurant.employees_q", "restaurant.employees")
            .where({email})
            .getOne();      
        
        if (employee && await this.comparePassHash(password, employee.password)) {            
            delete employee.password;            
            return employee;
        } else {            
            return null;
        }
    }

    private async getRestaurantDaysleft(r: IRestaurant): Promise<number> {
        const strPrice: string = (await this.settingRepository.findOne({where: {p: "price"}}))?.v;
        const price: number = strPrice ? parseInt(strPrice) : 999999999;

        return Math.floor(r.money / (price * r.employees_q));
    }
}