import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EnvController } from 'src/constants/env_controller';

@Controller(EnvController.uploadController)
export class UploadImageController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    handlerUploadImage(@UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 500000 }),
          ],
        }),
      )
      file: Express.Multer.File,): string {
        const str = '/images/' +file.filename
        return str
    }
}
