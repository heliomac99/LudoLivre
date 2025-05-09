import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUsuarioStore } from '../stores/usuario'
import routes from './routes' // <- Importa todas as rotas

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    ...routes as RouteRecordRaw[]
  ]
})

// Guarda de rota para autenticação
router.beforeEach((to, from, next) => {
  const usuarioStore = useUsuarioStore()
  const isLogged = usuarioStore.isLogged

  if (to.meta.requiresAuth && !isLogged) {
    next('/login')
  } else {
    next()
  }
})

export default router
