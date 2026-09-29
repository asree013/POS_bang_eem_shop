import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderItems } from '@prisma/client';
import { EnvController } from 'src/constants/env_controller';
import { EnvService } from 'src/constants/env_service';
import { IBaseController } from 'src/interfaces/IBaseController';
import { OrderItemService } from 'src/services/order.item.service/order.item.service';

@ApiTags(EnvController.orderItemContrller)
@Controller(EnvController.orderItemContrller)
export class OrderItemController implements IBaseController<OrderItems> {
    constructor(@Inject(EnvService.orderItem) private readonly service: OrderItemService) {}

    @Get(":id")
    handlerFindById(id: string): Promise<OrderItems> {
        return this.service.findById(id)
    }
    handlerFindAll(page: number, limit: number): Promise<OrderItems[]> {
        return this.service.findAll(page, limit)
    }
    handlerCreate(data: OrderItems): Promise<OrderItems> {
        return this.service.create(data)
    }
    handlerUpdate(id: string, data: Partial<OrderItems>): Promise<OrderItems> {
        return this.service.update(id, data)
    }
    handlerDelete(id: string): Promise<OrderItems> {
        return this.service.delete(id)
    }
    handlerSearch(data: Partial<OrderItems>): Promise<OrderItems | OrderItems[]> {
        return this.service.search(data)
    }
    @Post('/many')
    handlerCreateMany(@Body() data: OrderItems[]) {
        return this.service.createMany(data)
    }
}
