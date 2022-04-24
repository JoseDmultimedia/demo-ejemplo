import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Puntaje,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPuntajeController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/puntajes', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Puntaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Puntaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Puntaje>,
  ): Promise<Puntaje[]> {
    return this.usuarioRepository.puntajes(id).find(filter);
  }

  @post('/usuarios/{id}/puntajes', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Puntaje)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puntaje, {
            title: 'NewPuntajeInUsuario',
            exclude: ['idPuntaje'],
            optional: ['idUsuario']
          }),
        },
      },
    }) puntaje: Omit<Puntaje, 'idPuntaje'>,
  ): Promise<Puntaje> {
    return this.usuarioRepository.puntajes(id).create(puntaje);
  }

  @patch('/usuarios/{id}/puntajes', {
    responses: {
      '200': {
        description: 'Usuario.Puntaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puntaje, {partial: true}),
        },
      },
    })
    puntaje: Partial<Puntaje>,
    @param.query.object('where', getWhereSchemaFor(Puntaje)) where?: Where<Puntaje>,
  ): Promise<Count> {
    return this.usuarioRepository.puntajes(id).patch(puntaje, where);
  }

  @del('/usuarios/{id}/puntajes', {
    responses: {
      '200': {
        description: 'Usuario.Puntaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Puntaje)) where?: Where<Puntaje>,
  ): Promise<Count> {
    return this.usuarioRepository.puntajes(id).delete(where);
  }
}
