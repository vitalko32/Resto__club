import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { CheckboxSimpleComponent } from './checkbox-simple/checkbox-simple.component';
import { ConfirmPasswordedComponent } from './confirm-passworded/confirm-passworded.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DatePeriodPickerComponent } from './dateperiod-picker/dateperiod-picker.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { ErrorNotificationComponent } from './error-notification/errornotification.component';
import { HeadDesktopComponent } from './head-desktop/head-desktop.component';
import { HeadMobileComponent } from './head-mobile/head-mobile.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { MenuComponent } from './menu/menu.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        MenuComponent,
        PaginationComponent,
        HeadDesktopComponent,
        HeadMobileComponent,
        ErrorNotificationComponent,        
        DatetimePickerComponent,
        DatePeriodPickerComponent,
        AlertComponent,
        ConfirmComponent,
        ConfirmPasswordedComponent,
        InputNumberComponent,
        InputSearchComponent,
        CheckboxSimpleComponent,
    ],
    exports: [
        MenuComponent,
        PaginationComponent,
        HeadDesktopComponent,
        HeadMobileComponent,
        ErrorNotificationComponent,        
        DatetimePickerComponent,
        DatePeriodPickerComponent,
        AlertComponent,
        ConfirmComponent,
        ConfirmPasswordedComponent,
        InputNumberComponent,
        InputSearchComponent,
        CheckboxSimpleComponent,
    ],    
})
export class CCModule {}
