import { Injectable } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import multer from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const newName = `${uniqueSuffix}${extname(file.originalname)}`;
          cb(null, newName);
        },
      }),
    };
  }
}
