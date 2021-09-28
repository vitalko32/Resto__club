import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { DataService } from './data.service';
import { OrderService } from './order.service';
import { CatRepository } from './repositories/cat.repository';
import { ProductRepository } from './repositories/product.repository';
import { ServingRepository } from './repositories/serving.repository';
import { WordRepository } from './repositories/word.repository';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        AppService,
        DataService,      
        OrderService,          
        WordRepository,        
        CatRepository,
        ProductRepository,
        ServingRepository,
    ],
})
export class ServicesModule {}
