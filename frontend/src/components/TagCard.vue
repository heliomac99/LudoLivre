<template>
  <div class="card p-2">
    <!-- Tags do jogo -->
    <div class="border rounded p-2">
      <span 
        v-for="(tag, index) in tags" 
        :key="'jogo-' + index" 
        class="badge bg-primary me-1 mb-1"
        @click="removerTag(tag)"
        style="cursor: pointer;"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Tags disponíveis para adicionar -->
    <div class="mb-2">
      <span 
        v-for="(tag, index) in tagsDisponiveis" 
        :key="'disp-' + index" 
        class="badge bg-secondary me-1 mb-1"
        @click="adicionarTag(tag)"
        style="cursor: pointer;"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import jogoService from '@/services/jogoService'

export default defineComponent({
  name: 'TagCard',
  props: {
    tags: {
      type: Array as () => string[],
      required: false,
      default: () => []
    }
  },
  emits: ['update:tags'],
  data() {
    return {
      todasTags: [] as string[]
    }
  },
  computed: {
    tagsDisponiveis(): string[] {
      return this.todasTags.filter(t => !this.tags.includes(t))
    }
  },
  async mounted() {
    this.todasTags = await jogoService.listarTodasTags()
  },
  methods: {
    adicionarTag(tag: string) {
      const novasTags = [...this.tags, tag]
      this.$emit('update:tags', novasTags)
    },
    removerTag(tag: string) {
      const novasTags = this.tags.filter(t => t !== tag)
      this.$emit('update:tags', novasTags)
    }
  }
})
</script>
