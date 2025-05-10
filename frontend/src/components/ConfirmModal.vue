<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-content shadow-lg p-4 rounded bg-white">
      <h5 class="mb-3">{{ title }}</h5>
      <p class="mb-4">{{ message }}</p>
      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-secondary" @click="cancel">Cancelar</button>
        <button class="btn btn-danger" @click="confirm">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfirmModal',
  props: {
    title: { type: String, default: 'Confirmar Ação' },
    message: { type: String, default: 'Você tem certeza que deseja continuar?' },
    visible: { type: Boolean, required: true }
  },
  emits: ['confirm', 'cancel'],
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  width: 100%;
  max-width: 400px;
}
</style>
