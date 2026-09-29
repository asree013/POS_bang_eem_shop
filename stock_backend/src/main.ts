import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { EnvController } from './constants/env_controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('ระบบ stock บังอีมสำหรับเทส')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag(EnvController.userController)
    .addTag(EnvController.orderController)
    .addTag(EnvController.orderItemContrller)
    .addTag(EnvController.authController)
    .addTag(EnvController.paymentController)
    .addTag(EnvController.productController)
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'api/json',
  });

  app.enableCors();
  app.setGlobalPrefix('/api');
  await app.listen(3333);
  
}
bootstrap();
