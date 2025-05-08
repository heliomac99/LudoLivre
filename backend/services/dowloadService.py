import os
import mimetypes
import base64
from flask import send_file

class DownloadService:

    def baixarImagemJogo(self, jogoId: int, nomeArquivo: str):
        """
        Retorna a imagem de um jogo (wallpaper ou imagem da galeria).
        """
        caminho = self._construir_caminho(jogoId, nomeArquivo)
        if not os.path.exists(caminho):
            raise FileNotFoundError("Arquivo não encontrado")

        mimetype, _ = mimetypes.guess_type(caminho)
        return send_file(
            caminho,
            as_attachment=False,
            download_name=nomeArquivo,
            mimetype=mimetype or "application/octet-stream"
        )

    def baixarImagemBase64(self, jogoId: int, nomeArquivo: str) -> str:
        """
        Retorna a imagem codificada em base64 com prefixo data URI.
        """
        caminho = self._construir_caminho(jogoId, nomeArquivo)
        if not os.path.exists(caminho):
            raise FileNotFoundError("Arquivo não encontrado")

        with open(caminho, "rb") as f:
            encoded = base64.b64encode(f.read()).decode("utf-8")
            mime = mimetypes.guess_type(caminho)[0] or "application/octet-stream"
            return f"data:{mime};base64,{encoded}"

    def _construir_caminho(self, jogoId: int, nomeArquivo: str) -> str:
        return os.path.join("arquivos", "jogo", str(jogoId), nomeArquivo)
