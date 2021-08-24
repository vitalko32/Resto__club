import { Module } from "@nestjs/common";
import { AdminsModule } from "./admins/admins.module";
import { LangsModule } from "./langs/langs.module";
import { SettingsModule } from "./settings/settings.module";
import { WordsModule } from "./words/words.module";



@Module({
    imports: [        
        AdminsModule,
        LangsModule,
        SettingsModule,
        WordsModule,
    ],
    providers: [],
})
export class OwnerAPIModule {}
