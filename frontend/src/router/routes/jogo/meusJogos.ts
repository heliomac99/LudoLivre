import MeusJogos from '@/pages/jogo/MeusJogos.vue'
import HomeLayout from '@/pages/Home.vue'

export default [
  {
    path: '/home',
    component: HomeLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'meusJogos',
        name: 'MeusJogos',
        component: MeusJogos,
        meta: {
          requiresAuth: true,
          goesToMenu: true,
          label: 'Meus Jogos',
          menuGroup: 'Jogos' // 👈 nome do grupo
        }
      }
    ]
  }
]
