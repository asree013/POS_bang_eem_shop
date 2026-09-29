import { Module } from '@nestjs/common';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { PaymentController } from 'src/controllers/payment.controller/payment.controller.controller';
import { PaymentRepoService } from 'src/models/payment.repo.service/payment.repo.service.service';
import { ConnectDbService } from 'src/services/connect_db.service/connect_db.service.service';
import { PaymentService } from 'src/services/payment.service/payment.service.service';

@Module({
    controllers: [PaymentController],
    providers: [
        {
            provide: EnvRepository.repoPayment,
            useFactory: (conDb: ConnectDbService) => {
                return new PaymentRepoService(conDb)
            },
            inject: [EnvService.conDb]
        },
        {
            provide: EnvService.payment,
            useFactory: (repo: PaymentRepoService) => {
                return new PaymentService(repo)
            },
            inject: [EnvRepository.repoPayment]
        }
    ]
})
export class PaymentModule {}
