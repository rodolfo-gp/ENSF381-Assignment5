from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

def load_products():
    with open('products.json', 'r') as f:
        return json.load(f)['products']
    
@app.route('/products', methods=['GET'])
@app.route('/products/<int:product_id>', methods=['GET'])
def get_products(product_id=None):
    products = load_products()
    if product_id is None:
        # Return all products wrapped in an object with a 'products' key
        return jsonify({"products": products})
    else:
        product = next((p for p in products if p['id'] == product_id), None)
        # If a specific product is requested,
        # wrap it in an object with a 'products' key
        # Note: You might want to change this
        # if you want to return a single product not wrapped in a list
        return jsonify(product) if product else ('', 404)


@app.route('/products/add', methods=['POST'])
def add_product():
    new_product = request.json
    products = load_products()
    new_product['id'] = len(products) + 1
    products.append(new_product)
    with open('products.json', 'w') as f:
        json.dump({"products": products}, f)
    return jsonify(new_product), 201

@app.route('/product-images/<path:filename>')
def get_image(filename):
    return send_from_directory('product-images', filename)

@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    new_product = request.json
    products = load_products()
    for product in products:
        if product['id'] == product_id:
            
            np_keys = list(new_product.keys())
            for key in np_keys:
                product[key] = new_product[key]
            
            with open('products.json', 'w') as f:
                json.dump({"products": products}, f)
            return "Updated", 200
    
    return "NotFound", 404


@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    products = load_products()
    for product in products:
        if product['id'] == product_id:
            products.remove(product)
    with open('products.json', 'w') as f:
        json.dump({"products": products}, f)
    return 'Deleted', 200       

users = []
products = [ 
    { 
        "id": 1, 
        "name": "Product 1", 
        "description": "Description for Product 1", 
        "price": 10.99, 
        "image": 'images/product1.png' 
    }, 
    { 
        "id": 2, 
        "name": "Product 2", 
        "description": "Description for Product 2", 
        "price": 20.99, 
        "image": 'images/product2.jpg' 
    }, 
    { 
        "id": 3, 
        "name": "Product 3", 
        "description": "Description for Product 3", 
        "price": 10.99, 
        "image": 'images/product3.jpg' 
    }, 
    { 
        "id": 4, 
        "name": "Product 4", 
        "description": "Description for Product 4", 
        "price": 10.99, 
        "image": 'images/product4.jpg' 
    }, 
    { 
        "id": 5, 
        "name": "Product 5", 
        "description": "Description for Product 5", 
        "price": 10.99, 
        "image": 'images/product5.jpg' 
    }, 
    { 
        "id": 6, 
        "name": "Product 6", 
        "description": "Description for Product 6", 
        "price": 10.99, 
        "image": 'images/product6.jpg' 
    }, 
    { 
        "id": 7, 
        "name": "Product 7", 
        "description": "Description for Product 7", 
        "price": 10.99, 
        "image": 'images/product7.jpg' 
    }, 
    { 
        "id": 8, 
        "name": "Product 8", 
        "description": "Description for Product 8", 
        "price": 10.99, 
        "image": 'images/product8.jpg' 
    }, 
    { 
        "id": 9, 
        "name": "Product 9", 
        "description": "Description for Product 9", 
        "price": 10.99, 
        "image": 'images/product9.jpg' 
    }, 
    { 
        "id": 10, 
        "name": "Product 10", 
        "description": "Description for Product 10", 
        "price": 10.99, 
        "image": 'images/product10.jpg' 
    } 
] 
if __name__ == "__main__":
    app.run(debug=True)