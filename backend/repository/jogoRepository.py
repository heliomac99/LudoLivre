# jogoRepository.py
from models.jogo.jogo import Jogo
from main import db
from helpers.dataSource import DataSource
from math import ceil

class JogoRepository:
    def criar(self, data):
        jogo = Jogo(
            nome=data.get('descricaoCurta', '')[:100],
            descricao=data.get('descricao'),
            descricaoCurta=data.get('descricaoCurta'),
            descricaoCompleta=data.get('descricaoCompleta'),
            usuarioId=data.get('usuarioId')
        )
        db.session.add(jogo)
        return jogo

    def atualizar(self, jogo_id, data):
        jogo = db.session.get(Jogo, jogo_id)
        if not jogo:
            raise LookupError("Jogo não encontrado")
        jogo.descricao = data.get('descricao', jogo.descricao)
        jogo.descricaoCurta = data.get('descricaoCurta', jogo.descricaoCurta)
        jogo.descricaoCompleta = data.get('descricaoCompleta', jogo.descricaoCompleta)
        db.session.commit()
        return jogo

    def obterPorId(self, jogo_id):
        jogo = db.session.get(Jogo, jogo_id)
        if not jogo:
            raise LookupError("Jogo não encontrado")
        return jogo

    def listar(self):
        return Jogo.query.all()
    
    def paginado(self, ds: DataSource):
        paginated = Jogo.query.paginate(page=ds.currentPage, per_page=ds.pageSize, error_out=False)
        return DataSource(
            itens=paginated.items,
            total=paginated.total,
            currentPage=ds.currentPage,
            pageSize=ds.pageSize,
            pageCount=ceil(paginated.total / ds.pageSize) if ds.pageSize else 1
        )
    
    def paginadoPorUsuario(self, ds: DataSource, usuarioId: int):
        paginated = (
            Jogo.query
            .filter_by(usuarioId=usuarioId)
            .paginate(page=ds.currentPage, per_page=ds.pageSize, error_out=False)
        )

        return DataSource(
            itens=paginated.items,
            total=paginated.total,
            currentPage=ds.currentPage,
            pageSize=ds.pageSize,
            pageCount=ceil(paginated.total / ds.pageSize) if ds.pageSize else 1
        )