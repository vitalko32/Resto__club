import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { Lang } from "../../model/orm/lang.entity";
import { IAnswer } from "../../model/answer.interface";
import { IGetchunkDTO } from "../../model/dto/getchunk.dto";
import { ILangCreateDTO } from "./dto/lang.create.dto";
import { ILangUpdateDTO } from "./dto/lang.update.dto";
import { IGetallDTO } from "src/model/dto/getall.dto";
import { Word } from "src/model/orm/word.entity";
import { WordTranslation } from "src/model/orm/word.translation.entity";
import { Sortdir } from "src/model/sortdir.type";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";

@Injectable()
export class LangsService extends APIService {
    constructor (
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
        @InjectRepository(Word) private wordRepository: Repository<Word>,
        @InjectRepository(WordTranslation) private wordtranslationRepository: Repository<WordTranslation>,
        @InjectRepository(Mailtemplate) private mailtemplateRepository: Repository<Mailtemplate>,
        @InjectRepository(MailtemplateTranslation) private mailtemplatetranslationRepository: Repository<MailtemplateTranslation>,                
    ) {
        super();
    } 
    
    public async all(dto: IGetallDTO): Promise<IAnswer<Lang[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Lang[] = await this.langRepository.find({where: filter, order: {[sortBy]: sortDir}});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in LangsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }  

    public async chunk(dto: IGetchunkDTO): Promise<IAnswer<Lang[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Lang[] = await this.langRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            let allLength: number = await this.langRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in LangsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Lang>> {
        try {
            let data: Lang = await this.langRepository.findOne(id);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in LangsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.langRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.langRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: ILangCreateDTO): Promise<IAnswer<void>> {        
        try {            
            if (!dto.slug) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
            let x: Lang = this.langRepository.create(dto);
            await this.langRepository.save(x);
            await this.rebuildSlugable(x);
            await this.rebuildMultilangEntities(x.id);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }
    
    public async update(dto: ILangUpdateDTO): Promise<IAnswer<void>> {
        try {
            if (!dto.slug) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
            let x: Lang = this.langRepository.create(dto);
            await this.langRepository.save(x);       
            await this.rebuildSlugable(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in LangsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }  
    
    private async rebuildSlugable(x: Lang): Promise<void> {
        if (x.slugable) {
            await this.langRepository.update({id: Not(x.id)}, {slugable: false});
        }
    }

    private async rebuildMultilangEntities(lang_id: number): Promise<void> {
        let wl: Word[] = await this.wordRepository.find();
        let wtl: WordTranslation[] = [];
        wl.forEach(w => wtl.push(this.wordtranslationRepository.create({word_id: w.id, lang_id})));        
        await this.wordtranslationRepository.save(wtl);

        let mtl: Mailtemplate[] = await this.mailtemplateRepository.find();
        let mttl: MailtemplateTranslation[] = [];
        mtl.forEach(mt => mttl.push(this.mailtemplatetranslationRepository.create({mailtemplate_id: mt.id, lang_id})));
        await this.mailtemplatetranslationRepository.save(mttl);         
    }    
}
