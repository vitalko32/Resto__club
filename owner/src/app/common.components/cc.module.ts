import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashDesktopComponent } from './dash-desktop/dash-desktop.component';
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
        DashDesktopComponent,
    ],
    exports: [
        MenuComponent,
        PaginationComponent,
        DashDesktopComponent,
    ],    
})
export class CCModule {}
