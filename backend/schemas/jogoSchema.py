from marshmallow import Schema, fields, validate
from services.dowloadService import DownloadService

downloadService = DownloadService()

class JogoCadastroSchema(Schema):
    descricao = fields.Str(required=True, validate=validate.Length(min=1))
    descricaoCurta = fields.Str(required=True, validate=validate.Length(min=1))
    descricaoCompleta = fields.Str(required=True, validate=validate.Length(min=1))
    wallpaper = fields.Raw(required=False)
    usuarioId = fields.Int(required=True)
    tags = fields.List(fields.Str(), required=False)

class JogoRespostaSchema(Schema):
    id = fields.Int()
    descricao = fields.Str()
    descricaoCurta = fields.Str()
    descricaoCompleta = fields.Str()
    nomeArquivoWallpaper = fields.Str()
    wallpaperBase64 = fields.Method("getWallpaperBase64")
    imagensBase64 = fields.Method("getImagensBase64")
    usuarioId = fields.Int()
    tags = fields.Method("getTags")

    def getTags(self, obj):
        return [tag.nome for tag in obj.tags]
    
    def getWallpaperBase64(self, obj):
        if obj.nomeArquivoWallpaper:
            try:
                return downloadService.baixarImagemBase64(obj.id, obj.nomeArquivoWallpaper)
            except FileNotFoundError:
                return None
        return None

    def getImagensBase64(self, obj):
        imagens_base64 = []
        for imagem in obj.imagens:
            try:
                b64 = downloadService.baixarImagemBase64(obj.id, imagem.nomeArquivo)
                if b64:
                    imagens_base64.append(b64)
            except FileNotFoundError:
                continue
        return imagens_base64
