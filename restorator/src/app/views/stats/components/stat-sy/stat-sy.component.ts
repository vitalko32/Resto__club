import { Component, OnInit } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { StatsRepository } from "src/app/services/repositories/stats.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "stat-sy",
    templateUrl: "stat-sy.component.html",
    styleUrls: ["stat-sy.component.scss"],
})
export class StatSYComponent implements OnInit {
    public xl: number[] = [];
    public xlMax: number = 0;
    public years: number[] = [];
    public currentYear: number = null;    

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private statsRepository: StatsRepository,
        private authService: AuthService,         
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}  
    get restaurantId(): number {return this.authService.authData.value.employee.restaurant_id;}

    public ngOnInit(): void {
        this.initDates();
        this.initStats();
    }

    private initDates(): void {        
        const date = new Date();        
        this.currentYear = date.getFullYear();

        for (let i = 2021; i <= this.currentYear; i++) {
            this.years.push(i);
        }        
    }

    public async initStats(): Promise<void> {
        try {            
            this.xl = await this.statsRepository.loadSumsYearly(this.restaurantId, this.currentYear);     
            this.xlMax = Math.max(...this.xl);                   
        } catch (err) {
            this.appService.showError(err);
        }
    }    

    private sum2percent(sum: number): number {
        return this.xlMax ? 100 * sum / this.xlMax : 0;
    } 

    public points(): string {
        let points = "";
        
        if (this.xl.length === 12) {
            const date = new Date();  
            const maxMonth = this.currentYear === date.getFullYear() ? date.getMonth()+1 : 12;
    
            for (let month = 0; month < maxMonth; month++) {
                points += `${month*10},${100 - this.sum2percent(this.xl[month])} `;
            }
        }        

        return points;
    }
}