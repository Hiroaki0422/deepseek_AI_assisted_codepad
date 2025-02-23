from flask import Blueprint, request, jsonify
from app.model import query_model

api_blueprint = Blueprint("api", __name__)

@api_blueprint.route("/generate", methods=["POST"])
def generate_response():
    """API endpoint to get a model-generated response."""
    data = request.get_json()
    
    if not data or "query" not in data:
        return jsonify({"error": "Missing 'query' field"}), 400
    
    query = data["query"]
    model_response = query_model(query)

    return jsonify({"query": query, "response": model_response})
