from extensions import db

class ItemPermissao(db.Model):
    __tablename__ = 'itemPermissao'

    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(100), nullable=False)
