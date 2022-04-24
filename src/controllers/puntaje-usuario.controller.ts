import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Puntaje,
  Usuario,
} from '../models';
import {PuntajeRepository} from '../repositories';

export class PuntajeUsuarioController {
  constructor(
    @repository(PuntajeRepository)
    public puntajeRepository: PuntajeRepository,
  ) { }

  @get('/puntajes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Puntaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof Puntaje.prototype.idPuntaje,
  ): Promise<Usuario> {
    return this.puntajeRepository.pertenece_a_usuario(id);
  }
}
