import { defineStore } from 'pinia'

interface Usuario {
  id: number
  nome: string
  email: string
}

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuario: null as Usuario | null,
    token: '' as string
  }),
  getters: {
    isLogged: (state) => !!state.usuario && !!state.token
  },
  actions: {
    setUsuario(dados: Usuario, token: string) {
      this.usuario = dados
      this.token = token
    },
    limparUsuario() {
      this.usuario = null
      this.token = ''
    }
  },
  persist: true
})
