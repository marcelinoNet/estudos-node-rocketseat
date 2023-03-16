import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
    } // user type is return tupe of  'request.user' object
  }
}
