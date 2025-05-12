<template>
  <transition name="slide-down">
    <div v-if="mostrarFiltros" class="filtros-absoluto">
      <div class="container py-3">
        <div class="row g-3 align-items-end">
          <div class="col-md-5">
            <label class="form-label">Título</label>
            <input v-model="filtros.descricaoCurta" class="form-control" @keyup.enter="aplicarFiltros" />
          </div>
          <div class="col-md-5">
            <label class="form-label">Sub Título</label>
            <input v-model="filtros.descricao" class="form-control" @keyup.enter="aplicarFiltros" />
          </div>
          <div class="col-12 text-end mt-3">
            <button class="btn btn-outline-secondary" style="margin-right: 5px;" @click="mostrarFiltros=false">Fechar</button>
            <button class="btn btn-primary" @click="aplicarFiltros">Filtrar</button>
          </div>
        </div>
      </div>
    </div>
  </transition>


  <div v-if="screenLoading">
    <LoadingSpinner></LoadingSpinner>
  </div>
  <div class="container py-4"
      v-else
      :style="{ marginTop: mostrarFiltros ? '80px' : '0' }"
    >
  
    <div class="d-flex justify-content-between align-items-center mt-3 mb-4 px-4">
      <div>
        <slot name="header"></slot>
      </div>
      <div>
        <button class="btn btn-outline-primary" title="filtros" @click="mostrarFiltros = !mostrarFiltros" v-if="!mostrarFiltros">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>


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
            <slot name="botao" :jogo="jogo">
            </slot>
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
        <button class="btn btn-secondary mt-3 w-100" @click="fechar" style="margin-top:40px !important">Fechar</button>
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
import { FilterOperator } from '@/helpers/DataSource'


export default defineComponent({
  name: 'GameLibrary',
  components: { CarrosselImagens, LoadingSpinner },
  props: {
  usuarioId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      mostrarFiltros: false,
      filtros: {
        descricaoCurta: '',
        descricao: '',
        descricaoCompleta: ''
      },
      screenLoading: false,
      dataSource: {
        itens: [],
        total: 0,
        currentPage: 1,
        pageCount: 0,
        pageSize: 3,
        filters: []
      } as DataSource<JogoModel>,
      jogoSelecionado: null as JogoModel | null
    }
  },
  mounted() {
    this.buscarJogos()
  },
  methods: {
    aplicarFiltros() {
      this.dataSource.filters = []

      if (this.filtros.descricaoCurta)
        this.dataSource.filters.push({ field: 'descricaoCurta', operator: FilterOperator.CONTAINS, value: this.filtros.descricaoCurta })

      if (this.filtros.descricao)
        this.dataSource.filters.push({ field: 'descricao', operator: FilterOperator.CONTAINS, value: this.filtros.descricao })

      if (this.filtros.descricaoCompleta)
        this.dataSource.filters.push({ field: 'descricaoCompleta', operator: FilterOperator.CONTAINS, value: this.filtros.descricaoCompleta })

      this.dataSource.currentPage = 1
      this.buscarJogos()
    },
    async buscarJogos() {
      this.screenLoading = true;
      try {
        let response;
        if (this.usuarioId != null) {
          response = await jogoService.paginadoPorUsuario(this.usuarioId, this.dataSource)
        } else {
          response = await jogoService.paginado(this.dataSource)
        }
        this.dataSource = response;
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
      } finally {
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

.filtros-absoluto {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1050;
}

/* Transição */
.slide-down-enter-active, .slide-down-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-down-enter-to, .slide-down-leave-from {
  max-height: 600px;
  opacity: 1;
}
</style>
