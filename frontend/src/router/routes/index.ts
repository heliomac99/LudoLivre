import authRoutes from './auth'
import usuarioRoutes from './usuario'
import jogosRoutes from './jogos'

export default [
  ...authRoutes,
  ...usuarioRoutes,
  ...jogosRoutes
]
