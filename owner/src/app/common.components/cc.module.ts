import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { ErrorNotificationComponent } from './error-notification/errornotification.component';
import { HeadDesktopComponent } from './head-desktop/head-desktop.component';
import { HeadMobileComponent } from './head-mobile/head-mobile.component';
import { MenuComponent } from './menu/menu.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchInputComponent } from './search-input/search-input.component';

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
        SearchInputComponent,
        DatetimePickerComponent,
        AlertComponent,
        ConfirmComponent,
        NumberInputComponent,
    ],
    exports: [
        MenuComponent,
        PaginationComponent,
        HeadDesktopComponent,
        HeadMobileComponent,
        ErrorNotificationComponent,
        SearchInputComponent,
        DatetimePickerComponent,
        AlertComponent,
        ConfirmComponent,
        NumberInputComponent,
    ],    
})
export class CCModule {}
