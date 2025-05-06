<template>
  <div class="py-4 px-4">
    <!-- Título fora do card -->
    <h4 class="titulo mb-3">Jogos</h4>

    <!-- Card ocupando largura total -->
    <div class="card card-form shadow-sm border-0 p-5 w-100">
      <GameLibrary></GameLibrary>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameLibrary from '@/components/GameLibrary.vue'

export default defineComponent({
  name: 'Biblioteca',
  components: { GameLibrary },
  data() {
    return {
    }
  },
  methods: {

  }
})
</script>

<style scoped>
.card-form {
  background-color: #ffffff;
  width: 100%;
}

.form-perfil {
  max-width: 500px;
}
</style>
