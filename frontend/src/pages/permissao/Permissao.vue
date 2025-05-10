<template>
  <div class="py-4 px-4">
    <h4 class="titulo mb-3">Gerenciar Permissões</h4>

    <div class="card card-form shadow-sm border-0 p-5 w-100">
      <div class="mb-3">
        <label for="tipoUsuario">Funções</label>
        <MultiSelect
          v-model="tipoSelecionado"
          :options="tipoUsuarios"
          :object="false"
          label="texto"
          valueProp="valor"
          placeholder="Selecione uma opção"
          :searchable="true"
        />
      </div>

      <div v-if="tipoSelecionado" class="mt-4">
        <div v-for="perm in permissoes" :key="perm.id" class="form-check">
          <input
            style="margin-right: 20px;"
            :disabled="tipoSelecionado == 1"
            class="form-check-input"
            type="checkbox"
            :id="'perm_' + perm.id"
            :value="perm.id"
            v-model="perm.selecionado"
          />
          <label class="form-check-label" :for="'perm_' + perm.id">
            {{ perm.descricao }}
          </label>
        </div>
        

        <button class="btn btn-primary mt-4 w-100" @click="salvar">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'
import usuarioService from '@/services/usuarioService'
import permissaoService from '@/services/permissaoService'
import TextoValor from '@/helpers/TextoValor'
import MultiSelect from '@vueform/multiselect'
import PermissaoComSelecao from '@/models/permissao/permissaoComSelecao'

export default defineComponent({
  name: 'Permissao',
  components: { MultiSelect },
  data() {
    return {
      permissoes: [] as PermissaoComSelecao[],
      tipoSelecionado: null as number | null,
      tipoUsuarios: [] as TextoValor[]
    }
  },
  mounted() {
    this.carregarTipos()
  },
  watch: {
    tipoSelecionado() {
      this.carregarPermissoes()
    }
  },
  methods: {
    async carregarTipos() {
      this.tipoUsuarios = await usuarioService.listarTiposUsuario()
    },
    async carregarPermissoes() {
      if(this.tipoSelecionado){
        const response = await permissaoService.carregarPermissoesComIndicadorSelecionadas(this.tipoSelecionado)
        this.permissoes = response
      }
      else
        this.permissoes = []
    },
    async salvar() {
      if (!this.tipoSelecionado) return
      try {
        let obj ={
          tipoUsuarioId: this.tipoSelecionado,
          permissoes: this.permissoes.filter(x => x.selecionado).map(x => x.id)
        }
        await permissaoService.salvar(obj)
        useToast().success('Permissões salvas com sucesso!')
      } catch (err) {
        useToast().error('Erro ao salvar permissões.')
      }
    }
  }
})
</script>

<style scoped>
.card-form {
  background-color: #ffffff;
  width: 100%;
  overflow: visible;
}
.titulo {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
