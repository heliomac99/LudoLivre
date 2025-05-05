import MeuPerfil from '@/pages/usuario/MeuPerfil.vue'
import HomeLayout from '@/pages/Home.vue'

export default [
  {
    path: '/home',
    component: HomeLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'perfil',
        name: 'MeuPerfil',
        component: MeuPerfil,
        meta: {
          requiresAuth: true,
          goesToMenu: true,
          label: 'Meu Perfil',
          menuGroup: 'Usuário' // 👈 nome do grupo
        }
      }
    ]
  }
]
