import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { CartPanelComponent } from './cart/cart-panel.component';
import { CheckboxSimpleComponent } from './checkbox-simple/checkbox-simple.component';
import { CheckboxSliderComponent } from './checkbox-slider/checkbox-slider.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ErrorNotificationComponent } from './error-notification/errornotification.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderComponent } from './header/header.component';
import { InputNumberComponent } from './input-number/input-number.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ErrorNotificationComponent,        
        AlertComponent,
        ConfirmComponent,
        InputNumberComponent,
        CheckboxSimpleComponent,
        CheckboxSliderComponent,
        HeaderComponent,
        FooterComponent,
        GalleryComponent,
        CartPanelComponent,
    ],
    exports: [
        ErrorNotificationComponent,        
        AlertComponent,
        ConfirmComponent,
        InputNumberComponent,
        CheckboxSimpleComponent,
        CheckboxSliderComponent,
        HeaderComponent,
        FooterComponent,
        GalleryComponent,
        CartPanelComponent,
    ],    
})
export class CCModule {}
