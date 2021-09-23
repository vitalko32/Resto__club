import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { ProductsService } from "./products.service";
import { Product } from "../../model/orm/product.entity";
import { IProductUpdate } from "./dto/product.update.interface";
import { IProductCreate } from "./dto/product.create.interface";
import { EmployeesGuard } from "src/common/guards/employees.guard";

@Controller('api/restorator/products')
export class ProductsController {
    constructor (private productsService: ProductsService) {}                    

    // get fragment
    @UseGuards(EmployeesGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Product[]>> {
        return this.productsService.chunk(dto);
    }
    
    // get one
    @UseGuards(EmployeesGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Product>> {
        return this.productsService.one(parseInt(id));
    }

    // create
    @UseGuards(EmployeesGuard)
    @Post("create")
    public create(@Body() dto: IProductCreate): Promise<IAnswer<void>> {
        return this.productsService.create(dto);
    }

    // update
    @UseGuards(EmployeesGuard)
    @Post("update")
    public update(@Body() dto: IProductUpdate): Promise<IAnswer<void>> {
        return this.productsService.update(dto);
    }
    
    // delete one
    @UseGuards(EmployeesGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.productsService.delete(parseInt(id));
    }    
}
