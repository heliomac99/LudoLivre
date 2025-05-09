<template>
  <div class="py-4 px-4">
    <h4 class="titulo mb-3">Meus Jogos</h4>

    <div class="card card-form shadow-sm border-0 p-5 w-100">
      <GameLibrary :usuarioId="usuario?.id">
        <template #botao="{ jogo }">
          <button class="btn btn-success w-100" @click="editar(jogo)">
            <i class="bi bi-pencil me-2"></i> Editar
          </button>
        </template>
      </GameLibrary>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUsuarioStore } from '@/stores/usuario'
import GameLibrary from '@/components/GameLibrary.vue'
import { JogoModel } from '@/models/jogo/jogoModel'

export default defineComponent({
  name: 'MeusJogos',
  components: {
    GameLibrary
  },
  setup() {
    const usuarioStore = useUsuarioStore()
    const usuario = usuarioStore.usuario
    return { usuario }
  },
  methods: {
      editar(jogo: JogoModel) {
        this.$router.push(`/jogo/cadastroEdicao/${jogo.id}`)
      }
  }
})
</script>

<style scoped>
.card-form {
  background-color: #ffffff;
  width: 100%;
}
</style>
