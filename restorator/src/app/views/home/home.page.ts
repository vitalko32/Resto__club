import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { SettingRepository } from "src/app/services/repositories/setting.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "home-page",
    templateUrl: "home.page.html",
    styleUrls: ["../../common.styles/data.scss"],
})
export class HomePage implements OnInit {
    public langSubscription: Subscription = null;
    public localPayTime: string = "";

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,       
        private authService: AuthService, 
        private settingRepository: SettingRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get payTime(): string {return this.settingRepository.settings['pay-time'];}   

    public ngOnInit(): void {        
        this.initTitle();
        this.initPayTime();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-home"]["title"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-home"]["title"][lang.slug]));           
    }

    private initPayTime(): void {
        const payTimeParts: string[] = this.payTime.split(":");
        const hour: number = parseInt(payTimeParts[0]);
        const minute: number = parseInt(payTimeParts[1]);
        const now: Date = new Date();
        const localPayDate: Date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0));
        this.localPayTime = `${localPayDate.getHours()}:${this.appService.twoDigits(localPayDate.getMinutes())} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    }
}