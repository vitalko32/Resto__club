import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { IUpdateParam } from "./dto/updateparam.interface";
import { IAnswer } from "../../model/answer.interface";
import { Admin } from "../../model/orm/admin.entity";
import { Setting } from "src/model/orm/setting.entity";
import { Lang } from "src/model/orm/lang.entity";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { Currency } from "src/model/orm/currency.entity";

@Injectable()
export class ObjectsService extends APIService {
    constructor (
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
        @InjectRepository(Wordbook) private wordbookRepository: Repository<Wordbook>,
        @InjectRepository(Mailtemplate) private mailtemplateRepository: Repository<Mailtemplate>,        
        @InjectRepository(Currency) private currencyRepository: Repository<Currency>,        
    ) {
        super();
    }

    public async updateParam (dto: IUpdateParam): Promise<IAnswer<void>> {        
        try {                        
            await this[`${dto.obj}Repository`].update(dto.id, {[dto.p]: dto.v});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ObjectsService.updateparam: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async updateEgoisticParam (dto: IUpdateParam): Promise<IAnswer<void>> {        
        try {
            if (dto.v) { // if param is true, first set all to false, because it is egoistic! :-)                                
                this[`${dto.obj}Repository`].update({}, {[dto.p]: false});
            }
            
            await this[`${dto.obj}Repository`].update(dto.id, {[dto.p]: dto.v});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ObjectsService.updateEgoisticParam: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
