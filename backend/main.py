from flask import Flask
from config import Config
from flask_cors import CORS
from extensions import db, ma
from flask_jwt_extended import JWTManager
from datetime import timedelta
import debugpy


def create_app():
    app = Flask(__name__)
    # CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = Config.SQLALCHEMY_TRACK_MODIFICATIONS
    app.config["JWT_SECRET_KEY"] = "e3f92d98216c489ea7f8bd324149fc6a1b3a7d29fce74d6f6a878ca1e2d2b34d"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)

    jwt = JWTManager(app)

    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        from models.usuario.usuario import Usuario
        from models.usuario.usuarioTipoUsuario import UsuarioTipoUsuario
        from models.usuario.tipoUsuario import TipoUsuario
        from models.jogo.jogo import Jogo
        from models.jogo.jogoImagem import JogoImagem
        from models.permissao.itemPermissao import ItemPermissao
        from models.permissao.tipoUsuarioItemPermissao import TipoUsuarioItemPermissao
        from models.jogo.tag import Tag
        from models.jogo.jogoTag import JogoTag

        db.create_all()

        # Seeding TipoUsuario
        if not TipoUsuario.query.get(1):
            db.session.add(TipoUsuario(id=1, descricao="Administrador"))
        if not TipoUsuario.query.get(2):
            db.session.add(TipoUsuario(id=2, descricao="Desenvolvedor"))
        if not TipoUsuario.query.get(3):
            db.session.add(TipoUsuario(id=3, descricao="Jogador"))

        # Seeding ItemPermissao
        permissoes = [
            (1, "Cadastro de jogo"),
            (2, "Preview de Jogo"),
            (3, "Permissões")
        ]

        for id_, desc in permissoes:
            if not ItemPermissao.query.get(id_):
                db.session.add(ItemPermissao(id=id_, descricao=desc))

        tags_padrao = [
            "Ação", "Aventura", "RPG", "Estratégia", "Simulação", 
            "Puzzle", "Esportes", "Casuais",
            "Experiência adaptável", "Jogável por todos", 
            "Opções de acessibilidade", "Acessibilidade visual", 
            "Acessibilidade auditiva", "Acessibilidade motora"
        ]

        for nome_tag in tags_padrao:
            if not Tag.query.filter_by(nome=nome_tag).first():
                db.session.add(Tag(nome=nome_tag))
                
        db.session.commit() 

        # Seeding TipoUsuarioItemPermissao para Administrador (id=1)
        admin = TipoUsuario.query.get(1)
        todas_permissoes = ItemPermissao.query.all()
        for p in todas_permissoes:
            existe = TipoUsuarioItemPermissao.query.filter_by(
                tipoUsuarioId=admin.id,
                itemPermissaoId=p.id
            ).first()
            if not existe:
                db.session.add(TipoUsuarioItemPermissao(
                    tipoUsuarioId=admin.id,
                    itemPermissaoId=p.id
                ))

        db.session.commit()

        # Blueprints
        from controllers.usuarioController import bp as usuarioBp
        app.register_blueprint(usuarioBp)

        from controllers.jogoController import bp as jogoBp
        app.register_blueprint(jogoBp)

        from controllers.permissaoController import bp as permissaoBp
        app.register_blueprint(permissaoBp)

    return app


if __name__ == "__main__":
    app = create_app()
    debugpy.listen(("0.0.0.0", 5678))
    print("🔍 Aguardando debugger se conectar...")
    debugpy.wait_for_client()
    debugpy.breakpoint()
    app.run(host="0.0.0.0", port=5000, debug=False)
