import { Component, Input, OnInit } from '@angular/core';

import { Lang } from 'src/app/model/orm/lang.model';
import { Icon } from 'src/app/model/orm/icon.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-icon",
    templateUrl: "./icon.component.html"
})
export class IconComponent extends ObjectComponent<Icon> implements OnInit {    
    @Input() x: Icon;  
    @Input() ll: Lang[] = [];    
    public selectedLang: Lang;    
    public imgFolder: string = "icons";	 

    public ngOnInit(): void {
        this.selectedLang = this.ll[0];
    }        
}
