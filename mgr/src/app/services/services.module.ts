import { NgModule } from '@angular/core';

import { AppService } from './app.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ErrorService } from './error.service';
import { AdmingroupRepository } from './repositories/admingroup.repository';
import { AdminRepository } from './repositories/admin.repository';
import { UploadService } from './upload.service';
import { AdmLangRepository } from './repositories/admlang.repository';
import { SlugService } from './slug.service';
import { SettingRepository } from "./repositories/setting.repository";
import { LangRepository } from './repositories/lang.repository';
import { WordbookRepository } from './repositories/wordbook.repository';
import { MailtemplateRepository } from './repositories/mailtemplate.repository';
import { CurrencyRepository } from './repositories/currency.repository';
import { EmployeeStatusRepository } from './repositories/employee.status.repository';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { EmployeeRepository } from './repositories/employee.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { HallRepository } from './repositories/hall.repository';
import { IconRepository } from './repositories/icon.repository';
import { CatRepository } from './repositories/cat.repository';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
		AppService,
		ErrorService,
		DataService,
		AdmLangRepository,
		AuthService,
		AuthGuard,
		UploadService,
		SlugService,
		AdmingroupRepository,
		AdminRepository,		
		SettingRepository,
		LangRepository,
		WordbookRepository,
		MailtemplateRepository,		
		CurrencyRepository,		
		EmployeeRepository,
		EmployeeStatusRepository,
		RestaurantRepository,
		TransactionRepository,
		HallRepository,
		IconRepository,
		CatRepository,
	],
})
export class ServicesModule { }
