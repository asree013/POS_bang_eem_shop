import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Products } from '@prisma/client';
import { EnvController } from 'src/constants/env_controller';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { IBaseController } from 'src/interfaces/IBaseController';
import { ProductRepoService } from 'src/models/product.repo.service/product.repo.service.service';
import { ProductService } from 'src/services/product.service/product.service.service';

@ApiTags(EnvController.productController)
@Controller(EnvController.productController)
export class ProductController implements IBaseController<Products> {
  constructor(
    @Inject(EnvService.product)
    private readonly service: ProductService,
  ) {}

  @Get(':id')
  handlerFindById(@Param('id') id: string): Promise<Products> {
    return this.service.findById(id);
  }

  @Get('')
  handlerFindAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Products[]> {
    return this.service.findAll(page, limit);
  }

  @Post('')
  handlerCreate(@Body() data: Products): Promise<Products> {
    return this.service.create(data);
  }

  @Put(':id')
  handlerUpdate(
    @Param('id') id: string,
    @Body() data: Partial<Products>,
  ): Promise<Products> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  handlerDelete(@Param('id') id: string): Promise<Products> {
    return this.service.delete(id);
  }

  @Get('search')
  handlerSearch(
    @Query() data: Partial<Products>,
  ): Promise<Products | Products[]> {
    return this.service.search(data);
  }
}
