<template>
  <div class="py-4 px-4">
    <h4 class="titulo mb-3">Meu Perfil</h4>

    <div class="card card-form shadow-sm border-0 p-5 w-100">
      <form @submit.prevent="salvar" class="w-100">
        <div class="mb-3 w-100">
          <label for="nome" class="form-label">Nome</label>
          <input
            id="nome"
            type="text"
            class="form-control w-100"
            v-model="model.nome"
            required
          />
        </div>

        <div class="mb-4 w-100">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            type="email"
            class="form-control w-100"
            v-model="model.email"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="tipoUsuario">Funções</label>
          <Multiselect
            v-model="model.tipoUsuarioIds"
            :options="tipoUsuarios"
            :objetct="false"
            mode="tags"
            label="texto"
            valueProp="valor"
            placeholder="Selecione as opções"
            :searchable="true"
          />
        </div>

        <ButtonLoading
          style="margin-top: 20px"
          label="Salvar"
          :loading="isLoading"
          type="submit"
          variant="primary"
          class="w-100"
        />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonLoading from '@/components/ButtonLoading.vue'
import usuarioService from '@/services/usuarioService'
import { useToast } from 'vue-toastification'
import type { UpdateModel } from '@/models/usuarioModel'
import Multiselect from '@vueform/multiselect'
import TextoValor from '@/helpers/TextoValor'

const toast = useToast()
export default defineComponent({
  components: { ButtonLoading, Multiselect },
  data() {
    return {
      model: {} as UpdateModel,
      isLoading: false,
      tipoUsuarios: [] as TextoValor[]
    }
  },
  async mounted() {
    this.model = await usuarioService.obterPerfil()
    this.tipoUsuarios = await usuarioService.listarTiposUsuario();
  },
  methods: {
    async salvar() {
      this.isLoading = true
      try {
        await usuarioService.atualizar(this.model)
        toast.success('Perfil atualizado com sucesso!')
      } catch (error: any) {
        console.error('Erro ao atualizar perfil:', error.response?.data || error)
        toast.error('Erro ao atualizar perfil.')
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped>
.card-form {
  background-color: #ffffff;
  width: 100%;
  overflow: visible; /* 👈 adiciona isso */
}
</style>
