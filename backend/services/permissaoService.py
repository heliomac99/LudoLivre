from models.permissao.itemPermissao import ItemPermissao
from models.permissao.tipoUsuarioItemPermissao import TipoUsuarioItemPermissao
from models.usuario.usuarioTipoUsuario import UsuarioTipoUsuario
from main import db

class PermissaoComSelecao:
    def __init__(self, itemPermissao, selecionado: bool):
        self.itemPermissao = itemPermissao
        self.selecionado = selecionado

class PermissaoService:
    def carregarComIndicadorSelecao(self, tipoUsuarioId: int) -> list[PermissaoComSelecao]:
        # Busca todas as permissões disponíveis
        todas_permissoes = ItemPermissao.query.all()

        # Busca permissões já atribuídas ao tipo de usuário
        idsSelecionados = {
            tuip.itemPermissaoId
            for tuip in TipoUsuarioItemPermissao.query.filter_by(tipoUsuarioId=tipoUsuarioId).all()
        }

        # Monta a lista com indicador de seleção
        resultado = []
        for item in todas_permissoes:
            selecionado = item.id in idsSelecionados
            resultado.append(PermissaoComSelecao(item, selecionado))

        return resultado

    def salvar(self, tipoUsuarioId: int, permissoes: list) -> None:
        try:
            # Remove todas as permissões existentes do tipo de usuário
            TipoUsuarioItemPermissao.query.filter_by(tipoUsuarioId=tipoUsuarioId).delete()
            
            # Adiciona as novas permissões selecionadas
            for permissao_id in permissoes:
                nova_permissao = TipoUsuarioItemPermissao(
                    tipoUsuarioId=tipoUsuarioId,
                    itemPermissaoId=permissao_id
                )
                db.session.add(nova_permissao)
                
            # Commit das alterações
            db.session.commit()
        except Exception as e:
            # Em caso de erro, desfaz as alterações
            db.session.rollback()
            raise e
        
    def getPermissoesPorUsuario(self, usuarioId: int) -> list[int]:
        # Obtém os tipos de usuário associados ao usuário
        tipoUsuarioIds = [
            utu.tipoUsuarioId
            for utu in UsuarioTipoUsuario.query.filter_by(usuarioId=usuarioId).all()
        ]

        # Obtém todas as permissões associadas a esses tipos de usuário
        permissoes = TipoUsuarioItemPermissao.query.filter(
            TipoUsuarioItemPermissao.tipoUsuarioId.in_(tipoUsuarioIds)
        ).all()

        # Extrai os IDs únicos das permissões
        idsPermissoes = list({p.itemPermissaoId for p in permissoes})
        return idsPermissoes
