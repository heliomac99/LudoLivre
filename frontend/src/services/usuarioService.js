import api from './api';
import { useToast } from 'vue-toastification';
const toast = useToast();
class UsuarioService {
    async login(model) {
        const result = await api.post('/usuario/login', model);
        return result.data;
    }
    async registrar(model) {
        await api.post('/usuario', model);
    }
    async atualizar(model) {
        const result = await api.put('/usuario', model);
        return result.data;
    }
    async obterPerfil() {
        const result = await api.get('/usuario');
        return result.data;
    }
    async listarTiposUsuario() {
        const result = await api.get('/usuario/tipos');
        return result.data;
    }
}
export default new UsuarioService();
