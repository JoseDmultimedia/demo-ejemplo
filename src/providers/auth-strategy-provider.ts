import {
  AuthenticationBindings,
  AuthenticationMetadata
} from '@loopback/authentication';
import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {repository} from '@loopback/repository';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';

import { UsuarioRepository } from '../repositories';
import { AuthUserService } from '../services';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {

  authUserService: AuthUserService;

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ){
     this.authUserService = new AuthUserService(usuarioRepository);
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if(name ==="userStrategy"){
      return new BearerStrategy(this.VerifyUser);
    }else{
      return Promise.reject(`The strategy ${name} is not available.`);
    }

  }

  VerifyUser(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authUserService.VerifyToken(token).then(data => {
      if (data) {
        return cb(null, data);
      }
      return cb(null, false);
    });
  }

}


