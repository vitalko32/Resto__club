import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ErrorService } from './error.service';
import { LangRepository } from './repositories/lang.repository';
import { SettingRepository } from './repositories/setting.repository';
import { WordRepository } from './repositories/word.repository';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        AppService,
        DataService,        
        ErrorService,
        AuthService,
        AuthGuard,
        LangRepository,
        WordRepository,
        SettingRepository,         
    ],
})
export class ServicesModule {}
