<template>
  <div v-if="screenLoading">
    <LoadingSpinner></LoadingSpinner>
  </div>
  <div class="container py-4" v-else>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="jogo in dataSource.itens" :key="jogo.id">
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

    <div class="pagination mt-3" style="margin-top:40x !important">
        <button class="page-btn" :disabled="dataSource.currentPage === 1" @click="paginaAnterior">
          &laquo;
        </button>

        <button
          v-for="n in dataSource.pageCount"
          :key="n"
          class="page-btn"
          :class="{ active: dataSource.currentPage === n }"
          @click="irParaPagina(n)"
        >
          {{ n }}
        </button>

        <button class="page-btn" :disabled="dataSource.currentPage === dataSource.pageCount" @click="paginaProxima">
          &raquo;
        </button>
    </div>
    <!-- Modal com carrossel -->
    <div v-if="jogoSelecionado" class="modal-backdrop" @click.self="fechar">
      <div class="modal-content">
        <div class="modal-header-custom">
          <h2 class="titulo-branco">{{ jogoSelecionado.descricaoCurta }}</h2>
        </div>
        <div class="texto-container">
          <h8 class="subtitulo">{{ jogoSelecionado.descricao }}</h8>
          <hr class="lore-divider" />
          <p class="lore">{{ jogoSelecionado.descricaoCompleta }}</p>
          <hr class="lore-divider" />
        </div>
        <CarrosselImagens :imagens="jogoSelecionado.imagensBase64" />
        <button class="btn btn-primary mt-3 w-100" @click="fechar" style="margin-top:40px !important">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import jogoService from '@/services/jogoService'
import CarrosselImagens from '@/components/Carrossel.vue'
import { JogoModel } from '@/models/jogo/jogoModel'
import { DataSource } from '@/helpers/DataSource'
import LoadingSpinner from './LoadingSpinner.vue'

export default defineComponent({
  name: 'GameLibrary',
  components: { CarrosselImagens, LoadingSpinner },
  data() {
    return {
      screenLoading: false,
      dataSource: {
        itens: [],
        total: 0,
        currentPage: 1,
        pageCount: 0,
        pageSize: 3
      } as DataSource<JogoModel>,
      jogoSelecionado: null as JogoModel | null
    }
  },
  mounted() {
    this.buscarJogos()
  },
  methods: {
    async buscarJogos() {
      this.screenLoading = true;
      try {
        const response = await jogoService.paginado(this.dataSource.currentPage, this.dataSource.pageSize)
        this.dataSource = response;
        this.screenLoading = false;
      } catch (err) {
        console.error('Erro ao buscar jogos:', err)
        this.screenLoading = false;
      }
    },
    verMais(jogo: JogoModel) {
      this.jogoSelecionado = jogo
    },
    fechar() {
      this.jogoSelecionado = null
    },
    paginaAnterior() {
      if (this.dataSource.currentPage > 1) {
        this.dataSource.currentPage--
        this.buscarJogos()
      }
    },
    paginaProxima() {
      if (this.dataSource.currentPage < this.dataSource.pageCount) {
        this.dataSource.currentPage++
        this.buscarJogos()
      }
    },
    irParaPagina(n: number) {
      this.dataSource.currentPage = n;
      this.buscarJogos();
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

button.btn.btn-secondary {
  background-color: #444;
  border: none;
  color: #fff;
}
button.btn.btn-secondary:hover {
  background-color: #555;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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

.custom-pagination {
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  margin-top: 1.5rem;
  gap: 0.5rem;
}

.page-btn {
  font-size: 0.85rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  transition: 0.2s ease;
  
}

.page-btn:hover:not(:disabled) {
  opacity: 0.8;
}

.page-btn.active {
  background-color: #7269ef;
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
