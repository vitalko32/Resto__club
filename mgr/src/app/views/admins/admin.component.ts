import { Component, Input } from '@angular/core';

import { Admin } from '../../model/orm/admin.model';
import { Admingroup } from '../../model/orm/admingroup.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-admin",
    templateUrl: "./admin.component.html"
})
export class AdminComponent extends ObjectComponent<Admin> {        
    @Input() agl: Admingroup[] = [];     
    public imgFolder: string = "admins";	
	public imgResizeWidth: number[] = [150];    
}
