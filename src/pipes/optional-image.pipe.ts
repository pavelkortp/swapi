import {
  ArgumentMetadata,
  FileTypeValidator,
  ParseFilePipe,
  PipeTransform,
} from '@nestjs/common';

export class OptionalImagePipe
  implements
    PipeTransform<
      Array<Express.Multer.File> | undefined,
      Promise<Express.Multer.File | null>
    >
{
  private readonly parseFilePipe: ParseFilePipe;

  constructor() {
    this.parseFilePipe = new ParseFilePipe({
      validators: [new FileTypeValidator({ fileType: 'image/*' })],
    });
  }

  async transform(
    value: Array<Express.Multer.File> | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ): Promise<Express.Multer.File | null> {
    if (!value || !value.length) {
      return null;
    }
    return await this.parseFilePipe.transform(value);
  }
}
