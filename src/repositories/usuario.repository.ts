import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DemoDbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Puntaje} from '../models';
import {PuntajeRepository} from './puntaje.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {

  public readonly puntajes: HasManyRepositoryFactory<Puntaje, typeof Usuario.prototype.idUsuario>;

  constructor(
    @inject('datasources.demoDb') dataSource: DemoDbDataSource, @repository.getter('PuntajeRepository') protected puntajeRepositoryGetter: Getter<PuntajeRepository>,
  ) {
    super(Usuario, dataSource);
    this.puntajes = this.createHasManyRepositoryFactoryFor('puntajes', puntajeRepositoryGetter,);
    this.registerInclusionResolver('puntajes', this.puntajes.inclusionResolver);
  }
}
