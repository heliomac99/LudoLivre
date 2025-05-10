import { defineStore } from 'pinia'
import permissaoService from '@/services/permissaoService'

interface Usuario {
  id: number
  nome: string
  email: string
}

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuario: null as Usuario | null,
    token: '' as string,
    permissoes: [] as number[]
  }),
  getters: {
    isLogged: (state) => !!state.usuario && !!state.token
  },
  actions: {
    setUsuario(dados: Usuario, token: string) {
      this.usuario = dados
      this.token = token
      this.carregarPermissoes() // chama ao fazer login
    },
    async carregarPermissoes() {
      if (this.token) {
        const response = await permissaoService.carregarPorUsuario()
        this.permissoes = response
      }
    },
    limparUsuario() {
      this.usuario = null
      this.token = ''
      this.permissoes = []
    }
  },
  persist: true
})
