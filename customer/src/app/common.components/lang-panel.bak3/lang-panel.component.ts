import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { YTService } from "src/app/services/yt.service";

@Component({
    selector: "lang-panel",
    templateUrl: "lang-panel.component.html",
    styleUrls: ["lang-panel.component.scss"],
})
export class LangPanelComponent {
    constructor(
        private appService: AppService,
        private ytService: YTService,
    ) {}

    get active(): boolean {return this.appService.langPanelActive;}
    set active(v: boolean) {this.appService.langPanelActive = v;}
    get ytCurrentLang(): string {return this.ytService.currentLang;}

    public ytTranslate(lang: string): void {
        this.ytService.translate(lang);
    }
}