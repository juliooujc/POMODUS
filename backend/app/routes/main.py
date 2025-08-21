from flask import Blueprint, jsonify

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return jsonify({"message": "Hello, TimeFlow API! Ambiente configurado com sucesso!"})

@bp.route('/api/health')
def health_check():
    return jsonify({"status": "healthy"})