import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { MailService } from "src/common/mail.service";
import { Admin } from "src/model/orm/admin.entity";
import { IRestaurantMailable } from "src/common/dto/restaurant.mailable.interface";
import { APIService } from "src/common/api.service";

@Injectable()
export class CronService extends APIService {
    private restaurantsPerLetter: number = 2; // количество ресторанов в отчетах для админов

    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,   
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,   
        private mailService: MailService,     
    ) {
        super();
    }
    
    /*
    // рассылка рестораторам уведомлений о скорой или уже состоявшейся просрочке
    @Cron('0 0 4 * * *') // каждый день в 4 утра                            
    public async notifyEmployeesAboutExpiring(): Promise<void> {                
        try {                        
            let now = new Date();
            let rl: Restaurant[] = await this.restaurantRepository
                .createQueryBuilder("restaurants")
                .where(`active_until < NOW() + INTERVAL '3 DAYS' AND active_until > NOW() - INTERVAL '1 DAY'`)
                .leftJoinAndSelect("restaurants.employees", "employees")
                .orderBy({"restaurants.active_until": "DESC"})                
                .getMany();            
            
            for (let r of rl) {
                for (let e of r.employees) {
                    if (e.is_admin) {
                        r.active_until.getTime() > now.getTime() ? 
                            this.mailService.mailEmployeeRestaurantExpiring(e.email, r) : 
                            this.mailService.mailEmployeeRestaurantExpired(e.email, r);                        
                    }
                }
            }            
        } catch (err) {
            let errTxt: string = `Error in CronService.notifyEmployeesAboutExpiring: ${String(err)}`;
            console.log(errTxt);
        }           
    }   
    
    // рассылка админам уведомлений о скорой или уже состоявшейся просрочке
    @Cron('0 0 4 * * *') // каждый день в 4 утра                                   
    public async notifyAdminsAboutExpiring(): Promise<void> {     
        try {
            let expirationDays = [-1, 1, 2, 3];
            let al: Admin[] = await this.adminRepository.find({where: {active: true, admingroup_id: 1}});

            for (let d of expirationDays) {
                let rl = await this.getExpiringRestaurants(d);                
                let partitions: Restaurant[][] = [];
                let j = 0;

                // строим фрагменты по restaurantsPerLetter ресторанов на каждое письмо
                for (let i = 0; i < rl.length; i++) {
                    if (i % this.restaurantsPerLetter === 0) {
                        partitions.push([]);
                        j++;
                    }

                    partitions[j-1].push(rl[i]);
                }

                // отправляем фрагменты 
                for (j = 0; j < partitions.length; j++) {
                    // преобразуем массив в упрощенную форму для подстановки в цикличный шаблон
                    let mailableRestaurants: IRestaurantMailable[] = partitions[j].map(r => ({
                        active_until: this.humanDatetime(r.active_until),
                        name: r.name,
                        email: r.employees.length ? r.employees[0].email : "",
                        phone: r.phone,
                    }));
                    
                    for (let a of al) {
                        d > 0 ? 
                            this.mailService.mailAdminRestaurantsExpiring(a.email, mailableRestaurants, d, j+1, partitions.length) :
                            this.mailService.mailAdminRestaurantsExpired(a.email, mailableRestaurants, Math.abs(d), j+1, partitions.length);                        
                    }
                }
            }
        } catch (err) {
            let errTxt: string = `Error in CronService.notifyAdminsAboutExpiring: ${String(err)}`;
            console.log(errTxt);
        }  
    }

    // рестораны, у которых подписка заканчивается через days дней или закончилась days дней назад
    private async getExpiringRestaurants(days: number): Promise<Restaurant[]> {
        let where = days > 0 ? 
            `active_until >= NOW() + INTERVAL '${days - 1} DAYS' AND active_until < NOW() + INTERVAL '${days} DAYS'` : 
            `active_until < NOW() AND active_until >= NOW() - INTERVAL '${Math.abs(days)} DAYS'`;
        let rl = await this.restaurantRepository
            .createQueryBuilder("restaurants")
            .where(where)
            .leftJoinAndSelect("restaurants.employees", "employees")
            .orderBy({"restaurants.active_until": "DESC"})                
            .getMany();      
        return rl;
    }
    */
}
