from extensions import db

class TipoUsuarioItemPermissao(db.Model):
    __tablename__ = 'tipoUsuarioItemPermissao'

    tipoUsuarioId = db.Column(db.Integer, db.ForeignKey('tipoUsuario.id'), primary_key=True)
    itemPermissaoId = db.Column(db.Integer, db.ForeignKey('itemPermissao.id'), primary_key=True)

    tipoUsuario = db.relationship('TipoUsuario', back_populates='permissoes')
    itemPermissao = db.relationship('ItemPermissao')