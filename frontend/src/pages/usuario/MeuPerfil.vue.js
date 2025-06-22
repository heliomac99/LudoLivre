import { defineComponent } from 'vue';
import ButtonLoading from '@/components/ButtonLoading.vue';
import usuarioService from '@/services/usuarioService';
import { useToast } from 'vue-toastification';
import Multiselect from '@vueform/multiselect';
import { useUsuarioStore } from '@/stores/usuario';
const toast = useToast();
export default defineComponent({
    components: { ButtonLoading, Multiselect },
    data() {
        return {
            model: {},
            isLoading: false,
            tipoUsuarios: []
        };
    },
    async mounted() {
        this.model = await usuarioService.obterPerfil();
        this.tipoUsuarios = await usuarioService.listarTiposUsuario();
    },
    methods: {
        async salvar() {
            const usuarioStore = useUsuarioStore();
            this.isLoading = true;
            try {
                await usuarioService.atualizar(this.model);
                await usuarioStore.carregarPermissoes();
                toast.success('Perfil atualizado com sucesso!');
            }
            catch (error) {
                console.error('Erro ao atualizar perfil:', error.response?.data || error);
                toast.error('Erro ao atualizar perfil.');
            }
            finally {
                this.isLoading = false;
            }
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = { ButtonLoading, Multiselect };
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "py-4 px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "titulo mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card card-form shadow-sm border-0 p-5 w-100" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.salvar) },
    ...{ class: "w-100" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3 w-100" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "nome",
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "nome",
    type: "text",
    ...{ class: "form-control w-100" },
    value: (__VLS_ctx.model.nome),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-4 w-100" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "email",
    ...{ class: "form-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "email",
    type: "email",
    ...{ class: "form-control w-100" },
    disabled: true,
});
(__VLS_ctx.model.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "tipoUsuario",
});
const __VLS_0 = {}.Multiselect;
/** @type {[typeof __VLS_components.Multiselect, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.model.tipoUsuarioIds),
    options: (__VLS_ctx.tipoUsuarios),
    objetct: (false),
    mode: "tags",
    label: "texto",
    valueProp: "valor",
    placeholder: "Selecione as opções",
    searchable: (true),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.model.tipoUsuarioIds),
    options: (__VLS_ctx.tipoUsuarios),
    objetct: (false),
    mode: "tags",
    label: "texto",
    valueProp: "valor",
    placeholder: "Selecione as opções",
    searchable: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.ButtonLoading;
/** @type {[typeof __VLS_components.ButtonLoading, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ style: {} },
    label: "Salvar",
    loading: (__VLS_ctx.isLoading),
    type: "submit",
    variant: "primary",
    ...{ class: "w-100" },
}));
const __VLS_6 = __VLS_5({
    ...{ style: {} },
    label: "Salvar",
    loading: (__VLS_ctx.isLoading),
    type: "submit",
    variant: "primary",
    ...{ class: "w-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['titulo']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-form']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
var __VLS_dollars;
let __VLS_self;
