import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Rutas, RutasRelations, Aeropuertos} from '../models';
import {AeropuertosRepository} from './aeropuertos.repository';

export class RutasRepository extends DefaultCrudRepository<
  Rutas,
  typeof Rutas.prototype.id,
  RutasRelations
> {

  public readonly aeropuertos: HasManyRepositoryFactory<Aeropuertos, typeof Rutas.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AeropuertosRepository') protected aeropuertosRepositoryGetter: Getter<AeropuertosRepository>,
  ) {
    super(Rutas, dataSource);
    this.aeropuertos = this.createHasManyRepositoryFactoryFor('aeropuertos', aeropuertosRepositoryGetter,);
    this.registerInclusionResolver('aeropuertos', this.aeropuertos.inclusionResolver);
  }
}
