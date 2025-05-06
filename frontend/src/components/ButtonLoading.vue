<template>
    <button
      :type="type"
      class="btn"
      :class="btnClass"
      :disabled="loading || disabled"
    >
      <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      <span>{{ label }}</span>
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue'
  
  export default defineComponent({
    name: 'ButtonLoading',
    props: {
      label: {
        type: String,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button'
      },
      variant: {
        type: String,
        default: 'primary' // Bootstrap variant
      }
    },
    computed: {
      btnClass(): string {
        return `btn-${this.variant}`
      }
    }
  })
  </script>
  