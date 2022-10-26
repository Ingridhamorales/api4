import {Entity, model, property, hasMany} from '@loopback/repository';
import {Aeropuertos} from './aeropuertos.model';

@model()
export class Rutas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  origen: string;

  @property({
    type: 'string',
    required: true,
  })
  destino: string;

  @property({
    type: 'string',
    required: true,
  })
  tiempo: string;

  @hasMany(() => Aeropuertos)
  aeropuertos: Aeropuertos[];

  @property({
    type: 'string',
  })
  vuelosId?: string;

  constructor(data?: Partial<Rutas>) {
    super(data);
  }
}

export interface RutasRelations {
  // describe navigational properties here
}

export type RutasWithRelations = Rutas & RutasRelations;
