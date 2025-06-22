<template>
  <div class="py-4 px-4">
    <h4 class="titulo mb-3">Jogos</h4>

    <div class="card card-form shadow-sm border-0 p-5 w-100">
      <GameLibrary>
        <template #botao="{ jogo }">
          <div class="d-flex gap-2">
            <button class="btn btn-outline-primary w-100" @click="abrirDetalhes(jogo)">
              <i class="bi bi-eye me-2"></i> Ver Mais
            </button>
            <button class="btn btn-success w-100" @click="abrirJogo(jogo)">
              <i class="bi bi-controller me-2"></i> Jogar
            </button>
          </div>
        </template>
      </GameLibrary>
    </div>

    <!-- Modal de detalhes -->
    <div v-if="detailsOpened" class="modal-backdrop" @click.self="fecharDetalhes">
      <div class="modal-content">
        <div class="modal-header-custom">
          <h2 class="titulo-branco">{{ jogoSelecionado?.descricaoCurta }}</h2>
        </div>
        <div class="texto-container">
          <h6 class="subtitulo">{{ jogoSelecionado?.descricao }}</h6>
          <hr class="lore-divider" />
          <p class="lore">{{ jogoSelecionado?.descricaoCompleta }}</p>
          <hr class="lore-divider" />
        </div>
        <CarrosselImagens :imagens="jogoSelecionado?.imagensBase64" />

        <button class="btn btn-secondary mt-3 w-100" @click="fecharDetalhes">Fechar</button>
      </div>
    </div>

    <!-- Modal de jogo -->
    <div v-if="jogoOpened" class="modal-backdrop" @click.self="fecharJogo">
      <div class="modal-content modal-content-jogo">
        <iframe
          v-if="jogoSelecionado?.url"
          :src="jogoSelecionado.url"
          width="100%"
          height="600"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <button class="btn btn-secondary mt-3 w-100" @click="fecharJogo">Fechar</button>
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
      jogoSelecionado: null as JogoModel | null,
      detailsOpened: false,
      jogoOpened: false
    }
  },
  methods: {
    abrirDetalhes(jogo: JogoModel) {
      this.jogoSelecionado = jogo
      this.detailsOpened = true
    },
    abrirJogo(jogo: JogoModel) {
      this.jogoSelecionado = jogo
      this.jogoOpened = true
    },
    fecharDetalhes() {
      this.detailsOpened = false
      this.jogoSelecionado = null
    },
    fecharJogo() {
      this.jogoOpened = false
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

.modal-content-jogo {
  padding: 0;
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
