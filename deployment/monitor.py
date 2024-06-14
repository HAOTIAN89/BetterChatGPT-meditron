import argparse
from flask import Flask, request, jsonify
from functools import wraps
import subprocess

app = Flask(__name__)

# Predefined valid API key
API_KEY = "abc123"

# Decorator for API key authentication
def require_api_key(view_function):
    @wraps(view_function)
    def decorated_function(*args, **kwargs):
        if request.headers.get('Authorization') == f"Bearer {API_KEY}":
            return view_function(*args, **kwargs)
        else:
            return jsonify({"status": "failure", "message": "Invalid or missing API key"}), 401
    return decorated_function

# headers: {
#                'Content-Type': 'application/json',
#                'Authorization': `Bearer ${apiKey}` // Include the API key here
#          },

script_path = '/home/ubuntu/moove/model_depolyment.sh'

def restart():
    print("the server is restarting..")
    chmod_command = ['chmod', '+x', script_path]
    subprocess.run(chmod_command)
    run_script_command = ['./Automatic-Recovery/restart.sh']
    result = subprocess.run(run_script_command, capture_output=True, text=True)
    print("STDOUT:", result.stdout)
    print("STDERR:", result.stderr)
    print("the server finished restarting")
    
@app.post("/api/error")
@require_api_key  # Apply the API key check decorator
def handle_error():
    data = request.get_json()
    if data:
        print("Error: ", data)
        restart()
        return jsonify({"status": "success", "message": "the server has restarted"}), 200
    else:
        return jsonify({"status": "failure", "message": "no valid data"}), 400
    
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Monitor Server")
    parser.add_argument("--host", type=str, default="104.171.203.227", help="host name")
    parser.add_argument("--port", type=int, default=7000, help="port number")

    args = parser.parse_args()

    app.run(host=args.host, port=args.port)
    
    