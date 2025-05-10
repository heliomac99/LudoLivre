// src/services/permissaoService.ts
import api from './api'
import PermissaoComSelecao from '@/models/permissao/permissaoComSelecao'

class PermissaoService {
  async carregarPermissoesComIndicadorSelecionadas(tipoUsuarioId: number): Promise<PermissaoComSelecao[]> {
    const response = await api.get(`/permissao/carregarComSelecionadas/${tipoUsuarioId}`)
    return response.data.map((item: any) =>
      new PermissaoComSelecao(item.id, item.descricao, item.selecionado)
    )
  }
  
  async salvar(dados: { tipoUsuarioId: number, permissoes: number[] }): Promise<void> {
    await api.post('/permissao/salvar', dados)
  }

  async carregarPorUsuario(): Promise<number[]> {
    const response = await api.get('/permissao/porUsuario')
    return response.data as number[]
  }

}



export default new PermissaoService()
