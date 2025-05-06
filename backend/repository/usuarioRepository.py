### repository.py
from main import db
from models.usuario.usuario import Usuario
from models.usuario.tipoUsuario import TipoUsuario
from werkzeug.security import generate_password_hash
from models.usuario.usuarioTipoUsuario import UsuarioTipoUsuario


class UsuarioRepository:
    def create(self, data):
        data['password'] = generate_password_hash(data['password'])
        usuario = Usuario(**data)
        db.session.add(usuario)
        db.session.commit()
        return usuario

    def getByEmail(self, email):
        return Usuario.query.filter_by(email=email).first()
    
    def getById(self, usuarioId):
        usuario = Usuario.query.get(usuarioId)
        if not usuario:
            return None

        tipoIds = (
            db.session.query(UsuarioTipoUsuario.tipoUsuarioId)
            .filter_by(usuarioId=usuarioId)
            .all()
        )

        usuario.tipoUsuarioIds = [tid[0] for tid in tipoIds]
        return usuario

    
    def commit(self):
        db.session.commit()

    def listarTipoUsuarios(self):
        return TipoUsuario.query.all()
    
    def atualizarUsuarioTipos(self, usuarioId: int, tipoUsuarioids: list[int]):
        UsuarioTipoUsuario.query.filter_by(usuarioId=usuarioId).delete()

        for tipoUsuarioId in tipoUsuarioids:
            relacao = UsuarioTipoUsuario(
                usuarioId=usuarioId,
                tipoUsuarioId=tipoUsuarioId
            )
            db.session.add(relacao)

        db.session.commit()


