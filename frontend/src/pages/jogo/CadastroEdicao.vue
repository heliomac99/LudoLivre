<template>
  <div class="py-4 px-4">
    <h4 class="titulo mb-3">Cadastro de Jogo</h4>

    <div class="card card-form shadow-sm border-0 p-5 w-100"> 
      
      <div v-if="screenLoading">
        <LoadingSpinner></LoadingSpinner>
      </div>

      <Form :validation-schema="schema" @submit="salvar" v-else>

      <div class="mb-3">
        <label for="url" class="form-label">Link</label>
        <Field name="url" v-slot="{ field, errorMessage }" v-model="model.url">
          <input id="url" type="text" class="form-control" v-bind="field" />
          <small class="text-danger">{{ errorMessage }}</small>
        </Field>
      </div>

        <div class="mb-3">
          <label for="descricaoCurta" class="form-label">Descrição Curta</label>
          <Field name="descricaoCurta" v-slot="{ field, errorMessage }" v-model="model.descricaoCurta">
            <input id="descricaoCurta" type="text" class="form-control" v-bind="field" />
            <small class="text-danger">{{ errorMessage }}</small>
          </Field>
        </div>

        <div class="mb-3">
          <label for="descricao" class="form-label">Descrição</label>
          <Field name="descricao" v-slot="{ field, errorMessage }" v-model="model.descricao">
            <input id="descricao" type="text" class="form-control" v-bind="field" />
            <small class="text-danger">{{ errorMessage }}</small>
          </Field>
        </div>

        <div class="mb-3">
          <label for="lore" class="form-label">Lore</label>
          <Field name="lore" v-slot="{ field, errorMessage }" v-model="model.descricaoCompleta">
            <textarea id="lore" class="form-control" rows="15" v-bind="field"></textarea>
            <small class="text-danger">{{ errorMessage }}</small>
          </Field>
        </div>

         <!-- Upload único de wallpaper -->
         <div class="mb-4">
          <label class="form-label">Wallpaper</label>
          <UploadImagens :multiplo="false" v-model:arquivos="model.wallpaper" />
        </div>

        <!-- Upload múltiplo de imagens -->
        <div class="mb-3">
          <label class="form-label">Imagens</label>
          <UploadImagens v-model:arquivos="model.imagens" />
        </div>

        <TagCard v-model:tags="model.tags" />


        <ButtonLoading
          style="margin-top: 20px"
          label="Salvar"
          :loading="isLoading"
          type="submit"
          variant="primary"
          class="w-100"
        />
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import UploadImagens from '@/components/UploadImagens.vue'
import { JogoModel } from '@/models/jogo/jogoModel'
import ButtonLoading from '@/components/ButtonLoading.vue'
import jogoService from '@/services/jogoService'
import { useToast } from 'vue-toastification'
import { base64ToFile, base64ArrayToFiles } from '@/helpers/Utils'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import TagCard from '@/components/TagCard.vue'

const toast = useToast()

export default defineComponent({
  name: 'CadastroEdicao',
  components: {
    Form,
    Field,
    UploadImagens,
    ButtonLoading,
    LoadingSpinner,
    TagCard
  },
  async mounted() {
    const id = this.$route.params.id
    if (id) {
      this.screenLoading = true
      const result = await jogoService.carregar(Number(id))
      this.model = result;
      this.model.imagens = base64ArrayToFiles(result.imagensBase64 || []),
      this.model.wallpaper = result.wallpaperBase64
          ? [base64ToFile(result.wallpaperBase64, result.nomeArquivoWallpaper)]
          : []
      this.screenLoading = false;
    }
  },
  data() {
    return {
      model: {} as JogoModel,
      screenLoading: false,
      isLoading: false,
      schema: yup.object({
        descricao: yup.string().required('A descrição é obrigatória'),
        descricaoCurta: yup.string().required('A descrição curta é obrigatória'),
        lore: yup.string().required('A lore é obrigatória'),
        url: yup.string().required('O link é obrigatório')
      })
    }
  },
  methods: {
   async salvar() {
      this.isLoading = true
      const id = this.$route.params.id

      try {
        if (id) {
          await jogoService.atualizar(Number(id), this.model)
          toast.success('Jogo atualizado com sucesso.')
        } else {
          await jogoService.cadastrar(this.model)
          toast.success('Jogo salvo com sucesso.')  
        }
        this.$router.back();
      } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
          toast.error((error as any).response?.data?.error || 'Erro ao salvar')
        } else {
          toast.error('Erro inesperado ao salvar')
        }
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
}
</style>