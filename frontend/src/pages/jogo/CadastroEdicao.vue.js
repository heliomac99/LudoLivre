import { defineComponent } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import UploadImagens from '@/components/UploadImagens.vue';
import ButtonLoading from '@/components/ButtonLoading.vue';
import jogoService from '@/services/jogoService';
import { useToast } from 'vue-toastification';
import { base64ToFile, base64ArrayToFiles } from '@/helpers/Utils';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import TagCard from '@/components/TagCard.vue';
const toast = useToast();
export default defineComponent({
    name: 'CadastroEdicao',
    components: {
        Form,
        Field,
        UploadImagens,
        ButtonLoading,
        LoadingSpinner,
        TagCard
    },
    async mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.screenLoading = true;
            const result = await jogoService.carregar(Number(id));
            this.model = result;
            this.model.imagens = base64ArrayToFiles(result.imagensBase64 || []),
                this.model.wallpaper = result.wallpaperBase64
                    ? [base64ToFile(result.wallpaperBase64, result.nomeArquivoWallpaper)]
                    : [];
            this.screenLoading = false;
        }
    },
    data() {
        return {
            model: {},
            screenLoading: false,
            isLoading: false,
            schema: yup.object({
                descricao: yup.string().required('A descrição é obrigatória'),
                descricaoCurta: yup.string().required('A descrição curta é obrigatória'),
                lore: yup.string().required('A lore é obrigatória')
            })
        };
    },
    methods: {
        async salvar() {
            this.isLoading = true;
            const id = this.$route.params.id;
            try {
                if (id) {
                    await jogoService.atualizar(Number(id), this.model);
                    toast.success('Jogo atualizado com sucesso.');
                }
                else {
                    await jogoService.cadastrar(this.model);
                    toast.success('Jogo salvo com sucesso.');
                }
                this.$router.back();
            }
            catch (error) {
                if (typeof error === 'object' && error !== null && 'response' in error) {
                    toast.error(error.response?.data?.error || 'Erro ao salvar');
                }
                else {
                    toast.error('Erro inesperado ao salvar');
                }
            }
            finally {
                this.isLoading = false;
            }
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = {
    Form,
    Field,
    UploadImagens,
    ButtonLoading,
    LoadingSpinner,
    TagCard
};
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
if (__VLS_ctx.screenLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_0 = {}.LoadingSpinner;
    /** @type {[typeof __VLS_components.LoadingSpinner, typeof __VLS_components.LoadingSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
else {
    const __VLS_4 = {}.Form;
    /** @type {[typeof __VLS_components.Form, typeof __VLS_components.Form, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onSubmit': {} },
        validationSchema: (__VLS_ctx.schema),
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onSubmit': {} },
        validationSchema: (__VLS_ctx.schema),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onSubmit: (__VLS_ctx.salvar)
    };
    __VLS_7.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "descricaoCurta",
        ...{ class: "form-label" },
    });
    const __VLS_12 = {}.Field;
    /** @type {[typeof __VLS_components.Field, typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        name: "descricaoCurta",
        modelValue: (__VLS_ctx.model.descricaoCurta),
    }));
    const __VLS_14 = __VLS_13({
        name: "descricaoCurta",
        modelValue: (__VLS_ctx.model.descricaoCurta),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    {
        const { default: __VLS_thisSlot } = __VLS_15.slots;
        const [{ field, errorMessage }] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            id: "descricaoCurta",
            type: "text",
            ...{ class: "form-control" },
            ...(field),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
            ...{ class: "text-danger" },
        });
        (errorMessage);
        __VLS_15.slots['' /* empty slot name completion */];
    }
    var __VLS_15;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "descricao",
        ...{ class: "form-label" },
    });
    const __VLS_16 = {}.Field;
    /** @type {[typeof __VLS_components.Field, typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        name: "descricao",
        modelValue: (__VLS_ctx.model.descricao),
    }));
    const __VLS_18 = __VLS_17({
        name: "descricao",
        modelValue: (__VLS_ctx.model.descricao),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    {
        const { default: __VLS_thisSlot } = __VLS_19.slots;
        const [{ field, errorMessage }] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            id: "descricao",
            type: "text",
            ...{ class: "form-control" },
            ...(field),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
            ...{ class: "text-danger" },
        });
        (errorMessage);
        __VLS_19.slots['' /* empty slot name completion */];
    }
    var __VLS_19;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "lore",
        ...{ class: "form-label" },
    });
    const __VLS_20 = {}.Field;
    /** @type {[typeof __VLS_components.Field, typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        name: "lore",
        modelValue: (__VLS_ctx.model.descricaoCompleta),
    }));
    const __VLS_22 = __VLS_21({
        name: "lore",
        modelValue: (__VLS_ctx.model.descricaoCompleta),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    {
        const { default: __VLS_thisSlot } = __VLS_23.slots;
        const [{ field, errorMessage }] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
            id: "lore",
            ...{ class: "form-control" },
            rows: "15",
            ...(field),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
            ...{ class: "text-danger" },
        });
        (errorMessage);
        __VLS_23.slots['' /* empty slot name completion */];
    }
    var __VLS_23;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    const __VLS_24 = {}.UploadImagens;
    /** @type {[typeof __VLS_components.UploadImagens, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        multiplo: (false),
        arquivos: (__VLS_ctx.model.wallpaper),
    }));
    const __VLS_26 = __VLS_25({
        multiplo: (false),
        arquivos: (__VLS_ctx.model.wallpaper),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    const __VLS_28 = {}.UploadImagens;
    /** @type {[typeof __VLS_components.UploadImagens, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        arquivos: (__VLS_ctx.model.imagens),
    }));
    const __VLS_30 = __VLS_29({
        arquivos: (__VLS_ctx.model.imagens),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    const __VLS_32 = {}.TagCard;
    /** @type {[typeof __VLS_components.TagCard, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        tags: (__VLS_ctx.model.tags),
    }));
    const __VLS_34 = __VLS_33({
        tags: (__VLS_ctx.model.tags),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    const __VLS_36 = {}.ButtonLoading;
    /** @type {[typeof __VLS_components.ButtonLoading, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...{ style: {} },
        label: "Salvar",
        loading: (__VLS_ctx.isLoading),
        type: "submit",
        variant: "primary",
        ...{ class: "w-100" },
    }));
    const __VLS_38 = __VLS_37({
        ...{ style: {} },
        label: "Salvar",
        loading: (__VLS_ctx.isLoading),
        type: "submit",
        variant: "primary",
        ...{ class: "w-100" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_7;
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
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
var __VLS_dollars;
let __VLS_self;
