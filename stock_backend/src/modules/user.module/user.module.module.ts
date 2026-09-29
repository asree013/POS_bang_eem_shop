import { Global, Module } from '@nestjs/common';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { UserController } from 'src/controllers/user.controller/user.controller.controller';
import { UserRepoService } from 'src/models/user.repo.service/user.repo.service.service';
import { ConnectDbService } from 'src/services/connect_db.service/connect_db.service.service';
import { UserService } from 'src/services/user.service/user.service.service';

@Global()
@Module({
  controllers: [UserController],
  providers: [
    {
      provide: EnvRepository.repoUser,
      useFactory: (conDb: ConnectDbService) => {
        return new UserRepoService(conDb);
      },
      inject: [EnvService.conDb],
    },
    {
      provide: EnvService.user,
      useFactory: (repo: UserRepoService) => {
        return new UserService(repo);
      },
      inject: [EnvRepository.repoUser]
    },
  ],
  exports: [EnvRepository.repoUser]
})
export class UserModule {}
