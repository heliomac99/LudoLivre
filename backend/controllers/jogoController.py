from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from schemas.jogoSchema import JogoCadastroSchema, JogoRespostaSchema
from services.jogoService import JogoService
from helpers.dataSource import DataSource


bp = Blueprint("jogos", __name__, url_prefix="/jogo")

cadastroSchema = JogoCadastroSchema()
respostaSchema = JogoRespostaSchema()
service = JogoService()

@bp.route("", methods=["POST"])
@jwt_required()
def cadastrarJogo():
    usuarioId = request.headers.get("X-Usuario-Id")
    data = request.form.to_dict()
    data["usuarioId"] = usuarioId
    errors = cadastroSchema.validate(data)
    if errors:
        return jsonify(errors), 400

    arquivos = request.files.getlist("imagens")
    wallpaper = request.files.get("wallpaper")

    if not arquivos:
        return jsonify({"error": "Envie pelo menos uma imagem"}), 400

    if not wallpaper:
        return jsonify({"error": "Envie o wallpaper"}), 400

    try:
        jogo = service.cadastrar(data, arquivos, wallpaper)
        return jsonify(respostaSchema.dump(jogo)), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


@bp.route("/<int:jogoId>", methods=["PUT"])
@jwt_required()
def atualizarJogo(jogoId):
    usuarioId = request.headers.get("X-Usuario-Id")
    data = request.form.to_dict()
    data["usuarioId"] = usuarioId

    arquivos = request.files.getlist("imagens")
    wallpaper = request.files.get("wallpaper")

    try:
        jogo = service.atualizar(jogoId, data, arquivos, wallpaper)
        return jsonify({
            "msg": "Jogo atualizado com sucesso",
            "jogo": respostaSchema.dump(jogo)
        })
    except LookupError as e:
        return jsonify({"error": str(e)}), 404
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@bp.route("/<int:jogoId>", methods=["GET"])
@jwt_required()
def obterJogo(jogoId):
    try:
        jogo = service.obterPorId(jogoId)
        return jsonify(respostaSchema.dump(jogo))
    except LookupError as e:
        return jsonify({"error": str(e)}), 404
    
    
@bp.route("/<int:jogoId>", methods=["DELETE"])
@jwt_required()
def deletarJogo(jogoId):
    try:
        service.deletar(jogoId)
        return jsonify({"msg": "Jogo deletado com sucesso."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404
    

@bp.route("/paginado", methods=["POST"])
@jwt_required()
def paginado():
    data = request.get_json() or {}

    try:
        page = int(data.get("page", 1)) or 1
        pageSize = int(data.get("pageSize", 10)) or 10
        filters = data.get("filters", [])
    except ValueError:
        return jsonify({"error": "Parâmetros de paginação inválidos"}), 400

    ds = DataSource.vazio(page, pageSize, filters)
    
    jogoPages = service.paginado(ds)

    return jsonify(jogoPages.toDict(respostaSchema.dump))


@bp.route("/paginadoPorUsuario", methods=["POST"])
@jwt_required()
def paginadoPorUsuario():
    data = request.get_json() or {}

    try:
        page = int(data.get("page", 1)) or 1
        pageSize = int(data.get("pageSize", 10)) or 10
        usuarioId = int(data.get("usuarioId"))
        filters = data.get("filters", [])
    except (ValueError, TypeError):
        return jsonify({"error": "Parâmetros de paginação inválidos"}), 400

    ds = DataSource.vazio(page, pageSize, filters)
    
    jogoPages = service.paginadoPorUsuario(usuarioId, ds)

    return jsonify(jogoPages.toDict(respostaSchema.dump))


