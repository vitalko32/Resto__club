import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { EmployeeStatusesModule } from "./employee.statuses/employee.statuses.module";
import { EmployeesModule } from "./employees/employees.module";
import { FilesModule } from "./files/files.module";
import { HallsModule } from "./halls/halls.module";
import { IconsModule } from "./icons/icons.module";
import { LangsModule } from "./langs/langs.module";
import { ObjectsModule } from "./objects/objects.module";
import { OrdersModule } from "./orders/orders.module";
import { ProductsModule } from "./products/products.module";
import { QRModule } from "./qr/qr.module";
import { ServingsModule } from "./servings/servings.module";
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
        CatsModule,
        IconsModule,
        ProductsModule,
        OrdersModule,
        ServingsModule,
        QRModule,       
        ObjectsModule, 
        FilesModule,
    ],
    providers: [],
})
export class RestoratorAPIModule {}
