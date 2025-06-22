import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import usuarioService from '@/services/usuarioService';
import permissaoService from '@/services/permissaoService';
import MultiSelect from '@vueform/multiselect';
export default defineComponent({
    name: 'Permissao',
    components: { MultiSelect },
    data() {
        return {
            permissoes: [],
            tipoSelecionado: null,
            tipoUsuarios: []
        };
    },
    mounted() {
        this.carregarTipos();
    },
    watch: {
        tipoSelecionado() {
            this.carregarPermissoes();
        }
    },
    methods: {
        async carregarTipos() {
            this.tipoUsuarios = await usuarioService.listarTiposUsuario();
        },
        async carregarPermissoes() {
            if (this.tipoSelecionado) {
                const response = await permissaoService.carregarPermissoesComIndicadorSelecionadas(this.tipoSelecionado);
                this.permissoes = response;
            }
            else
                this.permissoes = [];
        },
        async salvar() {
            if (!this.tipoSelecionado)
                return;
            try {
                let obj = {
                    tipoUsuarioId: this.tipoSelecionado,
                    permissoes: this.permissoes.filter(x => x.selecionado).map(x => x.id)
                };
                await permissaoService.salvar(obj);
                useToast().success('Permissões salvas com sucesso!');
            }
            catch (err) {
                useToast().error('Erro ao salvar permissões.');
            }
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = { MultiSelect };
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "tipoUsuario",
});
const __VLS_0 = {}.MultiSelect;
/** @type {[typeof __VLS_components.MultiSelect, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.tipoSelecionado),
    options: (__VLS_ctx.tipoUsuarios),
    object: (false),
    label: "texto",
    valueProp: "valor",
    placeholder: "Selecione uma opção",
    searchable: (true),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.tipoSelecionado),
    options: (__VLS_ctx.tipoUsuarios),
    object: (false),
    label: "texto",
    valueProp: "valor",
    placeholder: "Selecione uma opção",
    searchable: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
if (__VLS_ctx.tipoSelecionado) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mt-4" },
    });
    for (const [perm] of __VLS_getVForSourceType((__VLS_ctx.permissoes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (perm.id),
            ...{ class: "form-check" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ style: {} },
            disabled: (__VLS_ctx.tipoSelecionado == 1),
            ...{ class: "form-check-input" },
            type: "checkbox",
            id: ('perm_' + perm.id),
            value: (perm.id),
        });
        (perm.selecionado);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-check-label" },
            for: ('perm_' + perm.id),
        });
        (perm.descricao);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.salvar) },
        ...{ class: "btn btn-primary mt-4 w-100" },
    });
}
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
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check-label']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
var __VLS_dollars;
let __VLS_self;
