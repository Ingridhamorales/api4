import {Entity, hasOne, model, property} from '@loopback/repository';
import {Rutas} from './rutas.model';

@model()
export class Vuelos extends Entity {
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
  fecha_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_fin: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_fin: string;

  @property({
    type: 'string',
    required: true,
  })
  asientos_vendidos: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_piloto: string;

  @property({
    type: 'string',
    required: true,
  })
  rutaid: string;

  @hasOne(() => Rutas)
  rutas: Rutas;

  constructor(data?: Partial<Vuelos>) {
    super(data);
  }
}

export interface VuelosRelations {
  // describe navigational properties here
}

export type VuelosWithRelations = Vuelos & VuelosRelations;
