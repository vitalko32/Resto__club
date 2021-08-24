import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Not, Repository } from "typeorm";
import { APIService } from "src/common/api.service";
import { IAnswer } from "src/model/answer.interface";
import { Admin } from "src/model/orm/admin.entity";
import { IAdminGoogleData } from "./dto/admin.googledata.interface";
import { IAdminAuthData } from "./dto/admin.authdata.interface";
import { IAdminLogin } from "./dto/admin.login.interface";

@Injectable()
export class AdminsService extends APIService {
    constructor (
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        private jwtService: JwtService,               
    ) {
        super();
    }

    public async login(dto: IAdminLogin): Promise<IAnswer<IAdminAuthData>> {
        try {            
            let admin: Admin = await this.validateAdmin(dto.email, dto.password);

            if (!admin) {
                return {statusCode: 401, error: "Unauthorized"};               
            } 

            const payload: Object = {username: admin.email, sub: admin.id};
            return {statusCode: 200, data: {token: this.jwtService.sign(payload), admin}};
        } catch (err) {
            let errTxt: string = `Error in AdminsService.login: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async loginWithGoogle(dto: IAdminGoogleData): Promise<IAnswer<IAdminAuthData>> {
        try {
            let admin: Admin = await this.adminRepository.findOne({where: {email: dto.email}});
            
            if (!admin || !admin.active) {
                return {statusCode: 401, error: "Unauthorized"};
            }

            const payload: Object = {username: admin.email, sub: admin.id};    
            return {statusCode: 200, data: {token: this.jwtService.sign(payload), admin}};            
        } catch (err) {
            let errTxt: string = `Error in AdminsService.loginWithGoogle: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    

    /*public async update(dto: ICustomerUpdate): Promise<IAnswer<void>> {
        try {
            let emailExist: boolean = !!await this.customerRepository.findOne({where: {email: dto.email, id: Not(dto.id)}});            

            if (emailExist) {
                return {statusCode: 409, error: "e-mail already in use"};
            }
            
            let slugChecked: boolean = await this.checkSlug(dto);
            
            if (!slugChecked) {
                return {statusCode: 410, error: "slug duplication"};                
            }

            let x: Customer = this.customerRepository.create(dto);

            if (x.password) {                
                x.password = bcrypt.hashSync(dto.password, 10);
            } else {
                delete x.password; // if we got empty or null password, then it will not change in DB
            }

            await this.customerRepository.save(x);       
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in CustomersService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }  */

    

    

    private async validateAdmin(email: string, password: string): Promise<Admin> {
        let admin: Admin = await this.adminRepository
            .createQueryBuilder("admin")
            .addSelect("admin.password")
            .where({email})
            .getOne();      
        
        if (admin && admin.active && await this.comparePassHash(password, admin.password)) {            
            delete admin.password;
            return admin;
        } else {            
            return null;
        }
    }
}