from flask_socketio import emit, send
from .. import socketio

@socketio.on('connect')
def test_connect():
    print("Connection succesful")
