import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { ObjectPage } from '../../_object.page';
import { CurrencyRepository } from 'src/app/services/repositories/currency.repository';
import { Currency } from 'src/app/model/orm/currency.model';

@Component({
	selector: 'restaurants-edit-page',
	templateUrl: './restaurants.edit.page.html',	
})
export class RestaurantsEditPage extends ObjectPage<Restaurant> implements OnInit {
	public x: Restaurant = null;
	public homeUrl: string = "/restaurants/restaurants";	
	public requiredFields: string[] = ["name", "domain"];		
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected restaurantRepository: RestaurantRepository,			
		protected currencyRepository: CurrencyRepository,		
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, restaurantRepository, appService, router);
	}	
	
	get cl(): Currency[] {return this.currencyRepository.xlAll;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.restaurantRepository.loadOne(parseInt(p["id"]));				
				await this.currencyRepository.loadAll();							
				this.appService.monitorLog("[restaurants edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
