import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';

import { Usuario } from '../models'
import { UsuarioRepository } from '../repositories';

import { ServiceKeys as keys } from '../keys/service-keys';
import {UserService} from '@loopback/authentication';
const jwt = require("jsonwebtoken");

export type Credentials = {
  username: string;
  password: string;
};

export class AuthUserService implements UserService<Usuario, Credentials> {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepositorio : UsuarioRepository
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<Usuario> {
    console.log(`Username ${credentials.username} - Password ${credentials.password}`);
    const invalidCredentialsError = 'Invalid username or password.';

    const foundUser = await this.usuarioRepositorio.findOne({where:{username: credentials.username}});
    if(!foundUser){
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    if(!(foundUser.password === credentials.password)){
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(usuario: Usuario): UserProfile {
    return{
    [securityId]: usuario.idUsuario.toString(),
    username: usuario.username,
    password: usuario.password
    };
  }

  async GenerateToken(usuario : Usuario){
    const token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        username: usuario.username,
        password: usuario.password
      }
    },
      keys.JWT_SECRET_KEY)
      return token;
  }

  async GenerateTokenRole(usuario : Usuario){
    const token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        username: usuario.username,
        password: usuario.password
      }
    },
      keys.JWT_SECRET_KEY_TWO)
      return token;
  }


  async VerifyToken(token: string) {
    try {
      const data = jwt.verify(token, keys.JWT_SECRET_KEY).data;
      return data;
    } catch (error) {
      return false;
    }
  }

}
