import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model({
  settings: {
    foreignKeys: {
      fk_puntaje_usuario: {
        name: 'fk_puntaje_usuario',
        entity: 'Usuario',
        entityKey: 'idUsuario',
        foreignKey: 'idPuntajeUsuario',
      }
    },
  },
})
export class Puntaje extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idPuntaje?: number;

  @property({
    type: 'number',
    required: true,
  })
  valorPuntaje: number;

  @belongsTo(() => Usuario, {name: 'pertenece_a_usuario'})
  idPuntajeUsuario: number;

  @property({
    type: 'number',
  })
  idUsuario?: number;

  constructor(data?: Partial<Puntaje>) {
    super(data);
  }
}

export interface PuntajeRelations {
  // describe navigational properties here
}

export type PuntajeWithRelations = Puntaje & PuntajeRelations;
