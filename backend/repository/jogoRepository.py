from models.jogo.jogo import Jogo
from main import db
from helpers.dataSource import DataSource
from math import ceil
from services.utilsService import FiltroService  
from models.jogo.tag import Tag
from models.jogo.jogoTag import JogoTag

class JogoRepository:
    def criar(self, data):
        jogo = Jogo(
            descricao=data.get('descricao'),
            descricaoCurta=data.get('descricaoCurta'),
            descricaoCompleta=data.get('descricaoCompleta'),
            usuarioId=data.get('usuarioId')
        )
        db.session.add(jogo)
        db.session.flush()
        return jogo

    def atualizar(self, jogo_id, data):
        jogo = db.session.get(Jogo, jogo_id)
        if not jogo:
            raise LookupError("Jogo não encontrado")
        jogo.descricao = data.get('descricao', jogo.descricao)
        jogo.descricaoCurta = data.get('descricaoCurta', jogo.descricaoCurta)
        jogo.descricaoCompleta = data.get('descricaoCompleta', jogo.descricaoCompleta)
        return jogo
    
    def salvarTags(self, jogoId: int, tags: list[str]):
        # Buscar tags existentes vinculadas ao jogo
        tags_atual = db.session.query(JogoTag).filter_by(jogoId=jogoId).all()
        tag_ids_novos = []
        
        # Obter ids das novas tags
        for tag_nome in tags:
            tag = db.session.query(Tag).filter_by(nome=tag_nome).first()
            if tag:
                tag_ids_novos.append(tag.id)
        
        # Remover vínculos que não estão na nova lista
        for jt in tags_atual:
            if jt.tagId not in tag_ids_novos:
                db.session.delete(jt)
        
        # Adicionar novos vínculos
        for tag_id in tag_ids_novos:
            existe = db.session.query(JogoTag).filter_by(jogoId=jogoId, tagId=tag_id).first()
            if not existe:
                db.session.add(JogoTag(jogoId=jogoId, tagId=tag_id))


    def obterPorId(self, jogo_id):
        jogo = db.session.get(Jogo, jogo_id)
        if not jogo:
            raise LookupError("Jogo não encontrado")
        return jogo

    def listar(self):
        return Jogo.query.all()
    
    def paginado(self, ds: DataSource):
        query = FiltroService.criarQueryPaginadoFiltros(Jogo, ds)
        paginated = query.paginate(page=ds.currentPage, per_page=ds.pageSize, error_out=False)
        return DataSource(
            itens=paginated.items,
            total=paginated.total,
            currentPage=ds.currentPage,
            pageSize=ds.pageSize,
            pageCount=ceil(paginated.total / ds.pageSize) if ds.pageSize else 1
        )

    def paginadoPorUsuario(self, ds: DataSource, usuarioId: int):
        query = FiltroService.criarQueryPaginadoFiltros(
            Jogo, ds,
            where=lambda q: q.filter(Jogo.usuarioId == usuarioId)
        )
        paginated = query.paginate(page=ds.currentPage, per_page=ds.pageSize, error_out=False)
        return DataSource(
            itens=paginated.items,
            total=paginated.total,
            currentPage=ds.currentPage,
            pageSize=ds.pageSize,
            pageCount=ceil(paginated.total / ds.pageSize) if ds.pageSize else 1
        )

