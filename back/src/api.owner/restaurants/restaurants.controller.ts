import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { RestaurantsService } from "./restaurants.service";
import { Restaurant } from "../../model/orm/restaurant.entity";
import { IRestaurantCreate } from "./dto/restaurant.create.interface";
import { IRestaurantUpdate } from "./dto/restaurant.update.interface";
import { IRestaurantRecharge } from "./dto/restaurant.recharge.interface";
import { IRestaurant } from "./dto/restaurant.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('api/owner/restaurants')
export class RestaurantsController {
    constructor (private restaurantsService: RestaurantsService) {}                

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<IRestaurant[]>> {
        return this.restaurantsService.chunk(dto);
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IRestaurantCreate): Promise<IAnswer<void>> {
        return this.restaurantsService.create(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Restaurant>> {
        return this.restaurantsService.one(parseInt(id));
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IRestaurantUpdate): Promise<IAnswer<void>> {
        return this.restaurantsService.update(dto);
    }

    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.restaurantsService.delete(parseInt(id));
    }  
    
    // recharge
    @UseGuards(AdminsGuard)
    @Post("recharge")
    public recharge(@Body() dto: IRestaurantRecharge): Promise<IAnswer<void>> {
        return this.restaurantsService.recharge(dto);
    }  
}
