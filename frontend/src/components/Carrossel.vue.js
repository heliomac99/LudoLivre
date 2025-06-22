import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CarrosselImagens',
    props: {
        imagens: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            indiceAtual: 0
        };
    },
    methods: {
        irPara(index) {
            this.indiceAtual = index;
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['thumb-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['thumb-wrapper']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "carousel-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-image-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.imagens[__VLS_ctx.indiceAtual]),
    ...{ class: "main-image" },
    alt: "Imagem selecionada",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "thumbs-container" },
});
for (const [img, index] of __VLS_getVForSourceType((__VLS_ctx.imagens))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.irPara(index);
            } },
        key: (index),
        ...{ class: "thumb-wrapper" },
        ...{ class: ({ active: index === __VLS_ctx.indiceAtual }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (img),
        alt: "Miniatura",
        ...{ class: "thumb" },
    });
}
/** @type {__VLS_StyleScopedClasses['carousel-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['main-image-container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-image']} */ ;
/** @type {__VLS_StyleScopedClasses['thumbs-container']} */ ;
/** @type {__VLS_StyleScopedClasses['thumb-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['thumb']} */ ;
var __VLS_dollars;
let __VLS_self;
