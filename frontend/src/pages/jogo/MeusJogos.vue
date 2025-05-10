<template>
  <div class="py-4 px-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="titulo">Meus Jogos</h4>
    </div>

    <div class="card card-form shadow-sm border-0 p-5 w-100">
      <button class="btn btn-primary d-flex justify-content-center align-items-center p-2" style="width: 100px; height: 40px;" @click="inserir">
        <i class="bi bi-plus-lg"></i>
      </button>


      <GameLibrary :key="key" :usuarioId="usuario?.id">
        <template #botao="{ jogo }">
          <div class="d-flex gap-2">
            <button class="btn btn-success w-100" @click="editar(jogo)">
              <i class="bi bi-pencil me-2"></i> Editar
            </button>
            <button class="btn btn-danger w-100" @click="deletar(jogo)">
              <i class="bi bi-trash me-2"></i> Deletar
            </button>
          </div>
        </template>
      </GameLibrary>
    </div>
  </div>

  <ConfirmModal
    :visible="modalVisivel"
    title="Excluir Jogo"
    :message="`Deseja excluir o jogo '${jogoSelecionado?.descricaoCurta}'?`"
    @confirm="confirmarDelete"
    @cancel="modalVisivel = false"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUsuarioStore } from '@/stores/usuario'
import GameLibrary from '@/components/GameLibrary.vue'
import { JogoModel } from '@/models/jogo/jogoModel'
import ConfirmModal from '@/components/ConfirmModal.vue'
import jogoService from '@/services/jogoService'
import { useToast } from 'vue-toastification'

const toast = useToast()

export default defineComponent({
  name: 'MeusJogos',
  components: {
    GameLibrary,
    ConfirmModal
  },
  data() {
    return {
      key: 1,
      modalVisivel: false,
      jogoSelecionado: null as JogoModel | null
    }
  },
  methods: {
    inserir() {
      this.$router.push('/jogo/cadastroEdicao')
    },
    editar(jogo: JogoModel) {
      this.$router.push(`/jogo/cadastroEdicao/${jogo.id}`)
    },
    deletar(jogo: JogoModel) {
      this.jogoSelecionado = jogo
      this.modalVisivel = true
    },
    confirmarDelete() {
      if (!this.jogoSelecionado?.id) return

      jogoService.deletar(this.jogoSelecionado.id)
        .then(() => {
          this.modalVisivel = false
          this.jogoSelecionado = null
          toast.success("Jogo removido com sucesso")
          this.key++
        })
        .catch(err => {
          alert('Erro ao deletar: ' + (err.response?.data?.error || err.message))
        })
    }
  },
  computed: {
    usuario() {
      return useUsuarioStore().usuario
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
