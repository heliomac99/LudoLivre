from extensions import db

class TipoUsuario(db.Model):
    __tablename__ = 'tipoUsuario'

    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(50), nullable=False)
