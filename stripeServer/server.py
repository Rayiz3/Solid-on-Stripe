#! /usr/bin/env python3.6
"""
Python 3.6 or newer required.
"""
import json
import stripe

from flask import Flask, redirect, jsonify, request, send_from_directory
from flask_cors import CORS

stripe.api_key = "sk_test_51P6R0zG1Ea829cAu8IqrZlWChn6ABEt9BuuYpNwhbdFZQWrb1KhIXXXTJe0tr6gtBVQ8pw2qzCoNWw4VOctLVHkV00rMUCPnVn"

app = Flask(__name__, static_folder='public',
            static_url_path='', template_folder='public')

CORS(app)

SERVER_DOMAIN = 'http://localhost:4242'
CLIENT_DOMAIN = 'http://localhost:3000'

def calculate_order_amount(items): # items : { id: "..." } []
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client

    # USD is two-decimal: 10$ == 1000
    return 1000

# create payment : make one-time-pay intent
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

# create checkout session : make checkout session for subscription
@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
         # lookup_keys : Only return the price with these lookup_keys, if any exist.
         # You can specify up to 10 lookup_keys.
        prices = stripe.Price.list(
            lookup_keys=[request.form['lookup_key']],
            expand=['data.product']
        )
        pay_mode = request.form['pay_type']

        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': prices.data[0].id,
                    'quantity': 1,
                },
            ],
            mode=pay_mode,  # this is subscription
            success_url=CLIENT_DOMAIN + '/subscribeCode?success=true&mode='+pay_mode+'&session_id={CHECKOUT_SESSION_ID}', # when payment success
            cancel_url=CLIENT_DOMAIN + '/subscribeCode?canceled=true', # when user go back to previous page
        )
        return redirect(checkout_session.url, code=303)
    
    except Exception as e:
        print(e)
        return "Server error", 500

# create portal session : make portal session for user
@app.route('/create-portal-session', methods=['POST'])
def create_portal_session():
        # For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
        # Typically this is stored alongside the authenticated user in your database.
        checkout_session_id = request.form.get('session_id')
        checkout_session = stripe.checkout.Session.retrieve(checkout_session_id)

        portalSession = stripe.billing_portal.Session.create(
            customer=checkout_session.customer,
            return_url=CLIENT_DOMAIN,
        )
        return redirect(portalSession.url, code=303)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=4242)