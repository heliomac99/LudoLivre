# jogoService.py
from repository.jogoRepository import JogoRepository
from services.uploadService import UploadService
from main import db
from helpers.dataSource import DataSource

class JogoService:
    def __init__(self):
        self.repo = JogoRepository()
        self.uploadService = UploadService()

    def cadastrar(self, data, arquivos, wallpaper):
        with db.session.begin():
            jogo = self.repo.criar(data)
            db.session.flush()
            self.uploadService.salvarImagensJogo(jogo.id, arquivos)
            self.uploadService.salvarWallpaper(jogo.id, wallpaper)
        return jogo


    def atualizar(self, jogo_id, data, arquivos, wallpaper):
        with db.session.begin():
            # Atualiza os dados do jogo (sem commit interno)
            jogo = self.repo.atualizar(jogo_id, data)
            db.session.flush()

            # Remove arquivos antigos
            self.uploadService.excluirImagens(jogo_id)
            self.uploadService.excluirWallpaper(jogo_id)

            # Salva novos arquivos
            self.uploadService.salvarImagensJogo(jogo_id, arquivos)
            self.uploadService.salvarWallpaper(jogo_id, wallpaper)

        return jogo




    def obterPorId(self, jogoId):
        return self.repo.obterPorId(jogoId)

    def listarTodos(self):
        return self.repo.listar()
    
    def paginado(self, ds: DataSource):
        return self.repo.paginado(ds)
    
    def paginadoPorUsuario(self, ds: DataSource, usuarioId: int):
        return self.repo.paginadoPorUsuario(ds, usuarioId)