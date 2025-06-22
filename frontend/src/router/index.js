import { createRouter, createWebHistory } from 'vue-router';
import { useUsuarioStore } from '../stores/usuario';
import routes from './routes'; // <- Importa todas as rotas
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        ...routes
    ]
});
router.beforeEach(async (to, from, next) => {
    const usuarioStore = useUsuarioStore();
    const isLogged = usuarioStore.isLogged;
    if (to.meta.requiresAuth && !isLogged) {
        next('/login');
    }
    else {
        if (isLogged) {
            await usuarioStore.carregarPermissoes();
        }
        const permissaoNecessaria = to.meta.permissao;
        if (permissaoNecessaria !== undefined && !usuarioStore.permissoes.includes(permissaoNecessaria)) {
            return next('/home'); // ou redirecionar pra home
        }
        next();
    }
});
export default router;
