from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from services.permissaoService import PermissaoService

bp = Blueprint("permissoes", __name__, url_prefix="/permissao")
permissaoService = PermissaoService()

@bp.route("/carregarComSelecionadas/<int:tipoUsuarioId>", methods=["GET"])
@jwt_required()
def permissoesComSelecao(tipoUsuarioId):
    try:
        permissoes = permissaoService.carregarComIndicadorSelecao(tipoUsuarioId)
        return jsonify([
            {
                "id": p.itemPermissao.id,
                "descricao": p.itemPermissao.descricao,
                "selecionado": p.selecionado
            }
            for p in permissoes
        ])
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route("/salvar", methods=["POST"])
@jwt_required()
def salvar():
    try:
        dados = request.get_json()
        tipoUsuarioId = dados.get("tipoUsuarioId")
        permissoes = dados.get("permissoes")
        
        if not tipoUsuarioId or permissoes is None:
            return jsonify({"error": "Dados incompletos"}), 400
            
        permissaoService.salvar(tipoUsuarioId, permissoes)
        return jsonify({"message": "Permissões salvas com sucesso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@bp.route("/porUsuario", methods=["GET"])
def permissoesPorUsuario():
    try:
        usuarioId = request.headers.get("X-Usuario-Id")
        permissoes = permissaoService.getPermissoesPorUsuario(usuarioId)
        return jsonify(permissoes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
