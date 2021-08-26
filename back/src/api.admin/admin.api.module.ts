import { Module } from "@nestjs/common";

import { AdminsModule } from "./admins/admins.module";
import { AdmingroupsModule } from "./admingroups/admingroups.module";
import { ObjectsModule } from "./objects/objects.module";
import { FilesModule } from "./files/files.module";
import { SettingsModule } from "./settings/settings.module";
import { LangsModule } from "./langs/langs.module";
import { WordbooksModule } from "./wordbooks/wordbooks.module";
import { MailtemplatesModule } from "./mailtemplates/mailtemplates.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { EmployeeStatusesModule } from "./employee.statuses/employee.statuses.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { EmployeesModule } from "./employees/employees.module";

@Module({
    imports: [        
        ObjectsModule,
        FilesModule,
        AdminsModule,
        AdmingroupsModule,            
        SettingsModule,
        LangsModule,
        WordbooksModule,        
        MailtemplatesModule,    
        CurrenciesModule,
        EmployeesModule,
        EmployeeStatusesModule,        
        RestaurantsModule,        
    ],
    providers: [],
})
export class AdminAPIModule {}
