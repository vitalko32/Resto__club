import { NgModule } from '@angular/core';
import { AdminGuard } from './admin.guard';

import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ErrorService } from './error.service';
import { FilesService } from './files.service';
import { GoogleService } from './google.service';
import { CatRepository } from './repositories/cat.repository';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeStatusRepository } from './repositories/employee.status.repository';
import { HallRepository } from './repositories/hall.repository';
import { IconRepository } from './repositories/icon.repository';
import { LangRepository } from './repositories/lang.repository';
import { ProductRepository } from './repositories/product.repository';
import { SettingRepository } from './repositories/setting.repository';
import { WordRepository } from './repositories/word.repository';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        AuthGuard,
        AdminGuard,
        AppService,
        DataService,        
        ErrorService,
        GoogleService,
        AuthService,       
        FilesService, 
        LangRepository,
        WordRepository,
        SettingRepository,     
        EmployeeStatusRepository,     
        EmployeeRepository,
        HallRepository,
        CatRepository,
        IconRepository,
        ProductRepository,
    ],
})
export class ServicesModule {}
