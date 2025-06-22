// src/services/permissaoService.ts
import api from './api';
import PermissaoComSelecao from '@/models/permissao/permissaoComSelecao';
class PermissaoService {
    async carregarPermissoesComIndicadorSelecionadas(tipoUsuarioId) {
        const response = await api.get(`/permissao/carregarComSelecionadas/${tipoUsuarioId}`);
        return response.data.map((item) => new PermissaoComSelecao(item.id, item.descricao, item.selecionado));
    }
    async salvar(dados) {
        await api.post('/permissao/salvar', dados);
    }
    async carregarPorUsuario() {
        const response = await api.get('/permissao/porUsuario');
        return response.data;
    }
}
export default new PermissaoService();
