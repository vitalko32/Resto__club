import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAPIModule } from './api.admin/admin.api.module';
import { OwnerAPIModule } from './api.owner/owner.api.module';
import { RestoratorAPIModule } from './api.restorator/restorator.api.module';
import { TestAPIModule } from './api.test/test.api.module';
import { CronModule } from './cron/cron.module';
import { Admin } from './model/orm/admin.entity';
import { Admingroup } from './model/orm/admingroup.entity';
import { Cat } from './model/orm/cat.entity';
import { Currency } from './model/orm/currency.entity';
import { Employee } from './model/orm/employee.entity';
import { EmployeeStatus } from './model/orm/employee.status.entity';
import { EmployeeStatusTranslation } from './model/orm/employee.status.translation.entity';
import { Hall } from './model/orm/hall.entity';
import { Icon } from './model/orm/icon.entity';
import { IconTranslation } from './model/orm/icon.translation.entity';
import { Lang } from './model/orm/lang.entity';
import { Mailtemplate } from './model/orm/mailtemplate.entity';
import { MailtemplateTranslation } from './model/orm/mailtemplate.translation.entity';
import { Restaurant } from './model/orm/restaurant.entity';
import { Setting } from './model/orm/setting.entity';
import { Table } from './model/orm/table.entity';
import { Transaction } from './model/orm/transaction.entity';
import { Word } from './model/orm/word.entity';
import { WordTranslation } from './model/orm/word.translation.entity';
import { Wordbook } from './model/orm/wordbook.entity';
import { db_login, db_name, db_password, db_port, db_schema } from './options';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: db_port,
			username: db_login,
			password: db_password,
			database: db_name,
			schema: db_schema,
			entities: [
				Admin,
				Admingroup,
				Setting,
				Lang,
				Wordbook,
				Word,
				WordTranslation,
				Mailtemplate,							
				MailtemplateTranslation,
				Currency,
				Restaurant,
				Employee,
				EmployeeStatus,
				EmployeeStatusTranslation,		
				Transaction,		
				Hall,
				Table,
				Icon,
				IconTranslation,
				Cat,
			],
			synchronize: true,
		}),
		AdminAPIModule,	
		OwnerAPIModule,
		RestoratorAPIModule,
		TestAPIModule,
		CronModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
