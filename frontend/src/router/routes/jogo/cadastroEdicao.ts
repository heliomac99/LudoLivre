import CadastroEdicao from '@/pages/jogo/CadastroEdicao.vue'
import HomeLayout from '@/pages/Home.vue'

export default [
  {
    path: '/jogo',
    component: HomeLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'cadastro',
        name: 'CadastroJogo',
        component: CadastroEdicao,
        meta: {
          requiresAuth: true,
          goesToMenu: true,
          label: 'Cadastro',
          menuGroup: 'Jogos'
        }
      }
    ]
  }
]
