import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Categorys } from '@prisma/client';
import { EnvController } from 'src/constants/env_controller';
import { EnvService } from 'src/constants/env_service';
import { IBaseController } from 'src/interfaces/IBaseController';
import { CategoryService } from 'src/services/category/category.service';


@ApiTags(EnvController.categoryController)
@Controller(EnvController.categoryController)
export class CategoryController implements IBaseController<Categorys> {
    constructor(@Inject(EnvService.category) private readonly service: CategoryService) {

    }

    @Get(':id')
    handlerFindById(@Param('id') id: string): Promise<Categorys> {
        return this.service.findById(id)
    }
    @Get()
    handlerFindAll(@Query('page') page: number, @Query('limit') limit: number): Promise<Categorys[]> {
        return this.service.findAll(page, limit)
    }
    @Post()
    handlerCreate(@Body() data: Categorys): Promise<Categorys> {
        return this.service.create(data)
    }
    @Put(":id")
    handlerUpdate(@Param('id') id: string, @Body() data: Partial<Categorys>): Promise<Categorys> {
        return this.service.update(id, data)
    }
    @Delete(":id")
    handlerDelete(@Param('id') id: string): Promise<Categorys> {
        return this.service.delete(id)
    }
    @Get('search')
    handlerSearch(@Body() data: Partial<Categorys>): Promise<Categorys | Categorys[]> {
        return this.service.search(data)
    }
}
