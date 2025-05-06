from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from schemas.jogoSchema import JogoCadastroSchema, JogoRespostaSchema
from services.jogoService import JogoService

bp = Blueprint("jogos", __name__, url_prefix="/jogo")

cadastroSchema = JogoCadastroSchema()
respostaSchema = JogoRespostaSchema()
service = JogoService()

@bp.route("", methods=["POST"])
@jwt_required()
def cadastrarJogo():
    data = request.form.to_dict()
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
    data = request.get_json()
    try:
        jogo = service.atualizar(jogoId, data)
        return jsonify({
            "msg": "Jogo atualizado com sucesso",
            "jogo": respostaSchema.dump(jogo)
        })
    except LookupError as e:
        return jsonify({"error": str(e)}), 404

@bp.route("/<int:jogoId>", methods=["GET"])
@jwt_required()
def obterJogo(jogoId):
    try:
        jogo = service.obterPorId(jogoId)
        return jsonify(respostaSchema.dump(jogo))
    except LookupError as e:
        return jsonify({"error": str(e)}), 404

@bp.route("", methods=["GET"])
@jwt_required()
def listarJogos():
    jogos = service.listarTodos()
    return jsonify([respostaSchema.dump(j) for j in jogos])
