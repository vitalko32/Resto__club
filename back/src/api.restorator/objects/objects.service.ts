import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { Cat } from "src/model/orm/cat.entity";
import { IUpdateParam } from "src/model/dto/updateparam.interface";

@Injectable()
export class ObjectsService extends APIService {
    constructor (        
        @InjectRepository(Cat) private catRepository: Repository<Cat>,        
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
}
