from marshmallow import Schema, fields, validate
import base64
import os
import concurrent.futures

class JogoCadastroSchema(Schema):
    descricao = fields.Str(required=True, validate=validate.Length(min=1))
    descricaoCurta = fields.Str(required=True, validate=validate.Length(min=1))
    descricaoCompleta = fields.Str(required=True, validate=validate.Length(min=1))
    wallpaper = fields.Raw(required=False)
    usuarioId = fields.Int(required=True)

class JogoRespostaSchema(Schema):
    id = fields.Int()
    descricao = fields.Str()
    descricaoCurta = fields.Str()
    descricaoCompleta = fields.Str()
    nomeArquivoWallpaper = fields.Str()
    wallpaperBase64 = fields.Method("getWallpaperBase64")
    imagensBase64 = fields.Method("getImagensBase64")
    usuarioId = fields.Int()

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
        def carregar_e_codificar(img):
            caminho = os.path.join("arquivos", "jogo", str(obj.id), img.nomeArquivo)
            if os.path.exists(caminho):
                with open(caminho, "rb") as f:
                    encoded = base64.b64encode(f.read()).decode("utf-8")
                    mime = "image/jpeg" if caminho.endswith(".jpg") else "image/png"
                    return f"data:{mime};base64,{encoded}"
            return None

        with concurrent.futures.ThreadPoolExecutor() as executor:
            resultados = list(executor.map(carregar_e_codificar, obj.imagens))

        # Filtra os None (caso o arquivo não exista)
        return [r for r in resultados if r]
