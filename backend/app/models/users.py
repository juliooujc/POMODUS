from datetime import datetime
from typing import Optional

class User:
    def __init__(self, name: str, email: str, age: Optional[int] = None, id: Optional[str] = None):
        self.id = id
        self.name = name
        self.email = email
        self.age = age
        self.created_at = datetime.now().isoformat()
        self.updated_at = datetime.now().isoformat()
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'age': self.age,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            id=data.get('id'),
            name=data.get('name'),
            email=data.get('email'),
            age=data.get('age')
        )