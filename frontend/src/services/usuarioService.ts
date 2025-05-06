import api from './api'
import { LoginModel, RegistroModel, UpdateModel } from '../models/usuario/usuarioModel'
import { useToast } from 'vue-toastification'
import TextoValor from '@/helpers/TextoValor'

const toast = useToast()

class UsuarioService {
  async login(model: LoginModel): Promise<any> {
    const result = await api.post('/usuario/login', model)
    return result.data
  }

  async registrar(model: RegistroModel): Promise<void> {
    await api.post('/usuario', model)
  }

  async atualizar(model: UpdateModel): Promise<any> {
    const result = await api.put('/usuario', model)
    return result.data
  }

  async obterPerfil(): Promise<UpdateModel> {
    const result = await api.get('/usuario')
    return result.data
  }

  async listarTiposUsuario(): Promise<Array<TextoValor>> {
    const result = await api.get('/usuario/tipos')
    return result.data
  }
}

export default new UsuarioService()
