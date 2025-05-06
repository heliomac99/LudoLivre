<template>
  <div class="container py-4">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="jogo in jogos" :key="jogo.id">
        <div class="card cardGame h-100 shadow-sm">
          <img
            :src="jogo.wallpaperBase64"
            class="card-img-top"
            alt="Capa do jogo"
            style="height: 200px; object-fit: cover;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ jogo.descricaoCurta }}</h5>
            <p class="card-text text-muted">{{ jogo.descricao }}</p>
          </div>
          <div class="card-footer border-0 bg-transparent">
            <button class="btn btn-primary w-100" @click="verMais(jogo)">Ver mais</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal com carrossel -->
    <div v-if="jogoSelecionado" class="modal-backdrop" @click.self="fechar">
      <div class="modal-content">
        <!-- Header do modal -->
        <div class="modal-header-custom">
          <h2 class="titulo-branco">{{ jogoSelecionado.descricaoCurta }}</h2>
        </div>

        <!-- Corpo do modal -->
        <div class="texto-container">
          <h8 class="subtitulo">{{ jogoSelecionado.descricao }}</h8>
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
import jogoService from '@/services/jogoService'
import CarrosselImagens from '@/components/Carrossel.vue'

export default defineComponent({
  name: 'GameLibrary',
  components: { CarrosselImagens },
  data() {
    return {
      jogos: [] as any[],
      jogoSelecionado: null as any
    }
  },
  mounted() {
    this.buscarJogos()
  },
  methods: {
    async buscarJogos() {
      try {
        const response = await jogoService.listarTodos()
        this.jogos = response
      } catch (err) {
        console.error('Erro ao buscar jogos:', err)
      }
    },
    verMais(jogo: any) {
      this.jogoSelecionado = jogo
    },
    fechar() {
      this.jogoSelecionado = null
    }
  }
})
</script>

<style scoped>
.cardGame {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.cardGame:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  z-index: 1;
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

.modal-content h5 {
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 16px;
}

.modal-content label {
  color: #bbbbbb;
  font-size: 1rem;
  display: block;
  margin-bottom: 20px;
  white-space: pre-wrap;
}

button.btn.btn-secondary {
  background-color: #444;
  border: none;
  color: #fff;
}
button.btn.btn-secondary:hover {
  background-color: #555;
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
