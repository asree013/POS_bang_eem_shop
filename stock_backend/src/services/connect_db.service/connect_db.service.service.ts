import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ConnectDbService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  onModuleInit() {
    this.$connect()
      .then((r) => console.log('Connect Database'))
      .catch((e) => console.log('has err in connectdb'));
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
