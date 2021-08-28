import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/auth.guard";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from "../../model/answer.interface";
import { RestaurantsService } from "./restaurants.service";
import { Restaurant } from "../../model/orm/restaurant.entity";
import { IRestaurantCreate } from "./dto/restaurant.create.interface";
import { IRestaurantUpdate } from "./dto/restaurant.update.interface";

@Controller('api/owner/restaurants')
export class RestaurantsController {
    constructor (private restaurantsService: RestaurantsService) {}                

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Restaurant[]>> {
        return this.restaurantsService.chunk(dto);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: IRestaurantCreate): Promise<IAnswer<Restaurant>> {
        return this.restaurantsService.create(dto);
    }
    
    // get one
    @UseGuards(AuthGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Restaurant>> {
        return this.restaurantsService.one(parseInt(id));
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: IRestaurantUpdate): Promise<IAnswer<Restaurant>> {
        return this.restaurantsService.update(dto);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.restaurantsService.delete(parseInt(id));
    }    
}
