<template>
  <div>
    <!-- Área de Drop e Input -->
    <div
      class="drop-area mb-3"
      :class="{ 'drop-hover': isDragging }"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
    >
      <label class="btn btn-primary mb-2">
        Selecionar Imagens
        <input
          type="file"
          :multiple="multiplo"
          accept="image/*"
          @change="onFilesSelected"
          style="display: none;"
        />
      </label>
      <p class="text-muted mb-0">Ou arraste {{ multiplo ? 'as imagens' : 'uma imagem' }} aqui</p>
    </div>

    <!-- Indicador de upload -->
    <div v-if="isUploading" class="mb-3 text-primary d-flex align-items-center gap-2">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span>Processando imagens...</span>
    </div>

    <!-- Imagens Preview -->
    <div class="d-flex flex-wrap gap-3">
      <div
        v-for="(url, index) in previewUrls"
        :key="index"
        class="position-relative"
        style="width: 150px;"
      >
        <img
          :src="url"
          class="img-thumbnail"
          style="width: 150px; height: 150px; object-fit: cover;"
        />
        <button
          type="button"
          class="btn btn-sm btn-menu-color text-white position-absolute top-0 end-0 m-1"
          @click="removerImagem(index)"
          title="Remover imagem"
        >
          <i class="bi bi-trash text-danger"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadImagens',
  props: {
    multiplo: {
      type: Boolean,
      default: true
    },
    arquivos: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:arquivos'],
  data() {
    return {
      previewUrls: [],
      isDragging: false,
      isUploading: false
    }
  },
  watch: {
    arquivos: {
      handler(novosArquivos) {
        console.log(novosArquivos);
        this.previewUrls = (novosArquivos || []).map(file => URL.createObjectURL(file))
      },
      immediate: true
    }
  },
  computed: {
    arquivosInternos: {
      get() {
        return this.arquivos
      },
      set(val) {
        this.$emit('update:arquivos', val)
      }
    }
  },
  methods: {
    async processFiles(files) {
      this.isUploading = true
      try {
        const selectedFiles = Array.from(files)

        if (!this.multiplo) {
          this.arquivosInternos = [selectedFiles[0]]
          this.previewUrls = [URL.createObjectURL(selectedFiles[0])]
        } else {
          this.arquivosInternos = [...this.arquivosInternos, ...selectedFiles]
          this.previewUrls = [...this.previewUrls, ...selectedFiles.map(f => URL.createObjectURL(f))]
        }
      } catch (error) {
        console.error('Erro ao processar imagens:', error)
      } finally {
        this.isUploading = false
      }
    },
    onFilesSelected(event) {
      if (event.target.files) this.processFiles(event.target.files)
    },
    onDrop(event) {
      this.isDragging = false
      if (event.dataTransfer?.files) {
        this.processFiles(event.dataTransfer.files)
      }
    },
    onDragOver() {
      this.isDragging = true
    },
    onDragLeave() {
      this.isDragging = false
    },
    removerImagem(index) {
      const novos = [...this.arquivosInternos]
      novos.splice(index, 1)
      this.arquivosInternos = novos
      this.previewUrls.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.btn-menu-color {
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-menu-color:hover {
  background-color: white;
}

.drop-area {
  border: 2px dashed #ccc;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
  transition: border-color 0.3s, background-color 0.1s;
  cursor: pointer;
}

.drop-hover {
  border-color: #7269ef;
  background-color: #f8f9fa;
}
</style>
