import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: 'ADMIN' | 'MEMBER'
    } // user type is return tupe of  'request.user' object
  }
}
