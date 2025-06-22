import api from './api'
import { JogoModel } from '@/models/jogo/jogoModel'
import { DataSource } from '@/helpers/DataSource'

class JogoService {
  async cadastrar(model: JogoModel): Promise<void> {
    const formData = new FormData()
    formData.append('descricao', model.descricao)
    formData.append('descricaoCurta', model.descricaoCurta)
    formData.append('descricaoCompleta', model.descricaoCompleta)

    formData.append('tags', JSON.stringify(model.tags || []))

    if (Array.isArray(model.imagens)) {
      model.imagens.forEach(img => {
        formData.append('imagens', img)
      })
    }

    if (Array.isArray(model.wallpaper) && model.wallpaper.length > 0) {
      formData.append('wallpaper', model.wallpaper[0])
    }

    await api.post('/jogo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async listarTodasTags(): Promise<string[]> {
    const response = await api.get<string[]>('/jogo/tags')
    return response.data
  }
  
  async atualizar(id: number, model: JogoModel): Promise<void> {
    const formData = new FormData()
    formData.append('id', id.toString())
    formData.append('descricao', model.descricao)
    formData.append('descricaoCurta', model.descricaoCurta)
    formData.append('descricaoCompleta', model.descricaoCompleta)
    formData.append('url', model.url)

    formData.append('tags', JSON.stringify(model.tags || []))

    if (Array.isArray(model.imagens)) {
      model.imagens.forEach(img => {
        formData.append('imagens', img)
      })
    }

    if (Array.isArray(model.wallpaper) && model.wallpaper.length > 0) {
      formData.append('wallpaper', model.wallpaper[0])
    }

    await api.put(`/jogo/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }


  async paginado(dataSource: DataSource<JogoModel>): Promise<DataSource<JogoModel>> {
    const response = await api.post<DataSource<JogoModel>>('/jogo/paginado', {
      page: dataSource.currentPage,
      pageSize: dataSource.pageSize,
      filters: dataSource.filters
    });
    
    return response.data;
  }

  async paginadoPorUsuario(usuarioId: number, dataSource: DataSource<JogoModel>): Promise<DataSource<JogoModel>> {
    const response = await api.post<DataSource<JogoModel>>('/jogo/paginadoPorUsuario', {
      usuarioId,
      page: dataSource.currentPage,
      pageSize: dataSource.pageSize,
      filters: dataSource.filters
    });
    
    return response.data;
  }
  
   async carregar(id: number): Promise<JogoModel> {
    const response = await api.get<JogoModel>(`/jogo/${id}`)
    return response.data
  }

  async deletar(id: number): Promise<void> {
    await api.delete(`/jogo/${id}`)
  }

  
}

export default new JogoService()
