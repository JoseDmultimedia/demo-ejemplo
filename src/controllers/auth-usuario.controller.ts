import {TokenService} from '@loopback/authentication';
import {MyUserService, TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import { UsuarioRepository } from '../repositories';
import { AuthUserService } from '../services';

class Credentials{
  username: string;
  password: string;
}


export class AuthUsuarioController {

  authUserService : AuthUserService
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UsuarioRepository) protected userRepository: UsuarioRepository,

  ) {
    this.authUserService = new AuthUserService(userRepository)
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
