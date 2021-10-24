import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { LangRepository } from './services/repositories/lang.repository';
import { SettingRepository } from './services/repositories/setting.repository';
import { WordRepository } from './services/repositories/word.repository';
import { WSServerRepository } from './services/repositories/wsserver.repository';
import { SocketService } from './services/socket.service';
import { SoundService } from './services/sound.service';

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
	public socketReady: boolean = false;

	constructor(
		private langRepository: LangRepository,	
		private wordRepository: WordRepository,
		private settingRepository: SettingRepository,
		private wsserverRepository: WSServerRepository,
		private router: Router,
		private appService: AppService,		
		private authService: AuthService,
		private socketService: SocketService,
		private soundService: SoundService,
	) {}

	get ready(): boolean {return this.langsReady && this.wordsReady && this.settingsReady && this.socketReady;}	
	get showSidebar(): boolean {return this.authService.authData.value !== null;}	

	public ngOnInit(): void {
		this.initLangs();
		this.initWords();
		this.initSettings();
		this.initURLRoutine();
		this.initSocket();				
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
			this.appService.initLang(this.langRepository.langs);			
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
			this.settingRepository.startReload();
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

	private async initSocket(): Promise<void> {
		try {			
			this.socketService.servers = await this.wsserverRepository.loadAll();
			this.authService.authData.value ? this.socketService.connect() : null; // если авторизован, то коннектимся сразу, если нет, то коннект будет после авторизации			
			this.socketReady = true;
		} catch (err) {
			this.appService.showError(err);		
		}
	}
}
