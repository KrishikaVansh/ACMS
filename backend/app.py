import jwt, psycopg2, bcrypt, os, json
from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
from datetime import datetime, timedelta
from functools import wraps
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request
import google.auth.exceptions
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# Flask App
app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
JWT_SECRET = "jwtsecretkey"

# Enable HTTP for local testing (disable in production)
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

# Enable CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Load Database Config
with open("db_config.json") as config_file:
    DB_CONFIG = json.load(config_file)

# Connect to PostgreSQL
def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

# Ensure database table exists
def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            company_name TEXT,
            admin_name TEXT,
            email TEXT UNIQUE NOT NULL,
            passwd TEXT NOT NULL
        )
    """)
    conn.commit()
    cur.close()
    conn.close()

init_db()

# Middleware for JWT Authentication
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or "Bearer" not in token:
            return jsonify({"error": "Token is missing!"}), 401
        try:
            decoded = jwt.decode(token.split()[1], JWT_SECRET, algorithms=["HS256"])
            request.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid Token!"}), 401
        return f(*args, **kwargs)
    return decorated

# Handle CORS Preflight Requests
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    company_name, admin_name, email, password = data['company_name'], data['admin_name'], data['email'], data['password']
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO users (company_name, admin_name, email, passwd) VALUES (%s, %s, %s, %s)",
                    (company_name, admin_name, email, hashed_password))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "User registered successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email, password = data['email'], data['password']
    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, passwd FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if not user or not bcrypt.checkpw(password.encode(), user[1].encode()):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({"user_id": user[0], "exp": datetime.utcnow() + timedelta(hours=24)},
                       JWT_SECRET, algorithm="HS256")
    return jsonify({"token": token})

# Google OAuth Setup
scopes = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]
oauth_flow = Flow.from_client_secrets_file("client_secret.json", scopes=scopes, redirect_uri="http://localhost:5000/callback_google")

@app.route('/login_google')
def google_login():
    auth_url, _ = oauth_flow.authorization_url(prompt="consent")
    return redirect(auth_url)

@app.route('/callback_google')
def google_callback():
    try:
        oauth_flow.fetch_token(authorization_response=request.url)
        credentials = oauth_flow.credentials

        creds = Credentials(credentials.token)
        service = build("oauth2", "v2", credentials=creds)
        user_info = service.userinfo().get().execute()

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE email = %s", (user_info["email"],))
        user = cur.fetchone()

        if not user:
            cur.execute("INSERT INTO users (admin_name, email, passwd) VALUES (%s, %s, %s)",
                        (user_info["name"], user_info["email"], ""))
            conn.commit()
            cur.execute("SELECT id FROM users WHERE email = %s", (user_info["email"],))
            user = cur.fetchone()

        cur.close()
        conn.close()

        token = jwt.encode({"user_id": user[0], "exp": datetime.utcnow() + timedelta(hours=24)},
                           JWT_SECRET, algorithm="HS256")

        return redirect(f"http://localhost:3000/dashboard?token={token}")

    except google.auth.exceptions.RefreshError:
        return jsonify({"error": "Failed to refresh token"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Dashboard Route (Protected)
@app.route('/dashboard', methods=['GET'])
@token_required
def dashboard():
    user_id = request.user['user_id']

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT admin_name FROM users WHERE id = %s", (user_id,))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if user:
        return jsonify({"message": f"Welcome to Dashboard, {user[0]}!"})
    else:
        return jsonify({"error": "User not found"}), 404

# Run Flask App
if __name__ == '__main__':
    app.run(debug=True)
