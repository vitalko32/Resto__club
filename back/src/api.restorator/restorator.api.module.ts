import { Module } from "@nestjs/common";
import { EmployeeStatusesModule } from "./employee.statuses/employee.statuses.module";
import { EmployeesModule } from "./employees/employees.module";
import { HallsModule } from "./halls/halls.module";
import { LangsModule } from "./langs/langs.module";
import { SettingsModule } from "./settings/settings.module";
import { WordsModule } from "./words/words.module";

@Module({
    imports: [               
        LangsModule,
        SettingsModule,
        WordsModule,        
        EmployeesModule,
        EmployeeStatusesModule,
        HallsModule,
    ],
    providers: [],
})
export class RestoratorAPIModule {}
