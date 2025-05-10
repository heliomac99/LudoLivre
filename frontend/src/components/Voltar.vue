<template>
    <i class="bi bi-arrow-left" @click="voltar"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Voltar',
  methods: {
    voltar() {
      this.$router.back()
    }
  }
})
</script>

<style scoped>
.voltar-wrapper {
  border-bottom: 1px solid #e5e5e5;
  background-color: #f9f9f9;
}
</style>
