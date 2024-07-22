#! /usr/bin/env python3.6
"""
Python 3.6 or newer required.
"""
import json
import stripe

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

stripe.api_key = 'sk_test_51P6R0zG1Ea829cAu8IqrZlWChn6ABEt9BuuYpNwhbdFZQWrb1KhIXXXTJe0tr6gtBVQ8pw2qzCoNWw4VOctLVHkV00rMUCPnVn'

app = Flask(__name__, static_folder='public',
            static_url_path='', template_folder='public')

CORS(app)

csp_config = {
    'default-src': '\'self\' http://localhost:3000',
    'connect-src': [
        '\'self\'',
        'http://localhost:3000',
        'https://apay-us.integ.amazon.com'
    ]
}

def generateCspHeader():
    header = '; '.join([f"{key} {' '.join(value) if isinstance(value, list) else value}" for key, value in csp_config.items()])
    return header

def calculate_order_amount(items): # items : { id: "..." } []
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client

    # USD is two-decimal: 10$ == 1000
    return 1000

@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='USD',
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                'enabled': True,
            },
        )
        response =  jsonify( {'clientSecret': intent['client_secret']} )
        response.headers['Content-Security-Policy'] = "deafult-src 'self'; connect-src https://*;"
        return response
    
    except Exception as e:
        return jsonify(error=str(e)), 403

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=4242)