import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
    	BrowserModule,
		HttpClientModule,

    	AppRoutingModule,
		ServicesModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
