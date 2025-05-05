from main import db
from datetime import datetime

class JogoImagem(db.Model):
    __tablename__ = 'jogoImagem'

    id = db.Column(db.Integer, primary_key=True)
    jogoId = db.Column(db.Integer, db.ForeignKey('jogo.id'), nullable=False)
    nomeArquivo = db.Column(db.String(255), nullable=True)
    urlBlob = db.Column(db.Text, nullable=False)
    contentType = db.Column(db.String(100), nullable=True)
    criadoEm = db.Column(db.DateTime, default=datetime.utcnow)
