import { Global, Module } from '@nestjs/common';
import { UserModule } from './modules/user.module/user.module.module';
import { ProductModule } from './modules/product.module/product.module.module';
import { OrderModule } from './modules/order.module/order.module.module';
import { PaymentModule } from './modules/payment.module/payment.module.module';
import { EnvService } from './constants/env_service';
import { ConnectDbService } from './services/connect_db.service/connect_db.service.service';
import { OrderItemModule } from './modules/order.item/order.item.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadImageModule } from './modules/upload-image/upload-image.module';
import { CategoryModule } from './modules/category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrompayModule } from './modules/prompay/prompay.module';

@Global()
@Module({
  imports: [UserModule, ProductModule, OrderModule, PaymentModule, OrderItemModule, AuthModule, UploadImageModule, CategoryModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '/uploads'),
    serveRoot: '/images',
  }),
  PrompayModule,
  ],
  providers: [
    {
      provide: EnvService.conDb,
      useClass: ConnectDbService,
    },
  ],
  exports: [EnvService.conDb],
})
export class AppModule { }
