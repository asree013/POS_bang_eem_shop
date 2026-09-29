import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/configs/jwt.strategy';
import { auth_key } from 'src/constants/auth_key';
import { EnvRepository } from 'src/constants/env_repository';
import { EnvService } from 'src/constants/env_service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { UserRepoService } from 'src/models/user.repo.service/user.repo.service.service';
import { AuthService } from 'src/services/auth/auth.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            global: true,
            secret: auth_key.secret,
            signOptions: { expiresIn: '1800s' }
        })
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: EnvService.auth,
            useFactory: (repo: UserRepoService, jwt: JwtService) => {
                return new AuthService(repo, jwt)
            },
            inject: [EnvRepository.repoUser, JwtService]
        },
        {
            provide: EnvService.jwtStrategy,
            useClass: JwtStrategy
        }

    ],
})
export class AuthModule { }
