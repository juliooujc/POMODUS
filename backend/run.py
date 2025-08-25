import os
import sys
from app import create_app
from app.utils.json_db import init_json_db

# Adicionar o diretório app ao PATH
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

from app import create_app

app = create_app()

@app.route('/')
def home():
    return {
        'message': 'Flask API com banco JSON',
        'version': '1.0.0',
        'endpoints': {
            'users': '/api/users',
            'products': '/api/products',
            'tasks': '/api/tasks'
        }
    }

@app.route('/health')
def health():
    return {'status': 'healthy', 'database': 'json'}

if __name__ == '__main__':
    print("🚀 Servidor iniciado em http://127.0.0.1:5000")
    print("📁 Banco de dados: data/database.json")
    app.run(debug=True)