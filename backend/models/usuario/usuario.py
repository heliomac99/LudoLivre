from main import db
from sqlalchemy.orm import relationship

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    tiposUsuario = relationship(
        'TipoUsuario',
        secondary='usuarioTipoUsuario',
        backref='usuario'
    )

    jogos = relationship(
        'Jogo',
        backref='usuario',
        cascade='all, delete',
        passive_deletes=True
    )
