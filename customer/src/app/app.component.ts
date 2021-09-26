import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppService } from './services/app.service';
import { OrderService } from './services/order.service';
import { WordRepository } from './services/repositories/word.repository';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {	
	public wordsReady: boolean = false;
	public tableReady: boolean = false;
	public tableNotFound: boolean = false;

	constructor(		
		private wordRepository: WordRepository,
		private router: Router,
		private appService: AppService,		
		private orderService: OrderService,
	) {}

	get ready(): boolean {return this.wordsReady && this.tableReady;}		

	public async ngOnInit(): Promise<void> {		
		if (await this.initOrder()) {
			this.initURLRoutine();		
			this.initWords();
		}		
	}

	public ngAfterViewInit(): void {		
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => window.scrollY ? setTimeout(() => {window.scrollTo(0, 0);}, 1) : null);
	}	

	private async initOrder(): Promise<boolean> {		
		try {
			const url = document.location.pathname.split("/");
			
			if (url[1] !== "table" || !url[2]) {
				this.tableNotFound = true;
				return false;
			}			
			
			const statusCode = await this.orderService.init(url[2]);			
				
			if (statusCode !== 200) {
				this.tableNotFound = true;
				return false;
			} 

			this.tableReady = true;
			return true;			
		} catch (err) {
			this.appService.showError(err);
			return false;
		}
	}

	private async initWords(): Promise<void> {
		try {
			this.wordRepository.restaurant_id = this.orderService.table.restaurant_id;
			await this.wordRepository.loadAll();					
			this.wordsReady = true;
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
