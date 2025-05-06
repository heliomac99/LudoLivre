<template>
  <div class="login-page">
    <div class="min-vh-100 d-flex justify-content-center align-items-center">
      <div class="card shadow p-4" style="width: 100%; max-width: 600px; min-height: 400px;">
        <h3 class="text-center mb-4">{{ isCadastro ? 'Cadastro' : 'Login' }}</h3>

        <!-- Formulário de Login -->
        <Form v-if="!isCadastro" :validation-schema="loginSchema" @submit="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field name="email" v-model="loginModel.email" type="email" class="form-control" />
            <ErrorMessage name="email" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <Field name="password" v-model="loginModel.password" type="password" class="form-control" />
            <ErrorMessage name="password" class="text-danger small" />
          </div>

          <ButtonLoading
            label="Entrar"
            :loading="isLoadingLogin"
            type="submit"
            variant="primary"
            class="w-100 mb-3"
          />

        </Form>

        <!-- Formulário de Cadastro -->
        <Form v-else :validation-schema="registroSchema" @submit="handleRegister">
          <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <Field name="nome" v-model="registroModel.nome" type="text" class="form-control" />
            <ErrorMessage name="nome" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field name="email" v-model="registroModel.email" type="email" class="form-control" />
            <ErrorMessage name="email" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <Field name="password" v-model="registroModel.password" type="password" class="form-control" />
            <ErrorMessage name="password" class="text-danger small" />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirmar Senha</label>
            <Field name="confirmPassword" v-model="confirmPassword" type="password" class="form-control" />
            <ErrorMessage name="confirmPassword" class="text-danger small" />
          </div>

            <ButtonLoading
              label="Cadastrar"
              :loading="isLoadingCadastro"
              type="submit"
              variant="primary"
              class="w-100 mb-3"
            />
        </Form>

        <button class="btn btn-link w-100" @click="toggleMode">
          {{ isCadastro ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastrar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import usuarioService from '../../services/usuarioService';
import type { LoginModel } from '../../models/usuario/usuarioModel';
import type { RegistroModel } from '../../models/usuario/usuarioModel';
import { useUsuarioStore } from '../../stores/usuario';
import ButtonLoading from '../../components/ButtonLoading.vue';

const toast = useToast();

export default defineComponent({
  components: { Form, Field, ErrorMessage, ButtonLoading },
  data() {
    return {
      isCadastro: false,
      confirmPassword: '',
      isLoadingLogin: false,
      isLoadingCadastro: false,
      loginModel: {
        email: '',
        password: ''
      } as LoginModel,
      registroModel: {
        nome: '',
        email: '',
        password: ''
      } as RegistroModel,
      loginSchema: yup.object({
        email: yup.string().email('Email inválido').required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório')
      }),
      registroSchema: yup.object({
        nome: yup.string().required('Campo obrigatório'),
        email: yup.string().email('Email inválido').required('Campo obrigatório'),
        password: yup.string().min(6).required('Campo obrigatório'),
        confirmPassword: yup.string()
          .oneOf([yup.ref('password')], 'Senhas não conferem')
          .required('Campo obrigatório')
      })
    };
  },
  methods: {
    toggleMode() {
      this.isCadastro = !this.isCadastro;
    },
    async handleLogin() {
      this.isLoadingLogin = true;
      try {
        const data = await usuarioService.login(this.loginModel);
        if (data) {
          const usuarioStore = useUsuarioStore();
          usuarioStore.setUsuario(data.usuario, data.access_token);
          this.$router.push('/home');
        }
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao realizar login');
      } finally {
        this.isLoadingLogin = false;
      }
    },
    async handleRegister() {
      this.isLoadingCadastro = true;
      try {
        await usuarioService.registrar(this.registroModel);
        toast.success('Cadastro realizado com sucesso!');
        this.isCadastro = false;
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao realizar cadastro');
      } finally {
        this.isLoadingCadastro = false;
      }
    }
  }
});
</script>

<style scoped>
.login-page {
  background-image: url('@/assets/wallpaper.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
</style>
