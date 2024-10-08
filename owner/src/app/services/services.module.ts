import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ErrorService } from './error.service';
import { GoogleService } from './google.service';
import { CurrencyRepository } from './repositories/currency.repository';
import { LangRepository } from './repositories/lang.repository';
import { OrderRepository } from './repositories/order.repository';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { SettingRepository } from './repositories/setting.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { WordRepository } from './repositories/word.repository';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        AppService,
        DataService,        
        ErrorService,
        GoogleService,
        AuthService,
        AuthGuard,
        LangRepository,
        WordRepository,
        SettingRepository,  
        RestaurantRepository,     
        //RestaurantActiveRepository,
        //RestaurantInactiveRepository,
        CurrencyRepository,
        TransactionRepository,
        OrderRepository,
    ],
})
export class ServicesModule {}
