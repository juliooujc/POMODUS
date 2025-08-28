from flask import Blueprint, request, jsonify
from app.utils.json_db import db, ensure_user_containers  # <-- importa o helper

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['GET'])
def get_users():
    try:
        # Garante que todos venham com tasks/stats/pomodoro_sessions
        users_raw = db.get_collection('users')
        users = [ensure_user_containers(u) for u in users_raw]
        return jsonify(users)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        
        if not data or 'name' not in data or 'email' not in data:
            return jsonify({'error': 'Nome e email são obrigatórios'}), 400
        
        existing_users = db.get_collection('users')
        if any(user.get('email') == data['email'] for user in existing_users):
            return jsonify({'error': 'Email já cadastrado'}), 400
        
        # Mantém o comportamento atual (sem hash aqui), mas já cria os contêineres
        # Se preferir, podemos mover o cadastro para /api/auth/register para já salvar password_hash.
        user_data = {
            'name': data['name'],
            'email': data['email'],
            'age': data.get('age'),
            'password': data.get('password', ''),  # Em produção, usar hash!
            # Contêineres padrão (evita usuários "antigos" sem esses campos)
            'tasks': [],
            'stats': {'horasDeFoco': 0, 'diasUsados': 0, 'diasProdutivos': 0},
            'pomodoro_sessions': []
        }
        
        created_user = db.add_item('users', user_data)
        # Por garantia, normaliza a resposta
        created_user = ensure_user_containers(created_user)
        return jsonify(created_user), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<string:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = db.get_item('users', user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        # Normaliza o retorno do usuário
        return jsonify(ensure_user_containers(user))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        user = db.get_item('users', user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        # Verificar se email já existe (se for alterado)
        if 'email' in data and data['email'] != user['email']:
            existing_users = db.get_collection('users')
            if any(u.get('email') == data['email'] for u in existing_users if u.get('id') != user_id):
                return jsonify({'error': 'Email já está em uso'}), 400
        
        # Remover campos protegidos
        data.pop('id', None)
        data.pop('created_at', None)
        
        updated_user = db.update_item('users', user_id, data)
        if not updated_user:
            return jsonify({'error': 'Erro ao atualizar usuário'}), 500
        
        # Normaliza o retorno atualizado
        updated_user = ensure_user_containers(updated_user)
        return jsonify(updated_user)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        if not db.delete_item('users', user_id):
            return jsonify({'error': 'Usuário não encontrado'}), 404
        return jsonify({'message': 'Usuário deletado com sucesso'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500