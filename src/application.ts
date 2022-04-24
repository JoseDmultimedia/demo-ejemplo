import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {JWTAuthenticationComponent, UserServiceBindings} from '@loopback/authentication-jwt';

import { DemoDbDataSource } from './datasources';
import { UsuarioRepository } from './repositories';

import {registerAuthenticationStrategy} from '@loopback/authentication';
import { MyAuthStrategyProvider } from './Authentication-strategy/auth-strategy-provider'

//import { AuthUserService } from './services';

export {ApplicationConfig};

export class DemoEjemploApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;


    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(DemoDbDataSource, UserServiceBindings.DATASOURCE_NAME);
    // Bind user service
    //this.bind(UserServiceBindings.USER_SERVICE).toClass(AuthUserService),
    // Bind user and credentials repository


    registerAuthenticationStrategy(this, MyAuthStrategyProvider );

    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(
      UsuarioRepository,
    )

    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}


