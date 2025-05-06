# jogoRepository.py
from models.jogo.jogo import Jogo
from main import db

class JogoRepository:
    def criar(self, data):
        jogo = Jogo(
            nome=data.get('descricaoCurta', '')[:100],
            descricao=data.get('descricao'),
            descricaoCurta=data.get('descricaoCurta'),
            descricaoCompleta=data.get('descricaoCompleta')
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

    def obter_por_id(self, jogo_id):
        jogo = db.session.get(Jogo, jogo_id)
        if not jogo:
            raise LookupError("Jogo não encontrado")
        return jogo

    def listar_todos(self):
        return Jogo.query.all()