from main import db
from sqlalchemy.orm import relationship
from datetime import datetime

class Jogo(db.Model):
    __tablename__ = 'jogo'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=True)
    descricaoCurta = db.Column(db.String(255), nullable=True)
    descricaoCompleta = db.Column(db.Text, nullable=True)

    imagens = relationship(
        'JogoImagem',
        backref='jogo',
        cascade='all, delete-orphan'
    )
