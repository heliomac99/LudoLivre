import CadastroEdicao from '@/pages/jogo/CadastroEdicao.vue'
import HomeLayout from '@/pages/Home.vue'
import { EPermissao } from '@/helpers/Enums'

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
          goesToMenu: false,
          label: 'Cadastro',
          menuGroup: 'Jogos',
          permissao: EPermissao.CadastroJogo
        }
      },
      {
        path: 'cadastroEdicao/:id',
        name: 'EdicaoJogo',
        component: CadastroEdicao,
        meta: {
          requiresAuth: true,
          goesToMenu: false,
          permissao: EPermissao.CadastroJogo
        }
      }
    ]
  }
]
