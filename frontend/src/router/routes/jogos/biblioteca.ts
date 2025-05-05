import Biblioteca from '@/pages/jogos/Biblioteca.vue'
import HomeLayout from '@/pages/Home.vue'

export default [
  {
    path: '/home',
    component: HomeLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'jogos',
        name: 'Biblioteca',
        component: Biblioteca,
        meta: {
          requiresAuth: true,
          goesToMenu: true,
          label: 'Biblioteca',
          menuGroup: 'Jogos' // 👈 nome do grupo
        }
      }
    ]
  }
]
