import { Planet } from '../entities/Planet';
import { ResponseDTO } from '../../declarations';
import { BASE_URL } from '../../app.service';

export class GetPlanetDTO implements ResponseDTO {
  constructor(p: Planet) {
    for (const key in p) {
      if (Array.isArray(p[key])) {
        this[key] = p[key].map((e) => this.toLink(key, e.id));
      } else if (key == 'id') {
        continue;
      } else {
        this[key] = p[key];
      }
    }
    this['url'] = this.toLink('planets', p.id);
  }

  toLink(name: string, id: number): string {
    return `${BASE_URL}/${name}/${id}/`;
  }
}
