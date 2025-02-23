from flask import Flask
from app.routes import api_blueprint
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.register_blueprint(api_blueprint)  # Register API routes
    CORS(app)
    return app
