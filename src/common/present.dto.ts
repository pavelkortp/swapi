import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from './CommonEntity';
import { BASE_URL } from '../app.service';

export abstract class PresentDTO {
  @ApiProperty()
  created: Date;

  @ApiProperty()
  edited: Date;

  @ApiProperty()
  url: string;

  constructor(c: CommonEntity) {
    this.setKeys(c);
  }

  setKeys(c: CommonEntity) {
    for (const key in c) {
      if (Array.isArray(c[key])) {
        this[key] = c[key].map((e) => this.toLink(key, e.id));
      } else if (key == 'id') {
        continue;
      } else {
        this[key] = c[key];
      }
    }
  }

  toLink(name: string, id: number): string {
    return `${BASE_URL}/${name}/${id}/`;
  }
}
