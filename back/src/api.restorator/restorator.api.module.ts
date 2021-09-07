import { Module } from "@nestjs/common";
import { EmployeesModule } from "./employees/employees.module";
import { LangsModule } from "./langs/langs.module";
import { SettingsModule } from "./settings/settings.module";
import { WordsModule } from "./words/words.module";

@Module({
    imports: [               
        LangsModule,
        SettingsModule,
        WordsModule,        
        EmployeesModule,
    ],
    providers: [],
})
export class RestoratorAPIModule {}
