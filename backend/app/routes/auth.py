# backend/app/routes/auth.py
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import datetime, jwt
from app.utils.json_db import db

from functools import wraps

def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token ausente'}), 401
        token = auth_header.split(' ', 1)[1]
        try:
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            request.user_id = payload.get('sub')
            if not request.user_id:
                return jsonify({'error': 'Token inválido'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expirado'}), 401
        except Exception:
            return jsonify({'error': 'Token inválido'}), 401
        return f(*args, **kwargs)
    return wrapper


auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

def _find_user_by_email(email: str):
    users = db.get_collection('users')
    return next((u for u in users if u.get('email') == email), None)

def _public_user(u: dict):
    if not u: return None
    return {
        'id': u.get('id'),
        'name': u.get('name'),
        'email': u.get('email'),
        'age': u.get('age'),
        'created_at': u.get('created_at'),
        'updated_at': u.get('updated_at'),
    }

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'error': 'Nome, email e senha são obrigatórios.'}), 400

    if _find_user_by_email(email):
        return jsonify({'error': 'Email já cadastrado.'}), 400

    user = {
        'name': name,
        'email': email,
        'age': data.get('age'),
        'password_hash': generate_password_hash(password)
    }
    created = db.add_item('users', user)
    created.pop('password_hash', None)
    return jsonify({'message': 'Usuário cadastrado com sucesso', 'user': _public_user(created)}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Email e senha são obrigatórios.'}), 400

    user = _find_user_by_email(email)
    if not user or not check_password_hash(user.get('password_hash', ''), password):
        return jsonify({'error': 'Credenciais inválidas.'}), 401

    payload = {
        'sub': user['id'],
        'email': user['email'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12),
        'iat': datetime.datetime.utcnow(),
    }
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token, 'user': _public_user(user)})
