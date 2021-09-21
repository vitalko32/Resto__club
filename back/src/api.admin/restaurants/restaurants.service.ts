import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Restaurant } from "../../model/orm/restaurant.entity";
import { IRestaurantCreate } from "./dto/restaurant.create.interface";
import { IRestaurantUpdate } from "./dto/restaurant.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";

@Injectable()
export class RestaurantsService extends APIService {
    constructor (@InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>) {
        super();
    }   
    
    public async all(dto: IGetAll): Promise<IAnswer<Restaurant[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Restaurant[] = await this.restaurantRepository.find({where: filter, order: {[sortBy]: sortDir}});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<Restaurant[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Restaurant[] = await this.restaurantRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            let allLength: number = await this.restaurantRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Restaurant>> {
        try {
            let data: Restaurant = await this.restaurantRepository.findOne(id);                   
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IRestaurantCreate): Promise<IAnswer<void>> {        
        try { 
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
            let x: Restaurant = this.restaurantRepository.create(dto);            
            await this.restaurantRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: IRestaurantUpdate): Promise<IAnswer<void>> {
        try { 
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }  
            
            let x: Restaurant = this.restaurantRepository.create(dto);
            await this.restaurantRepository.save(x);            
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.restaurantRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.restaurantRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
