<template>
  <div class="py-4 px-4">
    <h4 class="titulo mb-3">Jogos</h4>

    <div class="card card-form shadow-sm border-0 p-5 w-100">
      <GameLibrary>
        <template #botao="{ jogo }">
          <button class="btn btn-primary w-100" @click="abrirModal(jogo)">
            <i class="bi bi-eye me-2"></i> Ver mais
          </button>
        </template>
      </GameLibrary>
    </div>

    <!-- Modal controlado pelo componente pai -->
    <div v-if="jogoSelecionado" class="modal-backdrop" @click.self="fechar">
      <div class="modal-content">
        <div class="modal-header-custom">
          <h2 class="titulo-branco">{{ jogoSelecionado.descricaoCurta }}</h2>
        </div>
        <div class="texto-container">
          <h6 class="subtitulo">{{ jogoSelecionado.descricao }}</h6>
          <hr class="lore-divider" />
          <p class="lore">{{ jogoSelecionado.descricaoCompleta }}</p>
          <hr class="lore-divider" />
        </div>
        <CarrosselImagens :imagens="jogoSelecionado.imagensBase64" />
        <button class="btn btn-secondary mt-3 w-100" @click="fechar">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameLibrary from '@/components/GameLibrary.vue'
import CarrosselImagens from '@/components/Carrossel.vue'
import { JogoModel } from '@/models/jogo/jogoModel'

export default defineComponent({
  name: 'Biblioteca',
  components: {
    GameLibrary,
    CarrosselImagens
  },
  data() {
    return {
      jogoSelecionado: null as JogoModel | null
    }
  },
  methods: {
    abrirModal(jogo: JogoModel) {
      this.jogoSelecionado = jogo
    },
    fechar() {
      this.jogoSelecionado = null
    }
  }
})
</script>

<style scoped>
.card-form {
  background-color: #ffffff;
  width: 100%;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: #1e1e1e;
  padding: 32px;
  max-width: 90vw;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 16px;
  color: #f0f0f0;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease;
}

button.btn.btn-secondary {
  background-color: #444;
  border: none;
  color: #fff;
}
button.btn.btn-secondary:hover {
  background-color: #555;
}

.titulo-branco {
  color: #fff;
}

.subtitulo {
  font-weight: 600;
  color: #ccc;
  font-size: 1rem;
}

.lore {
  font-size: 0.95rem;
  line-height: 1.5;
}

.lore-divider {
  border-color: #555;
  margin: 1rem 0;
}

@keyframes fadeIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
