# jogoService.py
from repository.jogoRepository import JogoRepository
from services.uploadService import UploadService
from main import db
from helpers.dataSource import DataSource
from models.jogo.jogo import Jogo
from helpers.dataSource import Filter, FilterOperator
from services.utilsService import FiltroService
from models.jogo.tag import Tag

class JogoService:
    def __init__(self):
        self.repo = JogoRepository()
        self.uploadService = UploadService()

    def cadastrar(self, data, arquivos, wallpaper, tags):
        with db.session.begin():
            jogo = self.repo.criar(data)
            db.session.flush()
            self.repo.salvarTags(jogo.id, tags)
            self.uploadService.salvarImagensJogo(jogo.id, arquivos)
            self.uploadService.salvarWallpaper(jogo.id, wallpaper)
        return jogo


    def atualizar(self, jogoId, data, arquivos, wallpaper, tags):
        with db.session.begin():
            # Atualiza os dados do jogo (sem commit interno)
            jogo = self.repo.atualizar(jogoId, data)
            db.session.flush()
            self.repo.salvarTags(jogo.id, tags)
            # Remove arquivos antigos
            self.uploadService.excluirImagens(jogoId)
            self.uploadService.excluirWallpaper(jogoId)

            # Salva novos arquivos
            self.uploadService.salvarImagensJogo(jogoId, arquivos)
            self.uploadService.salvarWallpaper(jogoId, wallpaper)

        return jogo
    
    def deletar(self, jogoId: int):
        jogo = db.session.get(Jogo, jogoId)
        if not jogo:
            raise LookupError("Jogo não encontrado")

        # Remove arquivos do disco antes de excluir do banco
        self.uploadService.excluirImagens(jogoId)
        self.uploadService.excluirWallpaper(jogoId)
        self.uploadService.excluirPastaJogo(jogoId)

        db.session.delete(jogo)
        db.session.commit()

    def listarTodasTags(self):
        tags = db.session.query(Tag.nome).all()
        return [t[0] for t in tags]

    def obterPorId(self, jogoId):
        return self.repo.obterPorId(jogoId)

    def listarTodos(self):
        return self.repo.listar()
    
    def paginado(self, ds: DataSource):
        paginated = self.repo.paginado(ds)
        return paginated
    
    def paginadoPorUsuario(self, usuarioId, ds: DataSource):
        paginated = self.repo.paginadoPorUsuario(ds, usuarioId)
        return paginated
        