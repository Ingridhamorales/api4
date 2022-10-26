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
  Vuelos,
  Rutas,
} from '../models';
import {VuelosRepository} from '../repositories';

export class VuelosRutasController {
  constructor(
    @repository(VuelosRepository) protected vuelosRepository: VuelosRepository,
  ) { }

  @get('/vuelos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Vuelos has one Rutas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Rutas),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rutas>,
  ): Promise<Rutas> {
    return this.vuelosRepository.rutas(id).get(filter);
  }

  @post('/vuelos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Vuelos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rutas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vuelos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rutas, {
            title: 'NewRutasInVuelos',
            exclude: ['id'],
            optional: ['vuelosId']
          }),
        },
      },
    }) rutas: Omit<Rutas, 'id'>,
  ): Promise<Rutas> {
    return this.vuelosRepository.rutas(id).create(rutas);
  }

  @patch('/vuelos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Vuelos.Rutas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rutas, {partial: true}),
        },
      },
    })
    rutas: Partial<Rutas>,
    @param.query.object('where', getWhereSchemaFor(Rutas)) where?: Where<Rutas>,
  ): Promise<Count> {
    return this.vuelosRepository.rutas(id).patch(rutas, where);
  }

  @del('/vuelos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Vuelos.Rutas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rutas)) where?: Where<Rutas>,
  ): Promise<Count> {
    return this.vuelosRepository.rutas(id).delete(where);
  }
}
