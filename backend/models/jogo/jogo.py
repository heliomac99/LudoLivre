from main import db
from sqlalchemy.orm import relationship

class Jogo(db.Model):
    __tablename__ = 'jogo'

    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.Text, nullable=True)
    descricaoCurta = db.Column(db.String(255), nullable=True)
    descricaoCompleta = db.Column(db.Text, nullable=True)
    nomeArquivoWallpaper = db.Column(db.String(255), nullable=True)

    usuarioId = db.Column(db.Integer, db.ForeignKey('usuario.id', ondelete='CASCADE'), nullable=False)

    imagens = relationship(
        'JogoImagem',
        backref='jogo',
        cascade='all, delete-orphan'
    )
