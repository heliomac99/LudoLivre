export default (await import('vue')).defineComponent({
    name: 'UploadImagens',
    props: {
        multiplo: {
            type: Boolean,
            default: true
        },
        arquivos: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:arquivos'],
    data() {
        return {
            previewUrls: [],
            isDragging: false,
            isUploading: false
        };
    },
    watch: {
        arquivos: {
            handler(novosArquivos) {
                console.log(novosArquivos);
                this.previewUrls = (novosArquivos || []).map(file => URL.createObjectURL(file));
            },
            immediate: true
        }
    },
    computed: {
        arquivosInternos: {
            get() {
                return this.arquivos;
            },
            set(val) {
                this.$emit('update:arquivos', val);
            }
        }
    },
    methods: {
        async processFiles(files) {
            this.isUploading = true;
            try {
                const selectedFiles = Array.from(files);
                if (!this.multiplo) {
                    this.arquivosInternos = [selectedFiles[0]];
                    this.previewUrls = [URL.createObjectURL(selectedFiles[0])];
                }
                else {
                    this.arquivosInternos = [...this.arquivosInternos, ...selectedFiles];
                    this.previewUrls = [...this.previewUrls, ...selectedFiles.map(f => URL.createObjectURL(f))];
                }
            }
            catch (error) {
                console.error('Erro ao processar imagens:', error);
            }
            finally {
                this.isUploading = false;
            }
        },
        onFilesSelected(event) {
            if (event.target.files)
                this.processFiles(event.target.files);
        },
        onDrop(event) {
            this.isDragging = false;
            if (event.dataTransfer?.files) {
                this.processFiles(event.dataTransfer.files);
            }
        },
        onDragOver() {
            this.isDragging = true;
        },
        onDragLeave() {
            this.isDragging = false;
        },
        removerImagem(index) {
            const novos = [...this.arquivosInternos];
            novos.splice(index, 1);
            this.arquivosInternos = novos;
            this.previewUrls.splice(index, 1);
        }
    }
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn-menu-color']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onDragover: (__VLS_ctx.onDragOver) },
    ...{ onDragleave: (__VLS_ctx.onDragLeave) },
    ...{ onDrop: (__VLS_ctx.onDrop) },
    ...{ class: "drop-area mb-3" },
    ...{ class: ({ 'drop-hover': __VLS_ctx.isDragging }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "btn btn-primary mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.onFilesSelected) },
    type: "file",
    multiple: (__VLS_ctx.multiplo),
    accept: "image/*",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-muted mb-0" },
});
(__VLS_ctx.multiplo ? 'as imagens' : 'uma imagem');
if (__VLS_ctx.isUploading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3 text-primary d-flex align-items-center gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "spinner-border spinner-border-sm" },
        role: "status",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex flex-wrap gap-3" },
});
for (const [url, index] of __VLS_getVForSourceType((__VLS_ctx.previewUrls))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "position-relative" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (url),
        ...{ class: "img-thumbnail" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.removerImagem(index);
            } },
        type: "button",
        ...{ class: "btn btn-sm btn-menu-color text-white position-absolute top-0 end-0 m-1" },
        title: "Remover imagem",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "bi bi-trash text-danger" },
    });
}
/** @type {__VLS_StyleScopedClasses['drop-area']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner-border']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner-border-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['position-relative']} */ ;
/** @type {__VLS_StyleScopedClasses['img-thumbnail']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-menu-color']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['position-absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['end-0']} */ ;
/** @type {__VLS_StyleScopedClasses['m-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-trash']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
var __VLS_dollars;
let __VLS_self;
