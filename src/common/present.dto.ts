import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from './CommonEntity';
import { BASE_API_URL } from './constants';

export abstract class PresentDto {
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
        this[key] = c[key].map((e) => {
          const name = e.constructor.name.toLowerCase();
          return this.toLink(name === 'people' ? name : name + 's', e.id);
        });
      } else if (key == 'id') {
        continue;
      } else {
        this[key] = c[key];
      }
    }
  }

  toLink(name: string, id: number): string {
    return `${BASE_API_URL}/${name}/${id}/`;
  }
}
