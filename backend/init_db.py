import os
import sys

# Adiciona o diretório atual ao path do Python
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.utils.json_db import init_json_db

if __name__ == '__main__':
    init_json_db()
    print("Banco de dados inicializado com sucesso!")
    print("Arquivo criado: data/database.json")