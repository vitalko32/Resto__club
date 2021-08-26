import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeStatus } from "src/model/orm/employee.status.entity";
import { EmployeeStatusTranslation } from "src/model/orm/employee.status.translation.entity";

import { Lang } from "src/model/orm/lang.entity";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";
import { Word } from "src/model/orm/word.entity";
import { WordTranslation } from "src/model/orm/word.translation.entity";
import { jwtConstants } from "../../common/auth.constants";
import { LangsController } from "./langs.controller";
import { LangsService } from "./langs.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Lang,
            Word,
            WordTranslation,
            Mailtemplate, 
            MailtemplateTranslation,
            EmployeeStatus,
            EmployeeStatusTranslation,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [LangsService],
    controllers: [LangsController],
})
export class LangsModule {}
