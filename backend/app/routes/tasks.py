from flask import Blueprint, request, jsonify
from app.utils.json_db import db

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/', methods=['GET'])
def get_tasks():
    try:
        tasks = db.get_collection('tasks')
        return jsonify(tasks)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        
        if not data or 'title' not in data:
            return jsonify({'error': 'Título é obrigatório'}), 400
        
        task_data = {
            'title': data['title'],
            'completed': data.get('completed', False),
            'description': data.get('description')
        }
        
        task = db.add_item('tasks', task_data)
        return jsonify(task), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500