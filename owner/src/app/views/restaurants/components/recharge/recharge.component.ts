import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { IRestaurantRecharge } from "src/app/model/dto/restaurant.recharge.interface";
import { Lang } from "src/app/model/orm/lang.model";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { RestaurantRepository } from "src/app/services/repositories/restaurant.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-recharge",
    templateUrl: "recharge.component.html",
    styleUrls: ["../../../../common.styles/popup.scss"],
})
export class RechargeComponent implements OnChanges {
    @Input() restaurant: Restaurant = null;
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() recharged: EventEmitter<void> = new EventEmitter();
    public amount: number = 0;
    public password: string = "";    
    public formLoading: boolean = false;
    public formErrorAmount: boolean = false;
    public formErrorPassword: boolean = false;
    public formError401: boolean = false;
    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,     
        private restaurantRepository: RestaurantRepository,   
        private authService: AuthService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    

    public ngOnChanges(changes: SimpleChanges): void {
        this.amount = 0;
        this.password = "";
    }
    
    public close(): void {
        this.activeChange.emit(false);
    }

    public async apply(): Promise<void> {
        try {
            if (this.validate()) {
                this.formLoading = true;            
                this.formError401 = false;
                let dto: IRestaurantRecharge = {restaurant_id: this.restaurant.id, amount:  this.amount, admin_id: this.authService.authData.admin.id, admin_password: this.password};
                let statusCode = await this.restaurantRepository.recharge(dto);
                this.formLoading = false;
    
                if (statusCode === 200) {
                    this.recharged.emit();
                    this.close();
                } else if (statusCode === 401) {
                    this.formError401 = true;
                } else {
                    this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
                }
            }            
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;    
        }        
    }
    
    public validate(): boolean {
        let error = false;

        if (!this.amount) {
            this.formErrorAmount = true;
            error = true;
        } else {
            this.formErrorAmount = false;
        }

        if (!this.password.length) {
            this.formErrorPassword = true;
            error = true;
        } else {
            this.formErrorPassword = false;
        }

        return !error;        
    }
}