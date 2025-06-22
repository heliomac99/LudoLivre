<template>
  <div class="d-flex home-layout">
    <!-- Sidebar -->
    <nav
      class="bg-dark text-white border-end d-flex flex-column justify-content-between p-3 vh-100 position-fixed shadow-sm"
      style="width: 250px;"
    >
      <div>
        <!-- Logo + botão fechar -->
        <div class="position-relative mb-4">
          <RouterLink to="/home">
            <div class="d-flex justify-content-center">
              <img :src="logo" alt="Logo" class="sidebar-logo" />
            </div>
          </RouterLink>
        </div>

        <!-- Menu agrupado -->
        <ul class="nav flex-column mt-3">
          <li
            v-for="(routes, group) in menuGroups"
            :key="group"
            class="nav-item"
          >
            <div
              class="nav-link d-flex justify-content-between align-items-center"
              @click="toggleGroup(group)"
              style="cursor: pointer;"
            >
              <span>
                <i :class="['bi', iconMap[group] || 'bi-folder', 'me-2']"></i>
                {{ group }}
              </span>
              <i class="bi" :class="menuVisiveis[group] ? 'bi-dash' : 'bi-chevron-down'"></i>
            </div>

            <ul v-show="menuVisiveis[group]" class="nav flex-column ms-3 mt-1">
              <li
                v-for="route in routes"
                :key="route.path"
                class="nav-item"
              >
                <RouterLink
                  :to="route.path"
                  class="nav-link sublink ps-4 d-flex align-items-center"
                  active-class="active"
                >
                  {{ (route.meta as any).label || route.name }}
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- Rodapé -->
      <div class="mt-auto pt-3 border-top border-secondary">
        <ButtonLoading
          label="Logout"
          :loading="isLoadingLogout"
          :disabled="isLoadingLogout"
          variant="primary"
          class="btn-sm w-100"
          @click="logout"
        />
      </div>
    </nav>

    <!-- Conteúdo -->
    <div class="flex-grow-1" :style="{ marginLeft: '250px' }">
      <nav class="navbar bg-white shadow-sm px-4 d-flex justify-content-between align-items-center">
        <div class="flex-grow-1 d-flex justify-content-center">
          <RouterLink to="/home">
            <img :src="logo" alt="Logo" class="navbar-logo" />
          </RouterLink>
        </div>
        <div style="width: 32px;"></div>
      </nav>

      <main class="p-4">
        <Voltar />
        <LandingPage v-if="route.path === '/home' || route.path === '/home/'" />
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'
import { useUsuarioStore } from '@/stores/usuario'
import logo from '@/assets/logoLudoLivre.png'
import ButtonLoading from '@/components/ButtonLoading.vue'
import Voltar from '@/components/Voltar.vue'
import LandingPage from '@/components/LandingPage.vue'

// Stores e roteamento
const usuarioStore = useUsuarioStore()
const router = useRouter()
const route = useRoute()

// Estados reativos
const isLoadingLogout = ref(false)
const menuVisiveis = ref<Record<string, boolean>>({})

// Mapa de ícones (pode ter qualquer grupo dinâmico)
const iconMap: Record<string, string> = {
  Usuário: 'bi-people',
  Jogos: 'bi-controller',
  Configurações: 'bi-gear'
}

// Computed para agrupar rotas no menu
const menuGroups = computed<Record<string, RouteRecordRaw[]>>(() => {
  const grouped: Record<string, RouteRecordRaw[]> = {}
  const permissoes = usuarioStore.permissoes

  router.getRoutes().forEach(r => {
    const meta = r.meta as Record<string, any>
    if (meta.goesToMenu && meta.menuGroup) {
      const need = meta.permissao
      if (need === undefined || permissoes.includes(need)) {
        grouped[meta.menuGroup] = grouped[meta.menuGroup] || []
        grouped[meta.menuGroup].push(r)
      }
    }
  })

  return grouped
})

// Métodos
function logout() {
  isLoadingLogout.value = true
  setTimeout(() => {
    usuarioStore.limparUsuario()
    router.push('/login')
    isLoadingLogout.value = false
  }, 800)
}
function toggleGroup(group: string) {
  menuVisiveis.value[group] = !menuVisiveis.value[group]
}

// Persistência do estado de menu
onMounted(() => {
  const saved = localStorage.getItem('menuVisiveis')
  if (saved) menuVisiveis.value = JSON.parse(saved)
})
watch(menuVisiveis, v => {
  localStorage.setItem('menuVisiveis', JSON.stringify(v))
}, { deep: true })
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.navbar {
  background-color: $color-light;
}

.navbar {
  min-height: 60px;
  height: 50px;
  background-color: #{$color-light} !important;
  border-bottom: 0.5px solid grey;
  box-shadow: 0 1px 2px rgba(0, 50, 1, 0.15);
}

.navbar-logo {
  max-height: 45px;
  max-width: 110px;
  object-fit: contain;
  cursor: pointer;
}

.home-layout {
  min-height: 100vh;
  background-color: #f1f3f5;
}

.sidebar-logo {
  width: 100px;
  max-height: 75px;
  object-fit: contain;
}

.bg-dark {
  background: linear-gradient(180deg, #3b3a68, #2e2d52);
  color: #e0e0e0;
}

.nav-link,
.sublink {
  font-size: small;
  color: #cdd3e0;
}

.nav-link:hover,
.sublink:hover {
  background-color: rgba(177, 151, 252, 0.1);
  color: #fff;
}

.nav-link.active,
.sublink.active {
  color: #b197fc !important;
  font-weight: 600;
}

.btn-primary {
  background-color: #5f3dc4 !important;
  border-color: #5f3dc4 !important;
}

.btn-primary:hover {
  background-color: #4c2ea9 !important;
  border-color: #4c2ea9 !important;
}
</style>
