import authRoutes from './auth'
import usuarioRoutes from './usuario'
import jogoRoutes from './jogo'

export default [
  ...authRoutes,
  ...usuarioRoutes,
  ...jogoRoutes
]
