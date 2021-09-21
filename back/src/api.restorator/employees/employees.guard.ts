import { Injectable, CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmployeesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {        
        try {
            const token: string = context.switchToHttp().getRequest().headers["token"];        
            this.jwtService.verify(token);      
            const id: number = this.jwtService.decode(token)["id"];
            const employee: Employee = await this.employeeRepository.findOne(id, {relations: ["restaurant"]});

            if (!employee || !employee.restaurant) {
                throw new HttpException({statusCode: 403, error: "unauthorized"}, 200);                
            }
            
            return true;
        } catch (err) {
            throw new HttpException({statusCode: 403, error: err.name}, 200);
        }        
    }
}