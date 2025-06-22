import { defineComponent } from 'vue';
import GameLibrary from '@/components/GameLibrary.vue';
import CarrosselImagens from '@/components/Carrossel.vue';
export default defineComponent({
    name: 'Biblioteca',
    components: {
        GameLibrary,
        CarrosselImagens
    },
    data() {
        return {
            jogoSelecionado: null
        };
    },
    methods: {
        abrirModal(jogo) {
            this.jogoSelecionado = jogo;
        },
        fechar() {
            this.jogoSelecionado = null;
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = {
    GameLibrary,
    CarrosselImagens
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
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
const __VLS_0 = {}.GameLibrary;
/** @type {[typeof __VLS_components.GameLibrary, typeof __VLS_components.GameLibrary, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
{
    const { botao: __VLS_thisSlot } = __VLS_3.slots;
    const [{ jogo }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.abrirModal(jogo);
            } },
        ...{ class: "btn btn-primary w-100" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "bi bi-eye me-2" },
    });
}
var __VLS_3;
if (__VLS_ctx.jogoSelecionado) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.fechar) },
        ...{ class: "modal-backdrop" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-header-custom" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "titulo-branco" },
    });
    (__VLS_ctx.jogoSelecionado.descricaoCurta);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "texto-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h6, __VLS_intrinsicElements.h6)({
        ...{ class: "subtitulo" },
    });
    (__VLS_ctx.jogoSelecionado.descricao);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.hr)({
        ...{ class: "lore-divider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "lore" },
    });
    (__VLS_ctx.jogoSelecionado.descricaoCompleta);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.hr)({
        ...{ class: "lore-divider" },
    });
    const __VLS_4 = {}.CarrosselImagens;
    /** @type {[typeof __VLS_components.CarrosselImagens, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        imagens: (__VLS_ctx.jogoSelecionado.imagensBase64),
    }));
    const __VLS_6 = __VLS_5({
        imagens: (__VLS_ctx.jogoSelecionado.imagensBase64),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fechar) },
        ...{ class: "btn btn-secondary mt-3 w-100" },
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
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-eye']} */ ;
/** @type {__VLS_StyleScopedClasses['me-2']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-backdrop']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header-custom']} */ ;
/** @type {__VLS_StyleScopedClasses['titulo-branco']} */ ;
/** @type {__VLS_StyleScopedClasses['texto-container']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitulo']} */ ;
/** @type {__VLS_StyleScopedClasses['lore-divider']} */ ;
/** @type {__VLS_StyleScopedClasses['lore']} */ ;
/** @type {__VLS_StyleScopedClasses['lore-divider']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
var __VLS_dollars;
let __VLS_self;
