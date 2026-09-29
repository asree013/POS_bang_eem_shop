import { Injectable } from '@nestjs/common';
import { Categorys } from '@prisma/client';
import { BaseService } from 'src/base/base.service/base.service.service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class CategoryService extends BaseService<Categorys> {
    constructor(repo: IBaseRepository<Categorys>){
        super(repo)
    }
}
