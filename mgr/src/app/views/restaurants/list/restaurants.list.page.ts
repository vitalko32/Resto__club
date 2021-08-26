import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { RestaurantRepository } from '../../../services/repositories/restaurant.repository';
import { Restaurant } from '../../../model/orm/restaurant.model';

@Component({
	selector: 'restaurants-list-page',
	templateUrl: './restaurants.list.page.html',	
})
export class RestaurantsListPage extends ListPage<Restaurant> implements OnInit {    
    public homeUrl: string = "/restaurants/restaurants";    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected restaurantRepository: RestaurantRepository,     
        protected appService: AppService,        
    ) {      
        super(admlangRepository, restaurantRepository, appService);
    }    
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.restaurantRepository.loadChunk();                
            this.appService.monitorLog("[restaurants] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
