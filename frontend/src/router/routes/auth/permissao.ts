import Permissao from '@/pages/permissao/Permissao.vue'
import HomeLayout from '@/pages/Home.vue'
import { EPermissao } from '@/helpers/Enums'

export default [
  {
    path: '/home',
    component: HomeLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'permissao',
        name: 'Permissao',
        component: Permissao,
        meta: {
          requiresAuth: true,
          goesToMenu: true,
          label: 'Permissões',
          menuGroup: 'Configurações',
          permissao: EPermissao.Permissoes
        }
      }
    ]
  }
]
