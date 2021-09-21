import { Injectable, CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminsGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {        
        try {
            const token: string = context.switchToHttp().getRequest().headers["token"];        
            this.jwtService.verify(token);      
            const id: number = this.jwtService.decode(token)["id"];
            const admin: Admin = await this.adminRepository.findOne(id);

            if (!admin || !admin.active) {
                throw new HttpException({statusCode: 403, error: "unauthorized"}, 200);                
            }
            
            return true;
        } catch (err) {
            throw new HttpException({statusCode: 403, error: err.name}, 200);
        }        
    }
}