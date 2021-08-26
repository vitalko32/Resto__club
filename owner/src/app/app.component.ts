import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppService } from './services/app.service';
import { LangRepository } from './services/repositories/lang.repository';
import { SettingRepository } from './services/repositories/setting.repository';
import { WordRepository } from './services/repositories/word.repository';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
	public langsReady: boolean = false;
	public wordsReady: boolean = false;
	public settingsReady: boolean = false;		

	constructor(
		private langRepository: LangRepository,	
		private wordRepository: WordRepository,
		private settingRepository: SettingRepository,
		private router: Router,
		private appService: AppService,		
	) {}

	get ready(): boolean {return this.langsReady && this.wordsReady && this.settingsReady;}	
	get showSidebar(): boolean {return this.appService.url[1] === "restaurants" && (this.appService.url[2] === "active" || this.appService.url[2] === "inactive");}	
	get desktopHeadShowLogoutBtn(): boolean {return this.appService.url[1] === "restaurants";}
	get desktopHeadShowHomeBtn(): boolean {return (this.appService.url[1] === "auth" && this.appService.url[2] === "password") || (this.appService.url[1] === "restaurants" && this.appService.url[2] === "create");}
	get desktopHeadShowTitle(): boolean {return (this.appService.url[1] === "auth" && this.appService.url[2] === "password") || (this.appService.url[1] === "restaurants" && this.appService.url[2] === "create");}
	get mobileHeadShowMenuBtn(): boolean {return !(this.appService.url[1] === "auth" && this.appService.url[2] === "login");}

	public ngOnInit(): void {
		this.initLangs();
		this.initWords();
		this.initSettings();
		this.initURLRoutine();		
	}

	public ngAfterViewInit(): void {		
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => window.scrollY ? setTimeout(() => {window.scrollTo(0, 0);}, 1) : null);
	}

	private async initLangs(): Promise<void> {
		try {
			await this.langRepository.loadAll();			
			this.appService.initLang(this.langRepository.xl);			
			this.langsReady = true;		
		} catch (err) {
			this.appService.showError(err);			
		}		
	}

	private async initWords(): Promise<void> {
		try {
			await this.wordRepository.loadAll();					
			this.wordsReady = true;
		} catch (err) {
			this.appService.showError(err);			
		}		
	}
	
	private async initSettings(): Promise<void> {
		try {
			await this.settingRepository.loadAll();		
			this.settingsReady = true;			
		} catch (err) {
			this.appService.showError(err);			
		}		
	}	

	private initURLRoutine(): void {        		
		this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this.appService.url = event.urlAfterRedirects.split("/"));
    }
}
