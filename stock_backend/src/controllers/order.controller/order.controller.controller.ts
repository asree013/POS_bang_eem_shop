import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Orders } from '@prisma/client';
import { EnvController } from 'src/constants/env_controller';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { OrderDTO } from 'src/DTO/ProductCreateDTO';
import { IBaseController } from 'src/interfaces/IBaseController';
import { OrderRepoService } from 'src/models/order.repo.service/order.repo.service.service';
import { OrderService } from 'src/services/order.service/order.service.service';

@ApiTags(EnvController.orderController)
@Controller(EnvController.orderController)
export class OrderController implements IBaseController<Orders> {
    constructor(@Inject(EnvService.order) private readonly service: OrderService) {}

    @Get(':id')
    handlerFindById(@Body() id: string): Promise<Orders> {
        return this.service.findById(id)
    }
    @Get('')
    handlerFindAll(@Query('page') page: number, @Query('limit') limit: number): Promise<Orders[]> {
        return this.service.findAll(page, limit)
    } 
    @Post('')
    handlerCreate(@Body() data: Orders): Promise<Orders> {        
        return this.service.create(data)
    }
    @Put(':id')
    handlerUpdate(@Param('id') id: string, @Body() data: Partial<Orders>): Promise<Orders> {
        return  this.service.update(id, data)
    }
    @Delete(':id')
    handlerDelete(@Param('id') id: string): Promise<Orders> {
        return this.service.delete(id)
    }
    @Delete(':id/many')
    handlerDeleteMany(@Param('id') id: string) {
        return this.service.serviceDeleteMany(id)
    }
    @Post('search')
    handlerSearch(@Body() data: Partial<Orders>): Promise<Orders | Orders[]> {
        return this.service.search(data)
    }

}
