import os
import jwt
import psycopg2
import bcrypt
from flask import Flask, request, jsonify, session, redirect
from datetime import datetime, timedelta
from functools import wraps
from google_auth_oauthlib.flow import Flow

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
JWT_SECRET = "your_jwt_secret"
DB_CONFIG = {"dbname": "your_db", "user": "your_user", "password": "your_password", "host": "localhost"}


def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing!"}), 401
        try:
            decoded = jwt.decode(token.split()[1], JWT_SECRET, algorithms=["HS256"])
            request.user = decoded
        except Exception as e:
            return jsonify({"error": "Invalid Token!"}), 401
        return f(*args, **kwargs)
    return decorated


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    company_name, admin_name, email, password = data['company_name'], data['admin_name'], data['email'], data['password']
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO users (company_name, admin_name, email, password) VALUES (%s, %s, %s, %s)", (company_name, admin_name, email, hashed_password))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "User registered successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email, password = data['email'], data['password']
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, password FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    if not user or not bcrypt.checkpw(password.encode(), user[1].encode()):
        return jsonify({"error": "Invalid credentials"}), 401
    token = jwt.encode({"user_id": user[0], "exp": datetime.now(datetime.timezone.utc) + timedelta(hours=24)}, JWT_SECRET, algorithm="HS256")
    return jsonify({"token": token})


oauth_flow = Flow.from_client_secrets_file('client_secret.json', scopes=['email', 'profile'], redirect_uri='http://localhost:5000/callback_google')


@app.route('/login_google')
def google_login():
    auth_url, _ = oauth_flow.authorization_url()
    return redirect(auth_url)


@app.route('/callback_google')
def google_callback():
    oauth_flow.fetch_token(authorization_response=request.url)
    credentials = oauth_flow.credentials
    session['google_token'] = credentials.token
    return jsonify({"message": "Google login successful", "token": credentials.token})


if __name__ == '__main__':
    app.run(debug=True)
