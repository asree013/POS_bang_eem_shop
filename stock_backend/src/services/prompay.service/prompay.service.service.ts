import { Injectable } from '@nestjs/common';
import { PrompayDetails } from '@prisma/client';
import { BaseService } from 'src/base/base.service/base.service.service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';

@Injectable()
export class PrompayService extends BaseService<PrompayDetails> {
    constructor(repo: IBaseRepository<PrompayDetails>){
        super(repo)
    }
}
