import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Vuelos, VuelosRelations, Rutas} from '../models';
import {RutasRepository} from './rutas.repository';

export class VuelosRepository extends DefaultCrudRepository<
  Vuelos,
  typeof Vuelos.prototype.id,
  VuelosRelations
> {

  public readonly rutas: HasOneRepositoryFactory<Rutas, typeof Vuelos.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RutasRepository') protected rutasRepositoryGetter: Getter<RutasRepository>,
  ) {
    super(Vuelos, dataSource);
    this.rutas = this.createHasOneRepositoryFactoryFor('rutas', rutasRepositoryGetter);
    this.registerInclusionResolver('rutas', this.rutas.inclusionResolver);
  }
}
