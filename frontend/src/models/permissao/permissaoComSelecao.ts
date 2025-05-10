export default class PermissaoComSelecao {
  id: number
  descricao: string
  selecionado: boolean

  constructor(id: number, descricao: string, selecionado: boolean) {
    this.id = id
    this.descricao = descricao
    this.selecionado = selecionado
  }
}
