from werkzeug.security import check_password_hash
from models.usuario.usuario import Usuario
from repository.usuarioRepository import UsuarioRepository

class UsuarioService:
    def __init__(self):
        self.repository = UsuarioRepository()

    def login(self, email, password):
        usuario = self.repository.getByEmail(email)
        if usuario:
            if check_password_hash(usuario.password, password):
                return usuario
        return None

    def registrar(self, data):
        if self.repository.getByEmail(data["email"]):
            raise ValueError("Email já cadastrado")
        return self.repository.create(data)
    
    def obterPorId(self, usuarioId):
        usuario = self.repository.getById(usuarioId)
        if not usuario:
            raise LookupError("Usuário não encontrado")
        return usuario
    
    def atualizar(self, usuarioId, dados):
        usuario = self.repository.getById(usuarioId)
        if not usuario:
            raise LookupError("Usuário não encontrado")

        usuario.nome = dados["nome"]
        self.repository.atualizarUsuarioTipos(usuarioId, dados["tipoUsuarioIds"])
        self.repository.commit()
        return usuario
    
    def listarTipoUsuarios(self):
        return self.repository.listarTipoUsuarios()

