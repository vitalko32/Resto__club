import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeadDesktopComponent } from './head-desktop/head-desktop.component';
import { HeadMobileComponent } from './head-mobile/head-mobile.component';
import { MenuComponent } from './menu/menu.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
    ],
    declarations: [
        MenuComponent,
        PaginationComponent,
        HeadDesktopComponent,
        HeadMobileComponent,
    ],
    exports: [
        MenuComponent,
        PaginationComponent,
        HeadDesktopComponent,
        HeadMobileComponent,
    ],    
})
export class CCModule {}
