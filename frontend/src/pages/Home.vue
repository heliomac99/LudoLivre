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
                  {{ route.meta?.label || route.name }}
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
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue'
import { useUsuarioStore } from '@/stores/usuario'
import { useRouter } from 'vue-router'
import logo from '@/assets/logoLudoLivre.png'
import type { RouteRecordRaw } from 'vue-router'
import ButtonLoading from '../components/ButtonLoading.vue'
import Voltar from '@/components/Voltar.vue'

export default defineComponent({
  components: { ButtonLoading, Voltar },
  data() {
    return {
      isLoadingLogout: false,
      menuVisiveis: {} as Record<string, boolean>,
      usuarioStore: useUsuarioStore(),
      router: useRouter(),
      logo,
      iconMap: {
        Usuário: 'bi-people',
        Jogos: 'bi-controller',
        Configurações: 'bi-gear'
      }
    }
  },
  computed: {
    usuario() {
      return this.usuarioStore.usuario
    },
    menuGroups(): Record<string, RouteRecordRaw[]> {
      const grouped: Record<string, RouteRecordRaw[]> = {}
      const permissoes = this.usuarioStore.permissoes

      this.$router.getRoutes().forEach(route => {
        const meta = route.meta || {}
        const permissaoNecessaria = meta.permissao

        if (meta.goesToMenu && meta.menuGroup) {
          if (
            permissaoNecessaria === undefined ||
            permissoes.includes(permissaoNecessaria)
          ) {
            if (!grouped[meta.menuGroup]) grouped[meta.menuGroup] = []
            grouped[meta.menuGroup].push(route)
          }
        }
      })

      return grouped
    }
  },
  methods: {
    async logout() {
      this.isLoadingLogout = true
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        this.usuarioStore.limparUsuario()
        this.$router.push('/login')
      } finally {
        this.isLoadingLogout = false
      }
    },
    toggleGroup(group: string) {
      this.menuVisiveis[group] = !this.menuVisiveis[group]
      localStorage.setItem('menuVisiveis', JSON.stringify(this.menuVisiveis))
    }
  },
  watch: {
    menuVisiveis: {
      handler(newVal) {
        localStorage.setItem('menuVisiveis', JSON.stringify(newVal))
      },
      deep: true
    }
  },
  mounted() {
    const savedState = localStorage.getItem('menuVisiveis')
    if (savedState) {
      this.menuVisiveis = JSON.parse(savedState)
    }
  }
})
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
