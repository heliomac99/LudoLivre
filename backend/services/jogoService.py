# jogoService.py
from repository.jogoRepository import JogoRepository
from services.uploadService import UploadService
from main import db
from helpers.dataSource import DataSource

class JogoService:
    def __init__(self):
        self.repo = JogoRepository()
        self.upload_service = UploadService()

    def cadastrar(self, data, arquivos, wallpaper):
        with db.session.begin():
            jogo = self.repo.criar(data)
            db.session.flush()
            self.upload_service.salvarImagensJogo(jogo.id, arquivos)
            self.upload_service.salvarWallpaper(jogo.id, wallpaper)
        return jogo


    def atualizar(self, jogo_id, data):
        return self.repo.atualizar(jogo_id, data)

    def obterPorId(self, jogo_id):
        return self.repo.obterPorId(jogo_id)

    def listarTodos(self):
        return self.repo.listar()
    
    def paginado(self, ds: DataSource):
        return self.repo.paginado(ds)