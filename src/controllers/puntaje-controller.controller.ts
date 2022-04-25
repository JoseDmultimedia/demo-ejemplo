import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Puntaje} from '../models';
import {PuntajeRepository} from '../repositories';



export class PuntajeControllerController {
  constructor(
    @repository(PuntajeRepository)
    public puntajeRepository : PuntajeRepository,
  ) {}
  @authenticate('jwt')
  @post('/puntajes')
  @response(200, {
    description: 'Puntaje model instance',
    content: {'application/json': {schema: getModelSchemaRef(Puntaje)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puntaje, {
            title: 'NewPuntaje',
            exclude: ['idPuntaje'],
          }),
        },
      },
    })
    puntaje: Omit<Puntaje, 'idPuntaje'>,
  ): Promise<Puntaje> {
    return this.puntajeRepository.create(puntaje);
  }
  @authenticate('jwt')
  @get('/puntajes/count')
  @response(200, {
    description: 'Puntaje model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Puntaje) where?: Where<Puntaje>,
  ): Promise<Count> {
    return this.puntajeRepository.count(where);
  }
  @authenticate('jwt')
  @get('/puntajes')
  @response(200, {
    description: 'Array of Puntaje model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Puntaje, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Puntaje) filter?: Filter<Puntaje>,
  ): Promise<Puntaje[]> {
    return this.puntajeRepository.find(filter);
  }
  @authenticate('jwt')
  @patch('/puntajes')
  @response(200, {
    description: 'Puntaje PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puntaje, {partial: true}),
        },
      },
    })
    puntaje: Puntaje,
    @param.where(Puntaje) where?: Where<Puntaje>,
  ): Promise<Count> {
    return this.puntajeRepository.updateAll(puntaje, where);
  }
  @authenticate('jwt')
  @get('/puntajes/{id}')
  @response(200, {
    description: 'Puntaje model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Puntaje, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Puntaje, {exclude: 'where'}) filter?: FilterExcludingWhere<Puntaje>
  ): Promise<Puntaje> {
    return this.puntajeRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/puntajes/{id}')
  @response(204, {
    description: 'Puntaje PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puntaje, {partial: true}),
        },
      },
    })
    puntaje: Puntaje,
  ): Promise<void> {
    await this.puntajeRepository.updateById(id, puntaje);
  }
  @authenticate('jwt')
  @put('/puntajes/{id}')
  @response(204, {
    description: 'Puntaje PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() puntaje: Puntaje,
  ): Promise<void> {
    await this.puntajeRepository.replaceById(id, puntaje);
  }
  @authenticate('jwt')
  @del('/puntajes/{id}')
  @response(204, {
    description: 'Puntaje DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.puntajeRepository.deleteById(id);
  }

  @authenticate('jwt')
  @get('/puntaje/resultados/{username}')
  @response(204, {
    description: 'Resultados buscados por el username',
  })
  async getdataResult(@param.path.string('username') username : string){
    return this.puntajeRepository.customSqlSearch(username);
  }


}
