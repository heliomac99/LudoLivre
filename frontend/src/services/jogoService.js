import api from './api';
class JogoService {
    async cadastrar(model) {
        const formData = new FormData();
        formData.append('descricao', model.descricao);
        formData.append('descricaoCurta', model.descricaoCurta);
        formData.append('descricaoCompleta', model.descricaoCompleta);
        formData.append('tags', JSON.stringify(model.tags || []));
        if (Array.isArray(model.imagens)) {
            model.imagens.forEach(img => {
                formData.append('imagens', img);
            });
        }
        if (Array.isArray(model.wallpaper) && model.wallpaper.length > 0) {
            formData.append('wallpaper', model.wallpaper[0]);
        }
        await api.post('/jogo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    async listarTodasTags() {
        const response = await api.get('/jogo/tags');
        return response.data;
    }
    async atualizar(id, model) {
        const formData = new FormData();
        formData.append('id', id.toString());
        formData.append('descricao', model.descricao);
        formData.append('descricaoCurta', model.descricaoCurta);
        formData.append('descricaoCompleta', model.descricaoCompleta);
        formData.append('tags', JSON.stringify(model.tags || []));
        if (Array.isArray(model.imagens)) {
            model.imagens.forEach(img => {
                formData.append('imagens', img);
            });
        }
        if (Array.isArray(model.wallpaper) && model.wallpaper.length > 0) {
            formData.append('wallpaper', model.wallpaper[0]);
        }
        await api.put(`/jogo/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    async paginado(dataSource) {
        const response = await api.post('/jogo/paginado', {
            page: dataSource.currentPage,
            pageSize: dataSource.pageSize,
            filters: dataSource.filters
        });
        return response.data;
    }
    async paginadoPorUsuario(usuarioId, dataSource) {
        const response = await api.post('/jogo/paginadoPorUsuario', {
            usuarioId,
            page: dataSource.currentPage,
            pageSize: dataSource.pageSize,
            filters: dataSource.filters
        });
        return response.data;
    }
    async carregar(id) {
        const response = await api.get(`/jogo/${id}`);
        return response.data;
    }
    async deletar(id) {
        await api.delete(`/jogo/${id}`);
    }
}
export default new JogoService();
