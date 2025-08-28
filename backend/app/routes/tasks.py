from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

from app.routes.auth import require_auth
from app.utils.json_db import list_user_tasks, add_user_task, update_user_task, delete_user_task

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/', methods=['GET'])
@require_auth
def get_tasks():
    try:
        tasks = list_user_tasks(request.user_id)
        return jsonify(tasks)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/', methods=['POST'])
@require_auth
def create_task():
    try:
        data = request.get_json(force=True) or {}
        title = (data.get('title') or '').strip()
        if not title:
            return jsonify({'error': 'Título é obrigatório'}), 400

        task = {
            "id": str(uuid.uuid4()),
            "title": title,
            "description": data.get('description', '').strip(),
            "priority": data.get('priority', ''),
            "completed": bool(data.get('completed', False)),
            "progress": int(data.get('progress', 0)),  # ← Converter para int
            "total": int(data.get('total', 0)),        # ← Converter para int
            "due_date": data.get('due_date', None),
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }
        add_user_task(request.user_id, task)
        return jsonify(task), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/<string:task_id>/', methods=['PUT', 'PATCH'])
@require_auth
def update_task(task_id):
    try:
        data = request.get_json(force=True) or {}
        
        # Garantir que progress e total sejam convertidos para inteiros
        if 'progress' in data:
            try:
                data['progress'] = int(data['progress'])
            except (ValueError, TypeError):
                data['progress'] = 0
                
        if 'total' in data:
            try:
                data['total'] = int(data['total'])
            except (ValueError, TypeError):
                data['total'] = 0
        
        data['updated_at'] = datetime.utcnow().isoformat()
        updated = update_user_task(request.user_id, task_id, data)
        if not updated:
            return jsonify({'error': 'Tarefa não encontrada'}), 404
        return jsonify(updated)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/<string:task_id>/', methods=['DELETE'])
@require_auth
def delete_task(task_id):
    try:
        if not delete_user_task(request.user_id, task_id):
            return jsonify({'error': 'Tarefa não encontrada'}), 404
        return jsonify({'message': 'Tarefa deletada com sucesso'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
