import { Module } from "@nestjs/common";
import { LangsModule } from "./langs/langs.module";
import { SettingsModule } from "./settings/settings.module";
import { WordsModule } from "./words/words.module";

@Module({
    imports: [               
        LangsModule,
        SettingsModule,
        WordsModule,        
    ],
    providers: [],
})
export class RestoratorAPIModule {}
