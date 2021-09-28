import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { ProductsModule } from "./products/products.module";
import { ServingsModule } from "./servings/servings.module";
import { TablesModule } from "./tables/tables.module";
import { WordsModule } from "./words/words.module";

@Module({
    imports: [               
        TablesModule,
        WordsModule,
        CatsModule,
        ProductsModule,
        ServingsModule,
    ],
    providers: [],
})
export class CustomerAPIModule {}
