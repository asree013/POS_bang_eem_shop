import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateUserDto, LoginUserDTO } from 'src/DTO/UserDTO';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';
import { UserService } from '../user.service/user.service.service';
import { JwtService } from '@nestjs/jwt';
import { auth_key } from 'src/constants/auth_key';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService extends UserService {

    constructor(repo: IBaseRepository<Users>, private jwt: JwtService) {
        super(repo)
    }

    async singUp(data: CreateUserDto) {
        try {
            const hashPassword = await bcrypt.hash(data.password, 10)
            const d = {} as Users
            d.password = hashPassword
            d.email = data.email
            d.address = data.address
            d.first_name = data.first_name
            d.image = data.image
            d.last_name = data.last_name
            d.phone = data.phone
            return this.create(d)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async singIn(user: LoginUserDTO) {
        try {
            const findUser = await this.findByEmail(user.email) as Users
            const camparePassword = await bcrypt.compare(user.password, findUser.password)
            console.log(camparePassword);
            
            if (!camparePassword) {
                throw new UnauthorizedException("email or password not match")
            }
            const payload = { user_id: findUser.id, email: findUser.email }
            
            const { password, ...result } = findUser
            const convertJwt = {
                access_token: await this.jwt.signAsync(payload),
            }
            
            return convertJwt
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async validateUser(token: string): Promise<Users> {        
        try {
            const payload = this.jwt.verify(token, { secret: auth_key.secret }); // กำหนด secret ที่คุณใช้
            // ทำการค้นหาผู้ใช้ตาม payload.user_id หรืออื่น ๆ ที่คุณต้องการ
            
            const user = await this.findById(payload.user_id);
            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
