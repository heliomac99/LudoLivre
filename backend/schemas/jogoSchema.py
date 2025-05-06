# jogoSchema.py
from marshmallow import Schema, fields, validate
import base64
import os

class JogoCadastroSchema(Schema):
    descricao = fields.Str(required=True, validate=validate.Length(min=1))
    descricaoCurta = fields.Str(required=True, validate=validate.Length(min=1))
    descricaoCompleta = fields.Str(required=True, validate=validate.Length(min=1))
    wallpaper = fields.Raw(required=False)

class JogoRespostaSchema(Schema):
    id = fields.Int()
    descricao = fields.Str()
    descricaoCurta = fields.Str()
    descricaoCompleta = fields.Str()
    nomeArquivoWallpaper = fields.Str()
    wallpaperBase64 = fields.Method("getWallpaperBase64")
    imagensBase64 = fields.Method("getImagensBase64")

    def getWallpaperBase64(self, obj):
        if obj.nomeArquivoWallpaper:
            caminho = os.path.join("arquivos", "jogo", str(obj.id), obj.nomeArquivoWallpaper)
            if os.path.exists(caminho):
                with open(caminho, "rb") as f:
                    encoded = base64.b64encode(f.read()).decode('utf-8')
                    mime = "image/jpeg" if obj.nomeArquivoWallpaper.endswith(".jpg") else "image/png"
                    return f"data:{mime};base64,{encoded}"
        return None

    def getImagensBase64(self, obj):
        imagens = []
        for img in obj.imagens:  # relacionamento Jogo.imagens
            caminho = os.path.join("arquivos", "jogo", str(obj.id), img.nomeArquivo)
            if os.path.exists(caminho):
                with open(caminho, "rb") as f:
                    encoded = base64.b64encode(f.read()).decode('utf-8')
                    mime = "image/jpeg" if caminho.endswith(".jpg") else "image/png"
                    imagens.append(f"data:{mime};base64,{encoded}")
        return imagens