import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DemoDbDataSource} from '../datasources';
import {Puntaje, PuntajeRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class PuntajeRepository extends DefaultCrudRepository<
  Puntaje,
  typeof Puntaje.prototype.idPuntaje,
  PuntajeRelations
> {

  public readonly pertenece_a_usuario: BelongsToAccessor<Usuario, typeof Puntaje.prototype.idPuntaje>;

  constructor(
    @inject('datasources.demoDb') dataSource: DemoDbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Puntaje, dataSource);
    this.pertenece_a_usuario = this.createBelongsToAccessorFor('pertenece_a_usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a_usuario', this.pertenece_a_usuario.inclusionResolver);
  }

  


}
