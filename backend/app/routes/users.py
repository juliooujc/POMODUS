from flask import Blueprint, request, jsonify
from app.utils.json_db import db

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['GET'])
def get_users():
    try:
        users = db.get_collection('users')
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
        
        user_data = {
            'name': data['name'],
            'email': data['email'],
            'age': data.get('age'),
            'password': data.get('password', '')  # Em produção, isso deve ser hash!
        }
        
        created_user = db.add_item('users', user_data)
        return jsonify(created_user), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/<string:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = db.get_item('users', user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        return jsonify(user)
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