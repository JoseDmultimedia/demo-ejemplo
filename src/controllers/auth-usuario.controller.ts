import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import { UsuarioRepository } from '../repositories';
import { AuthUserService } from '../services';

class Credentials{
  username: string;
  password: string;
}


export class AuthUsuarioController {

  authUserService : AuthUserService
  constructor(
    @repository(UsuarioRepository)
    protected  usuarioRepository: UsuarioRepository
  ) {
    this.authUserService = new AuthUserService(usuarioRepository)
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<object> {
    const user = await this.authUserService.verifyCredentials(credentials);
    if (user) {
      let tk = await this.authUserService.GenerateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }




}
