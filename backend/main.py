from flask import Flask
from config import Config
from flask_cors import CORS
from extensions import db, ma
from flask_jwt_extended import JWTManager
from datetime import timedelta
import debugpy


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


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

        db.create_all()

        # Seeding de TipoUsuario
        if not TipoUsuario.query.get(1):
            db.session.add(TipoUsuario(id=1, descricao="Desenvolvedor"))
        if not TipoUsuario.query.get(2):
            db.session.add(TipoUsuario(id=2, descricao="Jogador"))

        db.session.commit()

        from controllers.usuarioController import bp as usuario_bp
        app.register_blueprint(usuario_bp)

        from controllers.jogoController import bp as jogo_bp
        app.register_blueprint(jogo_bp)


    return app


if __name__ == "__main__":
    app = create_app()
    debugpy.listen(("0.0.0.0", 5678))
    print("🔍 Aguardando debugger se conectar...")
    debugpy.wait_for_client()
    debugpy.breakpoint()
    app.run(host="0.0.0.0", port=5000, debug=False)


