import { defineComponent } from 'vue';
import jogoService from '@/services/jogoService';
import CarrosselImagens from '@/components/Carrossel.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import { FilterOperator } from '@/helpers/DataSource';
export default defineComponent({
    name: 'GameLibrary',
    components: { CarrosselImagens, LoadingSpinner },
    props: {
        usuarioId: {
            type: Number,
            required: false,
            default: null
        }
    },
    data() {
        return {
            mostrarFiltros: false,
            filtros: {
                descricaoCurta: '',
                descricao: '',
                descricaoCompleta: ''
            },
            screenLoading: false,
            dataSource: {
                itens: [],
                total: 0,
                currentPage: 1,
                pageCount: 0,
                pageSize: 3,
                filters: []
            },
            jogoSelecionado: null
        };
    },
    mounted() {
        this.buscarJogos();
    },
    methods: {
        aplicarFiltros() {
            this.dataSource.filters = [];
            if (this.filtros.descricaoCurta)
                this.dataSource.filters.push({ field: 'descricaoCurta', operator: FilterOperator.CONTAINS, value: this.filtros.descricaoCurta });
            if (this.filtros.descricao)
                this.dataSource.filters.push({ field: 'descricao', operator: FilterOperator.CONTAINS, value: this.filtros.descricao });
            if (this.filtros.descricaoCompleta)
                this.dataSource.filters.push({ field: 'descricaoCompleta', operator: FilterOperator.CONTAINS, value: this.filtros.descricaoCompleta });
            this.dataSource.currentPage = 1;
            this.buscarJogos();
        },
        async buscarJogos() {
            this.screenLoading = true;
            try {
                let response;
                if (this.usuarioId != null) {
                    response = await jogoService.paginadoPorUsuario(this.usuarioId, this.dataSource);
                }
                else {
                    response = await jogoService.paginado(this.dataSource);
                }
                this.dataSource = response;
            }
            catch (err) {
                console.error('Erro ao buscar jogos:', err);
            }
            finally {
                this.screenLoading = false;
            }
        },
        verMais(jogo) {
            this.jogoSelecionado = jogo;
        },
        fechar() {
            this.jogoSelecionado = null;
        },
        paginaAnterior() {
            if (this.dataSource.currentPage > 1) {
                this.dataSource.currentPage--;
                this.buscarJogos();
            }
        },
        paginaProxima() {
            if (this.dataSource.currentPage < this.dataSource.pageCount) {
                this.dataSource.currentPage++;
                this.buscarJogos();
            }
        },
        irParaPagina(n) {
            this.dataSource.currentPage = n;
            this.buscarJogos();
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = { CarrosselImagens, LoadingSpinner };
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['cardGame']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['page-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['page-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['page-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "slide-down",
}));
const __VLS_2 = __VLS_1({
    name: "slide-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
if (__VLS_ctx.mostrarFiltros) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "filtros-absoluto" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "container py-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "row g-3 align-items-end" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-md-5" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onKeyup: (__VLS_ctx.aplicarFiltros) },
        ...{ class: "form-control" },
    });
    (__VLS_ctx.filtros.descricaoCurta);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-md-5" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onKeyup: (__VLS_ctx.aplicarFiltros) },
        ...{ class: "form-control" },
    });
    (__VLS_ctx.filtros.descricao);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-12 text-end mt-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.mostrarFiltros))
                    return;
                __VLS_ctx.mostrarFiltros = false;
            } },
        ...{ class: "btn btn-outline-secondary" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.aplicarFiltros) },
        ...{ class: "btn btn-primary" },
    });
}
var __VLS_3;
if (__VLS_ctx.screenLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_4 = {}.LoadingSpinner;
    /** @type {[typeof __VLS_components.LoadingSpinner, typeof __VLS_components.LoadingSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
    const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "container py-4" },
        ...{ style: ({ marginTop: __VLS_ctx.mostrarFiltros ? '80px' : '0' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex justify-content-between align-items-center mt-3 mb-4 px-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    var __VLS_8 = {};
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (!__VLS_ctx.mostrarFiltros) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.screenLoading))
                        return;
                    if (!(!__VLS_ctx.mostrarFiltros))
                        return;
                    __VLS_ctx.mostrarFiltros = !__VLS_ctx.mostrarFiltros;
                } },
            ...{ class: "btn btn-outline-primary" },
            title: "filtros",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ class: "bi bi-search" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "row row-cols-1 row-cols-md-3 g-4" },
    });
    for (const [jogo] of __VLS_getVForSourceType((__VLS_ctx.dataSource.itens))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "col" },
            key: (jogo.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card cardGame h-100 shadow-sm" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (jogo.wallpaperBase64),
            ...{ class: "card-img-top" },
            alt: "Capa do jogo",
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-body" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({
            ...{ class: "card-title" },
        });
        (jogo.descricaoCurta);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "card-text text-muted" },
        });
        (jogo.descricao);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-footer border-0 bg-transparent" },
        });
        var __VLS_10 = {
            jogo: (jogo),
        };
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pagination mt-3" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.paginaAnterior) },
        ...{ class: "page-btn" },
        disabled: (__VLS_ctx.dataSource.currentPage === 1),
    });
    for (const [n] of __VLS_getVForSourceType((__VLS_ctx.dataSource.pageCount))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.screenLoading))
                        return;
                    __VLS_ctx.irParaPagina(n);
                } },
            key: (n),
            ...{ class: "page-btn" },
            ...{ class: ({ active: __VLS_ctx.dataSource.currentPage === n }) },
        });
        (n);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.paginaProxima) },
        ...{ class: "page-btn" },
        disabled: (__VLS_ctx.dataSource.currentPage === __VLS_ctx.dataSource.pageCount),
    });
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
        const __VLS_12 = {}.h8;
        /** @type {[typeof __VLS_components.H8, typeof __VLS_components.h8, typeof __VLS_components.H8, typeof __VLS_components.h8, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            ...{ class: "subtitulo" },
        }));
        const __VLS_14 = __VLS_13({
            ...{ class: "subtitulo" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_15.slots.default;
        (__VLS_ctx.jogoSelecionado.descricao);
        var __VLS_15;
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
        const __VLS_16 = {}.CarrosselImagens;
        /** @type {[typeof __VLS_components.CarrosselImagens, ]} */ ;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
            imagens: (__VLS_ctx.jogoSelecionado.imagensBase64),
        }));
        const __VLS_18 = __VLS_17({
            imagens: (__VLS_ctx.jogoSelecionado.imagensBase64),
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.fechar) },
            ...{ class: "btn btn-secondary mt-3 w-100" },
            ...{ style: {} },
        });
    }
}
/** @type {__VLS_StyleScopedClasses['filtros-absoluto']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['g-3']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-5']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-5']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-end']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['bi']} */ ;
/** @type {__VLS_StyleScopedClasses['bi-search']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['row-cols-md-3']} */ ;
/** @type {__VLS_StyleScopedClasses['g-4']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['cardGame']} */ ;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['card-img-top']} */ ;
/** @type {__VLS_StyleScopedClasses['card-body']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-text']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['card-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['pagination']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['page-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['page-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['page-btn']} */ ;
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
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_11 = __VLS_10;
var __VLS_dollars;
let __VLS_self;
