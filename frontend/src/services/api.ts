import axios from 'axios'
import { useUsuarioStore } from '@/stores/usuario'
import router from '@/router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000',
  withCredentials: true
})

api.interceptors.request.use(config => {
  const store = useUsuarioStore()
  if (store.token) {
    config.headers.Authorization = `Bearer ${store.token}`
  }
  if (store.usuario?.id) {
    config.headers['X-Usuario-Id'] = store.usuario.id.toString()
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const store = useUsuarioStore()
      store.limparUsuario()
      router.push('/login')
      toast.error('Sessão expirada.')
    }
    return Promise.reject(error)
  }
)

export default api
