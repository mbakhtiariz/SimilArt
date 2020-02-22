from flask_socketio import emit, send
from .. import socketio
import os

from ..features import Features

features_path = os.path.join(os.path.abspath(__file__), r'..\..\data\features.csv')
features = Features(features_path)

@socketio.on('connect')
def test_connect():
    print("Connection succesful")

@socketio.on('nearest_neighbors')
def nearest_neighbors(info):
    print("Emitting nearest neighbors query")
    id = info['id']
    n = info['n']
    dists, ids = features.nearest(int(id), n)
    emit('nearest_neighbors_data', {'dists': dists, 'ids': ids})
