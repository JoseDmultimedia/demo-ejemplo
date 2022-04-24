export namespace ServiceKeys {
  export const JWT_SECRET_KEY = 'JWT@SecretKey*';
  export const TOKEN_EXPIRATION_TIME = Math.floor(Date.now() / 1000) * 3600 * 3;
}
