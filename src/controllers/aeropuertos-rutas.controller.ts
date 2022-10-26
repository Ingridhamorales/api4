import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Aeropuertos,
  Rutas,
} from '../models';
import {AeropuertosRepository} from '../repositories';

export class AeropuertosRutasController {
  constructor(
    @repository(AeropuertosRepository)
    public aeropuertosRepository: AeropuertosRepository,
  ) { }

  @get('/aeropuertos/{id}/rutas', {
    responses: {
      '200': {
        description: 'Rutas belonging to Aeropuertos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rutas)},
          },
        },
      },
    },
  })
  async getRutas(
    @param.path.string('id') id: typeof Aeropuertos.prototype.id,
  ): Promise<Rutas> {
    return this.aeropuertosRepository.rutas(id);
  }
}
