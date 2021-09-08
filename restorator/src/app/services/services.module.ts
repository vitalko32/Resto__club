import { NgModule } from '@angular/core';
import { AdminGuard } from './admin.guard';

import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ErrorService } from './error.service';
import { GoogleService } from './google.service';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeStatusRepository } from './repositories/employee.status.repository';
import { LangRepository } from './repositories/lang.repository';
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
        LangRepository,
        WordRepository,
        SettingRepository,     
        EmployeeStatusRepository,     
        EmployeeRepository,
    ],
})
export class ServicesModule {}
