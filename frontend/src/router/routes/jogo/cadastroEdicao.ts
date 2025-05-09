import CadastroEdicao from '@/pages/jogo/CadastroEdicao.vue'
import HomeLayout from '@/pages/Home.vue'

export default [
  {
    path: '/jogo',
    component: HomeLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'cadastroEdicao',
        name: 'CadastroJogo',
        component: CadastroEdicao,
        meta: {
          requiresAuth: true,
          goesToMenu: true,
          label: 'Cadastro',
          menuGroup: 'Jogos'
        }
      },
      {
        path: 'cadastroEdicao/:id',
        name: 'EdicaoJogo',
        component: CadastroEdicao,
        meta: {
          requiresAuth: true,
          goesToMenu: false
        }
      }
    ]
  }
]
