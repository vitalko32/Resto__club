import { Component, Input } from '@angular/core';

import { Lang } from 'src/app/model/orm/lang.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-lang",
    templateUrl: "./lang.component.html"
})
export class LangComponent extends ObjectComponent<Lang> {
    public imgFolder: string = "langs";
	public imgDisk: string = "langs";
}
