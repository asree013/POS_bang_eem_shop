import { Injectable } from '@nestjs/common';
import { Payments } from '@prisma/client';
import { BaseService } from 'src/base/base.service/base.service.service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';
import { PaymentRepoService } from 'src/models/payment.repo.service/payment.repo.service.service';

@Injectable()
export class PaymentService extends BaseService<Payments> {
    constructor(repo: IBaseRepository<Payments>){
        super(repo)
    }
}
