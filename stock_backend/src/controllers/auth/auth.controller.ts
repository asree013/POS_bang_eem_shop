import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EnvController } from 'src/constants/env_controller';
import { EnvService } from 'src/constants/env_service';
import { CreateUserDto, LoginUserDTO } from 'src/DTO/UserDTO';
import { JwtAuthGuard } from 'src/guard/JwtAuth.guard';
import { AuthService } from 'src/services/auth/auth.service';

@Controller(EnvController.authController)
export class AuthController {
    constructor(@Inject(EnvService.auth) private readonly service: AuthService) { }

    @Post('login')
    handlerSingIn(@Body() data: LoginUserDTO) {
        return this.service.singIn(data);
    }

    @Post('register')
    async handlerSingUp(@Body() data: CreateUserDto) {
        const create = await this.service.singUp(data);
        const {password, ...result }= create
        return result
    }

    @Post('findme')
    @UseGuards(JwtAuthGuard)
    handlerFindMy(@Request() req) {
        const {password, ...result} = req.user
        return result;
    }

    @Post('auth/logout')
    async logout(@Request() req) {
        return req.logout();
    }
}
