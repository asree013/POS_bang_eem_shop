import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { BaseService } from 'src/base/base.service/base.service.service';
import { IBaseRepository } from 'src/interfaces/IBaseIRepository';
import { UserRepoService } from 'src/models/user.repo.service/user.repo.service.service';

@Injectable()
export class UserService extends BaseService<Users> {
  constructor(repo: IBaseRepository<Users>) {
    super(repo);
  }

  findByEmail(email: string): Promise<Users | Users[]> {
    const d = {} as Users
    d.email = email
    return this.search(d)
  }
}
