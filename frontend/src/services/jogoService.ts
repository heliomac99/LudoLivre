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

  async paginado(page: number, pageSize: number): Promise<DataSource<JogoModel>> {
    const response = await api.post<DataSource<JogoModel>>('/jogo/paginado', {
      page,
      page_size: pageSize
    })
    return response.data
  }
  
}

export default new JogoService()
