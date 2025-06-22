import { defineComponent } from 'vue';
import { useUsuarioStore } from '@/stores/usuario';
import { useRouter } from 'vue-router';
import logo from '@/assets/logoLudoLivre.png';
import ButtonLoading from '../components/ButtonLoading.vue';
import Voltar from '@/components/Voltar.vue';
export default defineComponent({
    components: { ButtonLoading, Voltar },
    data() {
        return {
            isLoadingLogout: false,
            menuVisiveis: {},
            usuarioStore: useUsuarioStore(),
            router: useRouter(),
            logo,
            iconMap: {
                Usuário: 'bi-people',
                Jogos: 'bi-controller',
                Configurações: 'bi-gear'
            }
        };
    },
    computed: {
        usuario() {
            return this.usuarioStore.usuario;
        },
        menuGroups() {
            const grouped = {};
            const permissoes = this.usuarioStore.permissoes;
            this.$router.getRoutes().forEach(route => {
                const meta = route.meta || {};
                const permissaoNecessaria = meta.permissao;
                if (meta.goesToMenu && meta.menuGroup) {
                    if (permissaoNecessaria === undefined ||
                        (permissaoNecessaria && permissoes.includes(permissaoNecessaria))) {
                        if (!grouped[meta.menuGroup])
                            grouped[meta.menuGroup] = [];
                        grouped[meta.menuGroup].push(route);
                    }
                }
            });
            return grouped;
        }
    },
    methods: {
        async logout() {
            this.isLoadingLogout = true;
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                this.usuarioStore.limparUsuario();
                this.$router.push('/login');
            }
            finally {
                this.isLoadingLogout = false;
            }
        },
        toggleGroup(group) {
            this.menuVisiveis[group] = !this.menuVisiveis[group];
            localStorage.setItem('menuVisiveis', JSON.stringify(this.menuVisiveis));
        }
    },
    watch: {
        menuVisiveis: {
            handler(newVal) {
                localStorage.setItem('menuVisiveis', JSON.stringify(newVal));
            },
            deep: true
        }
    },
    mounted() {
        const savedState = localStorage.getItem('menuVisiveis');
        if (savedState) {
            this.menuVisiveis = JSON.parse(savedState);
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = { ButtonLoading, Voltar };
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['sublink']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['sublink']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex home-layout" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "bg-dark text-white border-end d-flex flex-column justify-content-between p-3 vh-100 position-fixed shadow-sm" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "position-relative mb-4" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/home",
}));
const __VLS_2 = __VLS_1({
    to: "/home",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-content-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.logo),
    alt: "Logo",
    ...{ class: "sidebar-logo" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "nav flex-column mt-3" },
});
for (const [routes, group] of __VLS_getVForSourceType((__VLS_ctx.menuGroups))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (group),
        ...{ class: "nav-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggleGroup(group);
            } },
        ...{ class: "nav-link d-flex justify-content-between align-items-center" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: (['bi', __VLS_ctx.iconMap[group] || 'bi-folder', 'me-2']) },
    });
    (group);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "bi" },
        ...{ class: (__VLS_ctx.menuVisiveis[group] ? 'bi-dash' : 'bi-chevron-down') },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: "nav flex-column ms-3 mt-1" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.menuVisiveis[group]) }, null, null);
    for (const [route] of __VLS_getVForSourceType((routes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (route.path),
            ...{ class: "nav-item" },
        });
        const __VLS_4 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            to: (route.path),
            ...{ class: "nav-link sublink ps-4 d-flex align-items-center" },
            activeClass: "active",
        }));
        const __VLS_6 = __VLS_5({
            to: (route.path),
            ...{ class: "nav-link sublink ps-4 d-flex align-items-center" },
            activeClass: "active",
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        __VLS_7.slots.default;
        (route.meta?.label || route.name);
        var __VLS_7;
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-auto pt-3 border-top border-secondary" },
});
const __VLS_8 = {}.ButtonLoading;
/** @type {[typeof __VLS_components.ButtonLoading, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    label: "Logout",
    loading: (__VLS_ctx.isLoadingLogout),
    disabled: (__VLS_ctx.isLoadingLogout),
    variant: "primary",
    ...{ class: "btn-sm w-100" },
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    label: "Logout",
    loading: (__VLS_ctx.isLoadingLogout),
    disabled: (__VLS_ctx.isLoadingLogout),
    variant: "primary",
    ...{ class: "btn-sm w-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.logout)
};
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-grow-1" },
    ...{ style: ({ marginLeft: '250px' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "navbar bg-white shadow-sm px-4 d-flex justify-content-between align-items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-grow-1 d-flex justify-content-center" },
});
const __VLS_16 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    to: "/home",
}));
const __VLS_18 = __VLS_17({
    to: "/home",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.logo),
    alt: "Logo",
    ...{ class: "navbar-logo" },
});
var __VLS_19;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "p-4" },
});
const __VLS_20 = {}.Voltar;
/** @type {[typeof __VLS_components.Voltar, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['home-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-end']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['vh-100']} */ ;
/** @type {__VLS_StyleScopedClasses['position-fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['position-relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-center']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['nav']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['me-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['nav']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['ms-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['sublink']} */ ;
/** @type {__VLS_StyleScopedClasses['ps-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-top']} */ ;
/** @type {__VLS_StyleScopedClasses['border-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-center']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
var __VLS_dollars;
let __VLS_self;
