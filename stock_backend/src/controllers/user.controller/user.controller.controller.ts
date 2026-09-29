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
import { Users } from '@prisma/client';
import { EnvController } from 'src/constants/env_controller';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { IBaseController } from 'src/interfaces/IBaseController';
import { UserRepoService } from 'src/models/user.repo.service/user.repo.service.service';
import { UserService } from 'src/services/user.service/user.service.service';

@ApiTags(EnvController.userController)
@Controller(EnvController.userController)
export class UserController implements IBaseController<Users> {
  constructor(
    @Inject(EnvService.user) private readonly service: UserService,
  ) {}

  @Get(':id')
  handlerFindById(@Param('id') id: string): Promise<Users> {
    return this.service.findById(id);
  }
  @Post('search')
  handlerSearch(@Body() query: Users): Promise<Users | Users[]> {
    console.log(query);

    return this.service.search(query);
  }
  @Get('')
  async handlerFindAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) : Promise<any[]> {
    const user = await this.service.findAll(page, limit);
    const newData = user.map(r => {
      const {password, ...resutl} = r
      return resutl
    })
    return newData;
  }
  @Post('')
  handlerCreate(@Body() data: Users): Promise<Users> {
    return this.service.create(data);
  }
  @Put(':id')
  handlerUpdate(
    @Param('id') id: string,
    @Body() data: Partial<Users>,
  ): Promise<Users> {
    return this.service.update(id, data);
  }
  @Delete(':id')
  handlerDelete(@Param('id') id: string): Promise<Users> {
    return this.service.delete(id);
  }
}
