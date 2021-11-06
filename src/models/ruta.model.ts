import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Aeropuerto} from './aeropuerto.model';

@model()
export class Ruta extends Entity {
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
  tiempoEstimado: string;

  @belongsTo(() => Aeropuerto, {name: 'origenFk'})
  origen: string;

  @belongsTo(() => Aeropuerto, {name: 'destinoFk'})
  destino: string;

  constructor(data?: Partial<Ruta>) {
    super(data);
  }
}

export interface RutaRelations {
  // describe navigational properties here
}

export type RutaWithRelations = Ruta & RutaRelations;
