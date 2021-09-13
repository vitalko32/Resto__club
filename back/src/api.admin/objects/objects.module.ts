import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ObjectsController } from "./objects.controller";
import { ObjectsService } from "./objects.service";
import { jwtConstants } from "../../common/auth.constants";
import { Admin } from "../../model/orm/admin.entity";
import { Setting } from "src/model/orm/setting.entity";
import { Lang } from "src/model/orm/lang.entity";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { Currency } from "src/model/orm/currency.entity";
import { EmployeeStatus } from "src/model/orm/employee.status.entity";
import { EmployeeStatusTranslation } from "src/model/orm/employee.status.translation.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { Employee } from "src/model/orm/employee.entity";
import { Hall } from "src/model/orm/hall.entity";

@Module({
	controllers: [ObjectsController],
	providers: [ObjectsService],
	imports: [		
		JwtModule.register(jwtConstants),			
		TypeOrmModule.forFeature([
			Admin,
			Setting,
			Lang,
			Wordbook,			
			Mailtemplate,			
			Currency,	
			Employee,
			EmployeeStatus,
			EmployeeStatusTranslation,
			Restaurant,
			Hall,
		]),
	],
})
export class ObjectsModule {}
