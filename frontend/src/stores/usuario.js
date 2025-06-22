import { defineStore } from 'pinia';
import permissaoService from '@/services/permissaoService';
export const useUsuarioStore = defineStore('usuario', {
    state: () => ({
        usuario: null,
        token: '',
        permissoes: []
    }),
    getters: {
        isLogged: (state) => !!state.usuario && !!state.token
    },
    actions: {
        setUsuario(dados, token) {
            this.usuario = dados;
            this.token = token;
            this.carregarPermissoes(); // chama ao fazer login
        },
        async carregarPermissoes() {
            if (this.token) {
                const response = await permissaoService.carregarPorUsuario();
                this.permissoes = response;
            }
        },
        limparUsuario() {
            this.usuario = null;
            this.token = '';
            this.permissoes = [];
        }
    },
    persist: true
});
