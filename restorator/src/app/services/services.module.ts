import { NgModule } from '@angular/core';
import { AdminGuard } from './admin.guard';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ErrorService } from './error.service';
import { FilesService } from './files.service';
import { FinanceGuard } from './finance.guard';
import { GoogleService } from './google.service';
import { CatRepository } from './repositories/cat.repository';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeStatusRepository } from './repositories/employee.status.repository';
import { HallRepository } from './repositories/hall.repository';
import { IconRepository } from './repositories/icon.repository';
import { LangRepository } from './repositories/lang.repository';
import { OrderMyRepository } from './repositories/order.my.repository';
import { OrderNewRepository } from './repositories/order.new.repository';
import { OrderRepository } from './repositories/order.repository';
import { ProductRepository } from './repositories/product.repository';
import { ServingRepository } from './repositories/serving.repository';
import { SettingRepository } from './repositories/setting.repository';
import { StatsRepository } from './repositories/stats.repository';
import { WordRepository } from './repositories/word.repository';
import { WSServerRepository } from './repositories/wsserver.repository';
import { SocketService } from './socket.service';
import { SoundService } from './sound.service';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        AuthGuard,
        AdminGuard,
        FinanceGuard,
        AppService,
        DataService,        
        ErrorService,
        GoogleService,
        AuthService,       
        FilesService, 
        SocketService,
        SoundService,
        LangRepository,
        WordRepository,
        SettingRepository,     
        EmployeeStatusRepository,     
        EmployeeRepository,
        HallRepository,
        CatRepository,
        IconRepository,
        ProductRepository,
        OrderNewRepository,
        OrderMyRepository,
        OrderRepository,
        ServingRepository,    
        WSServerRepository,    
        StatsRepository,
    ],
})
export class ServicesModule {}
