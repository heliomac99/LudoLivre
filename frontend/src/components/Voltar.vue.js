import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Voltar',
    methods: {
        voltar() {
            this.$router.back();
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (__VLS_ctx.voltar) },
    ...{ class: "bi bi-arrow-left" },
});
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-arrow-left']} */ ;
var __VLS_dollars;
let __VLS_self;
