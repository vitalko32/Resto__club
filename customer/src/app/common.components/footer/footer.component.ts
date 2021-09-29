import { AfterViewInit, Component } from "@angular/core";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-footer",
    templateUrl: "footer.component.html",
    styleUrls: ["footer.component.scss"],
})
export class FooterComponent implements AfterViewInit {        
    public scrollWidth: number = 0;
    
    constructor(        
        private appService: AppService,
        private wordRepository: WordRepository,        
    ) {}

    get words(): Words {return this.wordRepository.words;}    
    
    public async ngAfterViewInit(): Promise<void> {
        await this.appService.pause(1);
        this.scrollWidth = this.appService.win.offsetWidth - this.appService.win.clientWidth;        
    }
}