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
            'description': data.get('description', ''),
            'priority': data.get('priority', 'medium'),
            'due_date': data.get('due_date')
        }
        
        task = db.add_item('tasks', task_data)
        return jsonify(task), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/<string:task_id>', methods=['GET'])
def get_task(task_id):
    try:
        task = db.get_item('tasks', task_id)
        if not task:
            return jsonify({'error': 'Tarefa não encontrada'}), 404
        return jsonify(task)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/<string:task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        data = request.get_json()
        task = db.get_item('tasks', task_id)
        
        if not task:
            return jsonify({'error': 'Tarefa não encontrada'}), 404
        
        # Remover campos que não devem ser atualizados diretamente
        data.pop('id', None)
        data.pop('created_at', None)
        
        updated_task = db.update_item('tasks', task_id, data)
        if not updated_task:
            return jsonify({'error': 'Erro ao atualizar tarefa'}), 500
            
        return jsonify(updated_task)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/<string:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        if not db.delete_item('tasks', task_id):
            return jsonify({'error': 'Tarefa não encontrada'}), 404
        return jsonify({'message': 'Tarefa deletada com sucesso'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500