import { Module } from '@nestjs/common';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { PrompayController } from 'src/controllers/prompay/prompay.controller';
import { PrompayRepoService } from 'src/models/prompay.repo/prompay.repo.service';
import { ConnectDbService } from 'src/services/connect_db.service/connect_db.service.service';
import { PrompayService} from 'src/services/prompay.service/prompay.service.service';

@Module({
    controllers: [PrompayController],
    providers: [
        {
            provide: EnvRepository.repoPrompay,
            useFactory: (conDb: ConnectDbService) => {
                return new PrompayRepoService(conDb)
            },
            inject: [EnvService.conDb]
        },
        {
            provide: EnvService.prompay,
            useFactory: (repo: PrompayRepoService) => {
                return new PrompayService(repo)
            },
            inject: [EnvRepository.repoPrompay]
        }
    ]
})
export class PrompayModule {}
