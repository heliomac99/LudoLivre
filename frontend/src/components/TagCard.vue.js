import { defineComponent } from 'vue';
import jogoService from '@/services/jogoService';
export default defineComponent({
    name: 'TagCard',
    props: {
        tags: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    emits: ['update:tags'],
    data() {
        return {
            todasTags: []
        };
    },
    computed: {
        tagsDisponiveis() {
            return this.todasTags.filter(t => !this.tags.includes(t));
        }
    },
    async mounted() {
        this.todasTags = await jogoService.listarTodasTags();
    },
    methods: {
        adicionarTag(tag) {
            const novasTags = [...this.tags, tag];
            this.$emit('update:tags', novasTags);
        },
        removerTag(tag) {
            const novasTags = this.tags.filter(t => t !== tag);
            this.$emit('update:tags', novasTags);
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card p-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "border rounded p-2" },
});
for (const [tag, index] of __VLS_getVForSourceType((__VLS_ctx.tags))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.removerTag(tag);
            } },
        key: ('jogo-' + index),
        ...{ class: "badge bg-primary me-1 mb-1" },
        ...{ style: {} },
    });
    (tag);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-2" },
});
for (const [tag, index] of __VLS_getVForSourceType((__VLS_ctx.tagsDisponiveis))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.adicionarTag(tag);
            } },
        key: ('disp-' + index),
        ...{ class: "badge bg-secondary me-1 mb-1" },
        ...{ style: {} },
    });
    (tag);
}
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['me-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['me-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
var __VLS_dollars;
let __VLS_self;
