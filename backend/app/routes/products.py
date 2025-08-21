from flask import Blueprint, request, jsonify
from app.utils.json_db import db

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_products():
    try:
        products = db.get_collection('products')
        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        
        if not data or 'name' not in data or 'price' not in data:
            return jsonify({'error': 'Nome e preço são obrigatórios'}), 400
        
        product_data = {
            'name': data['name'],
            'price': float(data['price']),
            'description': data.get('description')
        }
        
        product = db.add_item('products', product_data)
        return jsonify(product), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500