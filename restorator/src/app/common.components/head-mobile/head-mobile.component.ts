import { AfterViewInit, Component, Input } from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { SettingRepository } from "src/app/services/repositories/setting.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "head-mobile",
    templateUrl: "head-mobile.component.html",
    styleUrls: ["head-mobile.component.scss"],
})
export class HeadMobileComponent implements AfterViewInit {        
    public menuPanelActive: boolean = false;
    public langPanelActive: boolean = false;   
    public subActive: boolean[] = [false, false]; 
    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private langRepository: LangRepository,
        private settingRepository: SettingRepository,
        private authService: AuthService,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get langs(): Lang[] {return this.langRepository.xlAll;}
    get url(): string[] {return this.appService.url;}
    get title(): string {return this.appService.title;}
    get showMenuBtn(): boolean {return this.authService.authData.value !== null;}   
    get employee(): Employee {return this.authService.authData.value.employee;} 
    get msg(): string {return this.settingRepository.settings?.["restorator-msg"];}

    public async ngAfterViewInit(): Promise<void> {
		await this.appService.pause(1);
		this.buildSub();
		this.router.events
			.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
			.subscribe(event => {								
				this.buildSub();
			});		
	}

	private buildSub(): void {
		this.subActive[0] = this.url[1] === "halls-tables";							
		this.subActive[1] = this.url[1] === "kitchen";							
	}
	
	public toggleSub(i: number): void {		
		this.subActive[i] = !this.subActive[i];
	}
    
    public setLang(l: Lang): void {
        if (this.currentLang.id !== l.id) {
            this.appService.setLang(l);   
            this.langPanelActive = false;
        }  
    }
}