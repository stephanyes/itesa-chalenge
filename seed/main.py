import random
from uuid import uuid4
import hashlib
import base58
import requests


from flask import Flask, make_response, request, jsonify
from google.cloud import firestore

app = Flask(__name__)
db = firestore.Client()
users = db.collection('users')
transactions = db.collection('transactions')

# def generate_address(public_key):
#     """
#     Generate an address from the public key.
#     """
#     # Hash the public key using SHA-256
#     hashed_public_key = hashlib.sha256(public_key.encode()).digest()
    
#     # Apply RIPEMD-160 hash function to the hashed public key
#     ripemd160_hash = hashlib.new('ripemd160')
#     ripemd160_hash.update(hashed_public_key)
#     hashed_public_key_ripe = ripemd160_hash.digest()
    
#     # Encode the hashed public key using Base58Check encoding
#     address = base58.b58encode(hashed_public_key_ripe)
    
#     return address.decode('utf-8')

# def generate_transaction_data():
#     sender = generate_address(uuid4().hex)
#     recipient = generate_address(uuid4().hex)
#     signature = uuid4().hex  # For demonstration purposes
#     amount = round(random.uniform(2000, 10000), 2)  # Random amount between 2000 and 10000
#     txID = uuid4().hex
#     status = random.choice(['PENDING', 'DONE', 'CANCELLED'])  # Randomly choose status
#     return {'sender': sender, 'status': status, 'recipient': recipient, 'signature': signature, 'amount': amount, 'txID': txID}

# def generate_transaction_data_from_blockchain(sender, recipient, amount, txID, signature):
#     """
#     Generate transaction data with provided sender and recipient.

#     :param sender: Sender's address
#     :param recipient: Recipient's address
#     :return: Dictionary representing transaction data
#     """
#     status = random.choice(['PENDING', 'DONE', 'CANCELLED'])  # Randomly choose status
#     return {'sender': sender, 'status': status, 'recipient': recipient, 'signature': signature, 'amount': amount, 'txID': txID}

# def generate_user_data():
#     email = f"user_{uuid4().hex[:8]}@example.com"
#     nickname = f"User_{uuid4().hex[:8]}"
#     # Generate a random public key (for demonstration purposes)
#     public_key = uuid4().hex
#     address = generate_address(public_key)
#     return {'email': email, 'nickname': nickname, 'address': address}

# Function to seed the "users" collection with random user data
# def seed_users_collection(num_users):
#     for _ in range(num_users):
#         user_data = generate_user_data()
#         db.collection('users').document(user_data['address']).set(user_data)

# Function to seed the "transactions" collection with random transaction data
# def seed_transactions_collection(num_transactions):
#     for _ in range(num_transactions):
#         transaction_data = generate_transaction_data()
#         db.collection('transactions').document(transaction_data['txID']).set(transaction_data)

def seed_transactions_collection(transactions):
    batch = db.batch()
    for transaction_data in transactions:
        txID = transaction_data.get('txID')
        if txID:
            transaction_ref = db.collection('transactions').document(txID)
            batch.set(transaction_ref, transaction_data)
    # Commit the batched writes
    batch.commit()

# Route to seed the "transactions" collection with random data
# @app.route('/seed-transactions', methods=['POST'])
# def seed_transactions():
#     num_transactions = request.json.get('num_transactions')  # Default to seeding 10 transactions
#     seed_transactions_collection(num_transactions)
#     return 'Transactions seeded successfully'

# Route to seed the "users" collection with random data
# @app.route('/seed-users', methods=['POST'])
# def seed_users():
#     num_users = request.json.get('num_users', 10)  # Default to seeding 10 users
#     seed_users_collection(num_users)
#     return 'Users seeded successfully'

@app.route('/seed-firebase', methods=['GET'])
def seed_firebase():
    try:
        response = requests.get('http://172.17.0.2:5000/chain')
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, dict) and 'chain' in data:
                blocks = data['chain']
                transactions_with_signatures = []
                for block in blocks:
                    transactions = block.get('transactions', [])
                    if transactions:
                        for transaction in transactions:
                            signature = transaction.get('signature')
                            if signature:
                                # Process transactions with signatures
                                sender = transaction.get('sender')
                                recipient = transaction.get('recipient')
                                amount = transaction.get('amount')
                                txID = transaction.get('txID')
                                transactions_with_signatures.append({
                                    'sender': sender,
                                    'recipient': recipient,
                                    'amount': amount,
                                    'txID': txID,
                                    'signature': signature,
                                    'status': random.choice(['PENDING', 'DONE', 'CANCELLED'])  # Randomly choose status
                                })
                seed_transactions_collection(transactions_with_signatures)
                return jsonify({'transactions': transactions_with_signatures}), 200
            else:
                return jsonify({'error': 'Invalid data format from chain endpoint'}), 500
        else:
            return jsonify({'error': 'Failed to fetch data from chain endpoint'}), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
