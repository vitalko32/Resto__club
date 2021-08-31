import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { Admin } from "src/model/orm/admin.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { CronService } from "./cron.service";

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Admin,
            Restaurant,
        ]),        
    ],    
    providers: [CronService],    
})
export class CronModule {}
