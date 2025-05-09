import os
from main import db
from models.jogo.jogoImagem import JogoImagem
from models.jogo.jogo import Jogo
from werkzeug.datastructures import FileStorage
from flask import send_file

class UploadService:

    def excluirImagens(self, jogoId: int):
        pasta = os.path.join("arquivos", "jogo", str(jogoId))
        imagens_antigas = JogoImagem.query.filter_by(jogoId=jogoId).all()
        for imagem in imagens_antigas:
            caminho = os.path.join(pasta, imagem.nomeArquivo)
            if os.path.exists(caminho):
                os.remove(caminho)
            db.session.delete(imagem)

    def excluirWallpaper(self, jogoId: int):
        pasta = os.path.join("arquivos", "jogo", str(jogoId))
        jogo = db.session.get(Jogo, jogoId)
        if not jogo:
            raise ValueError("Jogo não encontrado")

        if jogo.nomeArquivoWallpaper:
            caminho = os.path.join(pasta, jogo.nomeArquivoWallpaper)
            if os.path.exists(caminho):
                os.remove(caminho)
            jogo.nomeArquivoWallpaper = None

    def salvarImagensJogo(self, jogoId: int, arquivos: list[FileStorage]):
        pasta = os.path.join("arquivos", "jogo", str(jogoId))
        os.makedirs(pasta, exist_ok=True)

        extensoes_aceitas = {
            "image/png": ".png",
            "image/jpeg": ".jpg",
            "image/jpg": ".jpg"
        }

        rejeitados = []

        for arquivo in arquivos:
            content_type = arquivo.content_type
            extensao = extensoes_aceitas.get(content_type)
            if not extensao or not extensao.strip():
                rejeitados.append(arquivo.filename)
                continue

            imagem = JogoImagem(
                jogoId=jogoId,
                nomeArquivo=""
            )
            db.session.add(imagem)
            db.session.flush()  # obtém ID antes do commit

            nome_final = f"file{imagem.id}{extensao}"
            caminho = os.path.join(pasta, nome_final)
            arquivo.save(caminho)

            imagem.nomeArquivo = nome_final

        if rejeitados:
            raise ValueError(f"Extensões não suportadas: {', '.join(rejeitados)}")

    def salvarWallpaper(self, jogoId: int, arquivo: FileStorage):
        if not arquivo or arquivo.filename == "":
            raise ValueError("Wallpaper inválido")

        extensoesAceitas = {
            "image/png": ".png",
            "image/jpeg": ".jpg",
            "image/jpg": ".jpg"
        }

        extensao = extensoesAceitas.get(arquivo.content_type)
        if not extensao:
            raise ValueError("Extensão de wallpaper não suportada")

        pasta = os.path.join("arquivos", "jogo", str(jogoId))
        os.makedirs(pasta, exist_ok=True)

        jogo = db.session.get(Jogo, jogoId)
        if not jogo:
            raise ValueError("Jogo não encontrado")

        nome_arquivo = f"wallpaper{extensao}"
        caminho_novo = os.path.join(pasta, nome_arquivo)
        arquivo.save(caminho_novo)

        jogo.nomeArquivoWallpaper = nome_arquivo
