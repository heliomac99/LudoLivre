from extensions import db

class UsuarioTipoUsuario(db.Model):
    __tablename__ = 'usuarioTipoUsuario'

    usuarioId = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    tipoUsuarioId = db.Column(db.Integer, db.ForeignKey('tipoUsuario.id'), primary_key=True)
