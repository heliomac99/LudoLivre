export default class PermissaoComSelecao {
    id;
    descricao;
    selecionado;
    constructor(id, descricao, selecionado) {
        this.id = id;
        this.descricao = descricao;
        this.selecionado = selecionado;
    }
}
