from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from schemas.usuarioSchema import UsuarioCadastroSchema, UsuarioLoginSchema, UsuarioRespostaSchema
from repository.usuarioRepository import UsuarioRepository
from services.usuarioService import UsuarioService

bp = Blueprint("usuarios", __name__, url_prefix="/usuario")

cadastroSchema = UsuarioCadastroSchema()
loginSchema = UsuarioLoginSchema()
respostaSchema = UsuarioRespostaSchema()
service = UsuarioService()

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    errors = loginSchema.validate(data)
    if errors:
        return jsonify(errors), 400

    usuario = service.login(data["email"], data["password"])
    if not usuario:
        return jsonify({"error": "Login inválido"}), 403

    access_token = create_access_token(identity=str(usuario.id))

    return jsonify({
        "usuario": respostaSchema.dump(usuario),
        "access_token": access_token
    }), 200

@bp.route("", methods=["POST"])
def cadastro():
    data = request.get_json()
    errors = cadastroSchema.validate(data)
    if errors:
        return jsonify(errors), 400

    try:
        usuario = service.registrar(data)
        return jsonify(respostaSchema.dump(usuario)), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@bp.route("", methods=["PUT"])
@jwt_required()
def atualizar():
    usuarioId = request.headers.get("X-Usuario-Id")
    if not usuarioId:
        return jsonify({"error": "ID do usuário não informado no header"}), 400
    try:
        usuarioId = int(usuarioId)
    except ValueError:
        return jsonify({"error": "ID inválido"}), 400

    data = request.get_json()
    try:
        usuario = service.atualizar(usuarioId, data)
        return jsonify({
            "msg": "Usuário atualizado com sucesso",
            "usuario": respostaSchema.dump(usuario)
        })
    except LookupError as e:
        return jsonify({"error": str(e)}), 404

@bp.route("", methods=["GET"])
@jwt_required()
def obterUsuario():
    usuarioId = request.headers.get("X-Usuario-Id")
    if not usuarioId:
        return jsonify({"error": "ID do usuário não informado no header"}), 400
    try:
        usuarioId = int(usuarioId)
    except ValueError:
        return jsonify({"error": "ID inválido"}), 400

    try:
        usuario = service.obterPorId(usuarioId)
        return jsonify(respostaSchema.dump(usuario))
    except LookupError as e:
        return jsonify({"error": str(e)}), 404

@bp.route("/tipos", methods=["GET"])
@jwt_required()
def listarTipoUsuarios():
    tipos = service.listarTipoUsuarios()
    return jsonify([{"valor": tipo.id, "texto": tipo.descricao} for tipo in tipos])
