import { defineComponent } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import usuarioService from '../../services/usuarioService';
import { useUsuarioStore } from '../../stores/usuario';
import ButtonLoading from '../../components/ButtonLoading.vue';
const toast = useToast();
export default defineComponent({
    components: { Form, Field, ErrorMessage, ButtonLoading },
    data() {
        return {
            isCadastro: false,
            confirmPassword: '',
            isLoadingLogin: false,
            isLoadingCadastro: false,
            loginModel: {
                email: '',
                password: ''
            },
            registroModel: {
                nome: '',
                email: '',
                password: ''
            },
            loginSchema: yup.object({
                email: yup.string().email('Email inválido').required('Campo obrigatório'),
                password: yup.string().required('Campo obrigatório')
            }),
            registroSchema: yup.object({
                nome: yup.string().required('Campo obrigatório'),
                email: yup.string().email('Email inválido').required('Campo obrigatório'),
                password: yup.string().min(6).required('Campo obrigatório'),
                confirmPassword: yup.string()
                    .oneOf([yup.ref('password')], 'Senhas não conferem')
                    .required('Campo obrigatório')
            })
        };
    },
    methods: {
        toggleMode() {
            this.isCadastro = !this.isCadastro;
        },
        async handleLogin() {
            this.isLoadingLogin = true;
            try {
                const data = await usuarioService.login(this.loginModel);
                if (data) {
                    const usuarioStore = useUsuarioStore();
                    usuarioStore.setUsuario(data.usuario, data.access_token);
                    this.$router.push('/home');
                }
            }
            catch (error) {
                toast.error(error.response?.data?.error || 'Erro ao realizar login');
            }
            finally {
                this.isLoadingLogin = false;
            }
        },
        async handleRegister() {
            this.isLoadingCadastro = true;
            try {
                await usuarioService.registrar(this.registroModel);
                toast.success('Cadastro realizado com sucesso!');
                this.isCadastro = false;
            }
            catch (error) {
                toast.error(error.response?.data?.error || 'Erro ao realizar cadastro');
            }
            finally {
                this.isLoadingCadastro = false;
            }
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = { Form, Field, ErrorMessage, ButtonLoading };
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "min-vh-100 d-flex justify-content-center align-items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card shadow p-4" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "text-center mb-4" },
});
(__VLS_ctx.isCadastro ? 'Cadastro' : 'Login');
if (!__VLS_ctx.isCadastro) {
    const __VLS_0 = {}.Form;
    /** @type {[typeof __VLS_components.Form, typeof __VLS_components.Form, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onSubmit': {} },
        validationSchema: (__VLS_ctx.loginSchema),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onSubmit': {} },
        validationSchema: (__VLS_ctx.loginSchema),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onSubmit: (__VLS_ctx.handleLogin)
    };
    __VLS_3.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "email",
        ...{ class: "form-label" },
    });
    const __VLS_8 = {}.Field;
    /** @type {[typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        name: "email",
        modelValue: (__VLS_ctx.loginModel.email),
        type: "email",
        ...{ class: "form-control" },
    }));
    const __VLS_10 = __VLS_9({
        name: "email",
        modelValue: (__VLS_ctx.loginModel.email),
        type: "email",
        ...{ class: "form-control" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    const __VLS_12 = {}.ErrorMessage;
    /** @type {[typeof __VLS_components.ErrorMessage, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        name: "email",
        ...{ class: "text-danger small" },
    }));
    const __VLS_14 = __VLS_13({
        name: "email",
        ...{ class: "text-danger small" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "password",
        ...{ class: "form-label" },
    });
    const __VLS_16 = {}.Field;
    /** @type {[typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        name: "password",
        modelValue: (__VLS_ctx.loginModel.password),
        type: "password",
        ...{ class: "form-control" },
    }));
    const __VLS_18 = __VLS_17({
        name: "password",
        modelValue: (__VLS_ctx.loginModel.password),
        type: "password",
        ...{ class: "form-control" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    const __VLS_20 = {}.ErrorMessage;
    /** @type {[typeof __VLS_components.ErrorMessage, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        name: "password",
        ...{ class: "text-danger small" },
    }));
    const __VLS_22 = __VLS_21({
        name: "password",
        ...{ class: "text-danger small" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const __VLS_24 = {}.ButtonLoading;
    /** @type {[typeof __VLS_components.ButtonLoading, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        label: "Entrar",
        loading: (__VLS_ctx.isLoadingLogin),
        type: "submit",
        variant: "primary",
        ...{ class: "w-100 mb-3" },
    }));
    const __VLS_26 = __VLS_25({
        label: "Entrar",
        loading: (__VLS_ctx.isLoadingLogin),
        type: "submit",
        variant: "primary",
        ...{ class: "w-100 mb-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_3;
}
else {
    const __VLS_28 = {}.Form;
    /** @type {[typeof __VLS_components.Form, typeof __VLS_components.Form, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onSubmit': {} },
        validationSchema: (__VLS_ctx.registroSchema),
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onSubmit': {} },
        validationSchema: (__VLS_ctx.registroSchema),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = {
        onSubmit: (__VLS_ctx.handleRegister)
    };
    __VLS_31.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "nome",
        ...{ class: "form-label" },
    });
    const __VLS_36 = {}.Field;
    /** @type {[typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        name: "nome",
        modelValue: (__VLS_ctx.registroModel.nome),
        type: "text",
        ...{ class: "form-control" },
    }));
    const __VLS_38 = __VLS_37({
        name: "nome",
        modelValue: (__VLS_ctx.registroModel.nome),
        type: "text",
        ...{ class: "form-control" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    const __VLS_40 = {}.ErrorMessage;
    /** @type {[typeof __VLS_components.ErrorMessage, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        name: "nome",
        ...{ class: "text-danger small" },
    }));
    const __VLS_42 = __VLS_41({
        name: "nome",
        ...{ class: "text-danger small" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "email",
        ...{ class: "form-label" },
    });
    const __VLS_44 = {}.Field;
    /** @type {[typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        name: "email",
        modelValue: (__VLS_ctx.registroModel.email),
        type: "email",
        ...{ class: "form-control" },
    }));
    const __VLS_46 = __VLS_45({
        name: "email",
        modelValue: (__VLS_ctx.registroModel.email),
        type: "email",
        ...{ class: "form-control" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    const __VLS_48 = {}.ErrorMessage;
    /** @type {[typeof __VLS_components.ErrorMessage, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        name: "email",
        ...{ class: "text-danger small" },
    }));
    const __VLS_50 = __VLS_49({
        name: "email",
        ...{ class: "text-danger small" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "password",
        ...{ class: "form-label" },
    });
    const __VLS_52 = {}.Field;
    /** @type {[typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        name: "password",
        modelValue: (__VLS_ctx.registroModel.password),
        type: "password",
        ...{ class: "form-control" },
    }));
    const __VLS_54 = __VLS_53({
        name: "password",
        modelValue: (__VLS_ctx.registroModel.password),
        type: "password",
        ...{ class: "form-control" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    const __VLS_56 = {}.ErrorMessage;
    /** @type {[typeof __VLS_components.ErrorMessage, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        name: "password",
        ...{ class: "text-danger small" },
    }));
    const __VLS_58 = __VLS_57({
        name: "password",
        ...{ class: "text-danger small" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "confirmPassword",
        ...{ class: "form-label" },
    });
    const __VLS_60 = {}.Field;
    /** @type {[typeof __VLS_components.Field, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        name: "confirmPassword",
        modelValue: (__VLS_ctx.confirmPassword),
        type: "password",
        ...{ class: "form-control" },
    }));
    const __VLS_62 = __VLS_61({
        name: "confirmPassword",
        modelValue: (__VLS_ctx.confirmPassword),
        type: "password",
        ...{ class: "form-control" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    const __VLS_64 = {}.ErrorMessage;
    /** @type {[typeof __VLS_components.ErrorMessage, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        name: "confirmPassword",
        ...{ class: "text-danger small" },
    }));
    const __VLS_66 = __VLS_65({
        name: "confirmPassword",
        ...{ class: "text-danger small" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    const __VLS_68 = {}.ButtonLoading;
    /** @type {[typeof __VLS_components.ButtonLoading, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        label: "Cadastrar",
        loading: (__VLS_ctx.isLoadingCadastro),
        type: "submit",
        variant: "primary",
        ...{ class: "w-100 mb-3" },
    }));
    const __VLS_70 = __VLS_69({
        label: "Cadastrar",
        loading: (__VLS_ctx.isLoadingCadastro),
        type: "submit",
        variant: "primary",
        ...{ class: "w-100 mb-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    var __VLS_31;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.toggleMode) },
    ...{ class: "btn btn-link w-100" },
});
(__VLS_ctx.isCadastro ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastrar');
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
/** @type {__VLS_StyleScopedClasses['min-vh-100']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['small']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['small']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['small']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['small']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['small']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['text-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['small']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-link']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
var __VLS_dollars;
let __VLS_self;
