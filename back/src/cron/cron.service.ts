import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { NotificationService } from "./notification.service";

@Injectable()
export class CronService {
    constructor (private notoficationService: NotificationService) {}     
    
    // рассылка рестораторам уведомлений о низком балансе
    @Cron('0 0 5 * * *') // каждый день в 5 утра                            
    public notifyEmployeesAboutLowMoney(): void {                
        this.notoficationService.notifyEmployeesAboutLowMoney();               
    }    
    
    // рассылка админам уведомлений о низком балансе
    @Cron('0 0 5 * * *') // каждый день в 5 утра                                   
    public notifyAdminsAboutLowMoney(): void {     
        this.notoficationService.notifyAdminsAboutLowMoney();        
    }        
}
