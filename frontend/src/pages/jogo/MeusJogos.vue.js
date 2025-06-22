import { defineComponent } from 'vue';
import { useUsuarioStore } from '@/stores/usuario';
import GameLibrary from '@/components/GameLibrary.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import jogoService from '@/services/jogoService';
import { useToast } from 'vue-toastification';
const toast = useToast();
export default defineComponent({
    name: 'MeusJogos',
    components: {
        GameLibrary,
        ConfirmModal
    },
    data() {
        return {
            key: 1,
            modalVisivel: false,
            jogoSelecionado: null
        };
    },
    methods: {
        inserir() {
            this.$router.push('/jogo/cadastroEdicao');
        },
        editar(jogo) {
            this.$router.push(`/jogo/cadastroEdicao/${jogo.id}`);
        },
        deletar(jogo) {
            this.jogoSelecionado = jogo;
            this.modalVisivel = true;
        },
        confirmarDelete() {
            if (!this.jogoSelecionado?.id)
                return;
            jogoService.deletar(this.jogoSelecionado.id)
                .then(() => {
                this.modalVisivel = false;
                this.jogoSelecionado = null;
                toast.success("Jogo removido com sucesso");
                this.key++;
            })
                .catch(err => {
                alert('Erro ao deletar: ' + (err.response?.data?.error || err.message));
            });
        }
    },
    computed: {
        usuario() {
            return useUsuarioStore().usuario;
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = {
    GameLibrary,
    ConfirmModal
};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "py-4 px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-content-between align-items-center mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "titulo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card card-form shadow-sm border-0 p-5 w-100" },
});
const __VLS_0 = {}.GameLibrary;
/** @type {[typeof __VLS_components.GameLibrary, typeof __VLS_components.GameLibrary, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    key: (__VLS_ctx.key),
    usuarioId: (__VLS_ctx.usuario?.id),
}));
const __VLS_2 = __VLS_1({
    key: (__VLS_ctx.key),
    usuarioId: (__VLS_ctx.usuario?.id),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.inserir) },
        ...{ class: "btn btn-primary d-flex justify-content-center align-items-center p-2" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "bi bi-plus-lg" },
    });
}
{
    const { botao: __VLS_thisSlot } = __VLS_3.slots;
    const [{ jogo }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.deletar(jogo);
            } },
        ...{ class: "btn btn-outline-danger w-100" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "bi bi-trash me-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.editar(jogo);
            } },
        ...{ class: "btn btn-success w-100" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "bi bi-pencil me-2" },
    });
}
var __VLS_3;
const __VLS_4 = {}.ConfirmModal;
/** @type {[typeof __VLS_components.ConfirmModal, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    visible: (__VLS_ctx.modalVisivel),
    title: "Excluir Jogo",
    message: (`Deseja excluir o jogo '${__VLS_ctx.jogoSelecionado?.descricaoCurta}'?`),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    visible: (__VLS_ctx.modalVisivel),
    title: "Excluir Jogo",
    message: (`Deseja excluir o jogo '${__VLS_ctx.jogoSelecionado?.descricaoCurta}'?`),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onConfirm: (__VLS_ctx.confirmarDelete)
};
const __VLS_12 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.modalVisivel = false;
    }
};
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['titulo']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-form']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-plus-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-trash']} */ ;
/** @type {__VLS_StyleScopedClasses['me-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-success']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-pencil']} */ ;
/** @type {__VLS_StyleScopedClasses['me-2']} */ ;
var __VLS_dollars;
let __VLS_self;
