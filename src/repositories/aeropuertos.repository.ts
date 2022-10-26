import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Aeropuertos, AeropuertosRelations, Rutas} from '../models';
import {RutasRepository} from './rutas.repository';

export class AeropuertosRepository extends DefaultCrudRepository<
  Aeropuertos,
  typeof Aeropuertos.prototype.id,
  AeropuertosRelations
> {

  public readonly rutas: BelongsToAccessor<Rutas, typeof Aeropuertos.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RutasRepository') protected rutasRepositoryGetter: Getter<RutasRepository>,
  ) {
    super(Aeropuertos, dataSource);
    this.rutas = this.createBelongsToAccessorFor('rutas', rutasRepositoryGetter,);
    this.registerInclusionResolver('rutas', this.rutas.inclusionResolver);
  }
}
