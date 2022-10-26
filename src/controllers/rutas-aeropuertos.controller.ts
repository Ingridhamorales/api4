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
  Rutas,
  Aeropuertos,
} from '../models';
import {RutasRepository} from '../repositories';

export class RutasAeropuertosController {
  constructor(
    @repository(RutasRepository) protected rutasRepository: RutasRepository,
  ) { }

  @get('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Array of Rutas has many Aeropuertos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aeropuertos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Aeropuertos>,
  ): Promise<Aeropuertos[]> {
    return this.rutasRepository.aeropuertos(id).find(filter);
  }

  @post('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Rutas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aeropuertos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rutas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuertos, {
            title: 'NewAeropuertosInRutas',
            exclude: ['id'],
            optional: ['rutasId']
          }),
        },
      },
    }) aeropuertos: Omit<Aeropuertos, 'id'>,
  ): Promise<Aeropuertos> {
    return this.rutasRepository.aeropuertos(id).create(aeropuertos);
  }

  @patch('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Rutas.Aeropuertos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuertos, {partial: true}),
        },
      },
    })
    aeropuertos: Partial<Aeropuertos>,
    @param.query.object('where', getWhereSchemaFor(Aeropuertos)) where?: Where<Aeropuertos>,
  ): Promise<Count> {
    return this.rutasRepository.aeropuertos(id).patch(aeropuertos, where);
  }

  @del('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Rutas.Aeropuertos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Aeropuertos)) where?: Where<Aeropuertos>,
  ): Promise<Count> {
    return this.rutasRepository.aeropuertos(id).delete(where);
  }
}
