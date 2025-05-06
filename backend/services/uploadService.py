import os
from main import db
from models.jogo.jogoImagem import JogoImagem
from models.jogo.jogo import Jogo
from werkzeug.datastructures import FileStorage
from flask import send_file

class UploadService:

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

        extensoes_aceitas = {
            "image/png": ".png",
            "image/jpeg": ".jpg",
            "image/jpg": ".jpg"
        }

        extensao = extensoes_aceitas.get(arquivo.content_type)
        if not extensao:
            raise ValueError("Extensão de wallpaper não suportada")

        pasta = os.path.join("arquivos", "jogo", str(jogoId))
        os.makedirs(pasta, exist_ok=True)

        nome_arquivo = f"wallpaper{extensao}"
        caminho = os.path.join(pasta, nome_arquivo)
        arquivo.save(caminho)

        # Atualiza o campo no modelo Jogo
        jogo = db.session.get(Jogo, jogoId)
        if not jogo:
            raise ValueError("Jogo não encontrado")
        
        jogo.nomeArquivoWallpaper = nome_arquivo

    def baixarArquivo(self, jogoId: int, nome_arquivo: str):
        pasta = os.path.join("arquivos", "jogo", str(jogoId))
        caminho = os.path.join(pasta, nome_arquivo)

        if not os.path.exists(caminho):
            raise FileNotFoundError("Arquivo não encontrado")

        return send_file(
            caminho,
            as_attachment=False,  # ou True se quiser forçar download
            download_name=nome_arquivo,
            mimetype='application/octet-stream'  # ou detecte com mimetypes
        )