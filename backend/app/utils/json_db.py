import json
import os
from typing import Dict, List, Any, Optional
from datetime import datetime
import uuid

class JSONDatabase:
    def __init__(self, file_path: str = "data/database.json"):
        self.file_path = file_path
        self._ensure_directory_exists()
        self._initialize_file()
    
    def _ensure_directory_exists(self):
        """Garante que o diretório existe"""
        directory = os.path.dirname(self.file_path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory)
    
    def _initialize_file(self):
        """Inicializa o arquivo JSON se não existir"""
        if not os.path.exists(self.file_path):
            initial_data = {
                "users": [],
                "tasks": [],
                "pomodoro_sessions": [],
                "metadata": {
                    "created_at": datetime.now().isoformat(),
                    "version": "1.0"
                }
            }
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump(initial_data, f, indent=2, ensure_ascii=False)
    
    def read_data(self) -> Dict:
        """Lê todos os dados do arquivo JSON"""
        try:
            with open(self.file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {"users": [], "tasks": [], "pomodoro_sessions": []}
    
    def write_data(self, data: Dict):
        """Escreve dados no arquivo JSON"""
        with open(self.file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    def get_collection(self, collection_name: str) -> List[Dict]:
        """Obtém uma coleção específica"""
        data = self.read_data()
        return data.get(collection_name, [])
    
    def get_all_collections(self) -> Dict:
        """Obtém todas as coleções"""
        return self.read_data()
    
    def save_collection(self, collection_name: str, collection: List[Dict]):
        """Salva uma coleção específica"""
        data = self.read_data()
        data[collection_name] = collection
        self.write_data(data)
    
    def add_item(self, collection_name: str, item: Dict) -> Dict:
        """Adiciona um item a uma coleção"""
        collection = self.get_collection(collection_name)
        
        # Gerar ID único
        if 'id' not in item:
            item['id'] = str(uuid.uuid4())
        
        # Adicionar timestamps
        item['created_at'] = datetime.now().isoformat()
        item['updated_at'] = datetime.now().isoformat()
        
        collection.append(item)
        self.save_collection(collection_name, collection)
        return item
    
    def get_item(self, collection_name: str, item_id: str) -> Optional[Dict]:
        """Obtém um item específico por ID"""
        collection = self.get_collection(collection_name)
        for item in collection:
            if item.get('id') == item_id:
                return item
        return None
    
    def update_item(self, collection_name: str, item_id: str, updates: Dict) -> Optional[Dict]:
        """Atualiza um item específico"""
        collection = self.get_collection(collection_name)
        for i, item in enumerate(collection):
            if item.get('id') == item_id:
                # Preservar campos que não devem ser atualizados
                preserved_fields = ['id', 'created_at']
                for field in preserved_fields:
                    if field in item:
                        updates[field] = item[field]
                
                # Atualizar timestamp
                updates['updated_at'] = datetime.now().isoformat()
                
                collection[i] = {**item, **updates}
                self.save_collection(collection_name, collection)
                return collection[i]
        return None
    
    def delete_item(self, collection_name: str, item_id: str) -> bool:
        """Remove um item específico"""
        collection = self.get_collection(collection_name)
        initial_length = len(collection)
        new_collection = [item for item in collection if item.get('id') != item_id]
        
        if len(new_collection) != initial_length:
            self.save_collection(collection_name, new_collection)
            return True
        return False

# Instância global do banco de dados
db = JSONDatabase()

def init_json_db():
    """Inicializa o banco JSON"""
    db._initialize_file()
    print("Banco JSON inicializado em data/database.json")

# === HELPERS PARA USUÁRIO E TASKS ANINHADAS ===

def get_user_by_id(user_id: str) -> Optional[dict]:
    users = db.get_collection('users')
    return next((u for u in users if u.get('id') == user_id), None)

def save_user(user: dict) -> bool:
    users = db.get_collection('users')
    idx = next((i for i, u in enumerate(users) if u.get('id') == user.get('id')), None)
    if idx is None:
        return False
    users[idx] = user
    db.save_collection('users', users)
    return True

def ensure_user_containers(user: dict) -> dict:
    # Garante campos novos sem quebrar usuários antigos
    user.setdefault('tasks', [])
    user.setdefault('stats', {'horasDeFoco': 0, 'diasUsados': 0, 'diasProdutivos': 0})
    user.setdefault('pomodoro_sessions', [])
    return user

def list_user_tasks(user_id: str) -> list:
    user = get_user_by_id(user_id)
    if not user:
        return []
    user = ensure_user_containers(user)
    return user['tasks']

def add_user_task(user_id: str, task: dict) -> dict:
    user = get_user_by_id(user_id)
    if not user:
        raise ValueError("Usuário não encontrado")
    user = ensure_user_containers(user)
    user['tasks'].append(task)
    if not save_user(user):
        raise RuntimeError("Falha ao salvar usuário")
    return task

def update_user_task(user_id: str, task_id: str, updates: dict) -> Optional[dict]:
    user = get_user_by_id(user_id)
    if not user:
        return None
    user = ensure_user_containers(user)
    tasks = user['tasks']
    for i, t in enumerate(tasks):
        if t.get('id') == task_id:
            tasks[i] = {**t, **updates}
            if not save_user(user):
                return None
            return tasks[i]
    return None

def delete_user_task(user_id: str, task_id: str) -> bool:
    user = get_user_by_id(user_id)
    if not user:
        return False
    user = ensure_user_containers(user)
    before = len(user['tasks'])
    user['tasks'] = [t for t in user['tasks'] if t.get('id') != task_id]
    if len(user['tasks']) == before:
        return False
    return save_user(user)
