import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IAdminAuthData } from './model/dto/admin.authdata.interface';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
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
		private authService: AuthService,
	) {}

	get ready(): boolean {return this.langsReady && this.wordsReady && this.settingsReady;}		
	get showSidebar(): boolean {return this.authService.authData !== null;}	

	public ngOnInit(): void {
		this.initLangs();
		this.initWords();
		this.initSettings();
		this.initURLRoutine();				
	}

	public ngAfterViewInit(): void {
		this.initTheme();		
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

	private async initTheme(): Promise<void> {
		await this.appService.pause(1);
		document.documentElement.classList.add("modern");
	}
}
