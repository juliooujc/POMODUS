from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

# Inicializa extensões (ainda não vinculadas a uma app)
db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    """Função fábrica para criar a instância da aplicação Flask."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Inicializa extensões com a app
    db.init_app(app)
    migrate.init_app(app, db)

    # Registra Blueprints (faremos isso depois)
    from app.routes.main import bp as main_bp
    app.register_blueprint(main_bp)
    # from app.routes import tasks, auth  # Vamos descomentar quando criarmos estes
    # app.register_blueprint(tasks.bp)
    # app.register_blueprint(auth.bp)

    # Cria as tabelas no banco (para desenvolvimento)
    with app.app_context():
        db.create_all()

    return app