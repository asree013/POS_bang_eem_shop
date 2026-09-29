import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { PrompayDetails } from '@prisma/client';
import { EnvController } from 'src/constants/env_controller';
import { EnvService } from 'src/constants/env_service';
import { PrompayService } from 'src/services/prompay.service/prompay.service.service';

@Controller(EnvController.prompayController)
export class PrompayController {
    constructor(@Inject(EnvService.prompay) private readonly service: PrompayService){}
    @Get()
    handlerFindAll(@Query('page') page: number, @Query('limit') limit: number) {
        return this.service.findAll(page, limit)
    }
    @Get(":id")
    handlerFindById(@Param('id') id: string) {
        return this.service.findById(id)
    }
    @Get('search')
    handlerSearch(@Body() data: PrompayDetails) {
        return this.service.search(data)
    }
    @Delete(":id")
    handlerDelete(@Param('id') id: string) {
        return this.service.delete(id)
    }
    @Put(":id")
    handlerUpdateById(@Param('id') id: string, @Body() data: PrompayDetails) {
        return this.service.update(id, data)
    }
    @Post()
    handlerCreate(@Body() data: PrompayDetails) {
        return this.service.create(data)
    }
}
