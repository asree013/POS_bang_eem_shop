import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as multer from 'multer';  // นำเข้า multer
import { extname, join } from 'path';
import { UploadImageController } from 'src/controllers/upload-image/upload-image.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      fileFilter: (req, file, callback) => {
        const fileExtension = file.originalname.toLowerCase();
        if (!fileExtension.match(/\.(jpg|jpeg|png|avif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      storage: multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, './uploads');  // ตั้งที่เก็บไฟล์
        },
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);  // ดึงนามสกุลไฟล์
          const filename = `${Date.now()}${ext}`;  
          callback(null, filename); 
        },
      })
    }),
    
  ],
  controllers: [UploadImageController]
})
export class UploadImageModule { }
