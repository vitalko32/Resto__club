import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppService } from './services/app.service';
import { OrderService } from './services/order.service';
import { ServingRepository } from './services/repositories/serving.repository';
import { WordRepository } from './services/repositories/word.repository';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {	
	@ViewChild("win", {static: false}) winRef: ElementRef; 
	public wordsReady: boolean = false;
	public ordersReady: boolean = false;	
	public servingsReady: boolean = false;
	public tableNotFound: boolean = false;

	constructor(		
		private wordRepository: WordRepository,
		private servingRepository: ServingRepository,
		private router: Router,
		private appService: AppService,		
		private orderService: OrderService,
	) {}

	get ready(): boolean {return this.wordsReady && this.ordersReady && this.servingsReady;}		

	public async ngOnInit(): Promise<void> {		
		if (await this.initOrders()) {
			this.initURLRoutine();		
			this.initWords();
			this.initServings();
		}		
	}

	public ngAfterViewInit(): void {		
		this.appService.win = this.winRef.nativeElement;		
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => this.appService.win.scrollTop ? setTimeout(() => {this.appService.win.scrollTo(0, 0);}, 1) : null);
	}	

	private async initOrders(): Promise<boolean> {		
		try {
			const url = document.location.pathname.split("/");
			
			if (url[1] !== "table" || !url[2]) {
				this.tableNotFound = true;
				return false;
			}			
			
			const statusCode = await this.orderService.initTable(url[2]);			
				
			if (statusCode !== 200) {
				this.tableNotFound = true;
				return false;
			} 

			this.orderService.initCart();
			this.orderService.initOrders();
			this.ordersReady = true;
			return true;			
		} catch (err) {
			this.appService.showError(err);
			return false;
		}
	}

	private async initWords(): Promise<void> {
		try {
			this.wordRepository.lang_id = this.orderService.table.lang_id;
			await this.wordRepository.loadAll();					
			this.wordsReady = true;
		} catch (err) {
			this.appService.showError(err);			
		}		
	}	

	private async initServings(): Promise<void> {
		try {
			this.servingRepository.lang_id = this.orderService.table.lang_id;
			await this.servingRepository.loadAll();
			this.servingsReady = true;
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
