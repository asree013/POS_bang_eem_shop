import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payments } from '@prisma/client';
import { EnvController } from 'src/constants/env_controller';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { IBaseController } from 'src/interfaces/IBaseController';
import { PaymentRepoService } from 'src/models/payment.repo.service/payment.repo.service.service';
import { PaymentService } from 'src/services/payment.service/payment.service.service';

@ApiTags(EnvController.paymentController)
@Controller(EnvController.paymentController)
export class PaymentController implements IBaseController<Payments> {
    constructor(@Inject(EnvService.payment) private readonly service: PaymentService) {}

    @Get(':id')
    handlerFindById(@Param('id') id: string): Promise<Payments> {
        return this.service.findById(id)
    }
    @Get("")
    handlerFindAll(@Query('page') page: number, @Query('limit') limit: number): Promise<Payments[]> {
        return this.service.findAll(page, limit)
    }
    @Post('')
    handlerCreate(@Body() data: Payments): Promise<Payments> {
        console.log('create');
        
        return this.service.create(data)
    }
    @Put(':id')
    handlerUpdate(@Param('id') id: string, @Body() data: Partial<Payments>): Promise<Payments> {
        return this.service.update(id, data)
    }
    @Delete(":id")
    handlerDelete(@Param('id') id: string): Promise<Payments> {
        return this.service.delete(id)
    }
    @Post('search')
    handlerSearch(@Body() data: Partial<Payments>): Promise<Payments | Payments[]> {
        return this.service.search(data)
    }
}
