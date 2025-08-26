from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Configurações básicas
    app.config['SECRET_KEY'] = 'dev-secret-key'
    app.config['DEBUG'] = True
    app.config['DATABASE_FILE'] = 'data/database.json'
    
    # Habilitar CORS
    CORS(app)
    
    # Inicializar o banco JSON
    from app.utils.json_db import init_json_db
    init_json_db()
    
    # Registrar blueprints
    from app.routes.users import users_bp
    from app.routes.main import bp as main_bp
    from app.routes.tasks import tasks_bp
    from app.routes.statistics import statistics_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(tasks_bp, url_prefix='/api/tasks')
    app.register_blueprint(statistics_bp, url_prefix='/api/statistics')
    
    return app