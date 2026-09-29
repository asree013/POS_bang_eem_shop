
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { auth_key } from 'src/constants/auth_key';
import { EnvService } from 'src/constants/env_service';
import { UserService } from 'src/services/user.service/user.service.service';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(EnvService.auth) private readonly service: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: auth_key.secret,
    });
  }

validate(payload: any) {
    return this.service.findById(payload.user_id)
  }
}