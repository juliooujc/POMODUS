import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    DATABASE_FILE = os.getenv('DATABASE_FILE', 'data/database.json')
    APP_NAME = "Flask JSON API"
    APP_VERSION = "1.0.0"
    
    # Remover configurações do SQLAlchemy
    # SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    # SQLALCHEMY_TRACK_MODIFICATIONS = False