import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { Admin } from "src/model/orm/admin.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { Setting } from "src/model/orm/setting.entity";
import { CronService } from "./cron.service";
import { NotificationService } from "./notification.service";

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Admin,
            Restaurant,
            Setting,
        ]),        
    ],    
    providers: [
        CronService,
        NotificationService,
    ],    
})
export class CronModule {}
