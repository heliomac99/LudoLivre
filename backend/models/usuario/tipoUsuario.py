from extensions import db

class TipoUsuario(db.Model):
    __tablename__ = 'tipoUsuario'

    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(50), nullable=False)

    permissoes = db.relationship('TipoUsuarioItemPermissao', back_populates='tipoUsuario', cascade='all, delete-orphan')
