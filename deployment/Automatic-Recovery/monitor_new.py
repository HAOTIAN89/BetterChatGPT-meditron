import argparse
from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

def restart():
    print("the server is restarting..")

def verify_origin(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.origin != "https://moove.com":
            return jsonify({"status": "failure", "message": "invalid source"}), 403
        return f(*args, **kwargs)
    return decorated_function

@app.post("/api/error")
@verify_origin
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
    parser.add_argument("--host", type=str, default="localhost", help="host name")
    parser.add_argument("--port", type=int, default=8000, help="port number")

    args = parser.parse_args()

    app.run(host=args.host, port=args.port)