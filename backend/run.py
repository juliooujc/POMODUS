import os
import sys

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
    # Criar pasta data se não existir
    if not os.path.exists('data'):
        os.makedirs('data')
    
    app.run(debug=True, host='0.0.0.0', port=5000)