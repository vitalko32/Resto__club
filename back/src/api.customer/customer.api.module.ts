import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { TablesModule } from "./tables/tables.module";
import { WordsModule } from "./words/words.module";

@Module({
    imports: [               
        TablesModule,
        WordsModule,
        CatsModule,
    ],
    providers: [],
})
export class CustomerAPIModule {}
