import { Module } from "@nestjs/common";
import { AdminsModule } from "./admins/admins.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { LangsModule } from "./langs/langs.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { SettingsModule } from "./settings/settings.module";
import { WordsModule } from "./words/words.module";

@Module({
    imports: [        
        AdminsModule,
        LangsModule,
        SettingsModule,
        WordsModule,
        RestaurantsModule,
        CurrenciesModule,
    ],
    providers: [],
})
export class OwnerAPIModule {}
