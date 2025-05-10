import api from './api'
import { JogoModel } from '@/models/jogo/jogoModel'
import { DataSource } from '@/helpers/DataSource'

class JogoService {
  async cadastrar(model: JogoModel): Promise<void> {
    const formData = new FormData()
    formData.append('descricao', model.descricao)
    formData.append('descricaoCurta', model.descricaoCurta)
    formData.append('descricaoCompleta', model.descricaoCompleta)

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
  
  async atualizar(id: number, model: JogoModel): Promise<void> {
    const formData = new FormData()
    formData.append('id', id.toString())
    formData.append('descricao', model.descricao)
    formData.append('descricaoCurta', model.descricaoCurta)
    formData.append('descricaoCompleta', model.descricaoCompleta)

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


  async paginado(page: number, pageSize: number): Promise<DataSource<JogoModel>> {
    const response = await api.post<DataSource<JogoModel>>('/jogo/paginado', {
      page,
      page_size: pageSize
    })
    return response.data
  }

  async paginadoPorUsuario(usuarioId: number, page: number, pageSize: number): Promise<DataSource<JogoModel>> {
    const response = await api.post<DataSource<JogoModel>>('/jogo/paginadoPorUsuario', {
      usuarioId,
      page,
      page_size: pageSize
    })
    return response.data
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
