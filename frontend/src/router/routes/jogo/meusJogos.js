import MeusJogos from '@/pages/jogo/MeusJogos.vue';
import HomeLayout from '@/pages/Home.vue';
import { EPermissao } from '@/helpers/Enums';
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
                    menuGroup: 'Jogos',
                    permissao: EPermissao.CadastroJogo
                }
            }
        ]
    }
];
