import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Repository, SelectQueryBuilder } from "typeorm";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Product } from "../../model/orm/product.entity";
import { IProductCreate } from "./dto/product.create.interface";
import { IProductUpdate } from "./dto/product.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
import { ProductImage } from "src/model/orm/product.image.entity";
import { Ingredient } from "src/model/orm/ingredient.entity";
import { IProductUpdatePos } from "./dto/product.updatepos.interface";

@Injectable()
export class ProductsService extends APIService {
    constructor (
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
        @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,
    ) {
        super();
    }    
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<Product[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            let filter: string = "TRUE";

            if (dto.filter.cat_id) {
                filter += ` AND products.cat_id = '${dto.filter.cat_id}'`;
            }

            if (dto.filter.nameCode) {
                filter += ` AND (LOWER(products.name) LIKE LOWER('%${dto.filter.nameCode}%') OR LOWER(products.code) LIKE LOWER('%${dto.filter.nameCode}%'))`;
            }
            
            const qb: SelectQueryBuilder<Product> = this.productRepository.createQueryBuilder("products").where(filter);
            const data: Product[] = await qb.leftJoinAndSelect("products.images", "images").orderBy(`products.${sortBy}`, sortDir).take(q).skip(from).getMany();
            const allLength: number = await qb.getCount();            
            
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Product>> {
        try {            
            const data: Product = await this.productRepository
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.images", "images")
                .leftJoinAndSelect("product.ingredients", "ingredients")
                .where("product.id = :id", {id})
                .orderBy({"images.pos": "ASC", "ingredients.pos": "ASC"})                
                .getOne();                  
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "product not found"};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IProductCreate): Promise<IAnswer<void>> {        
        try {            
            let x: Product = this.productRepository.create(dto);            
            await this.productRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: IProductUpdate): Promise<IAnswer<void>> {
        try { 
            let x: Product = this.productRepository.create(dto);
            await this.productRepository.save(x);   
            await this.deleteUnbindedImages();     
            await this.deleteUnbindedIngredients();    
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async updatePositions(dto: IProductUpdatePos[]): Promise<IAnswer<void>> {
        try {
            await this.productRepository.save(dto);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.updatePositions: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.productRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }    

    private deleteUnbindedImages(): Promise<DeleteResult> {
        return this.productImageRepository.delete({product_id: IsNull()});
    }

    private deleteUnbindedIngredients(): Promise<DeleteResult> {
        return this.ingredientRepository.delete({product_id: IsNull()});
    }
}
