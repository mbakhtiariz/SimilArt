from flask_socketio import emit, send
from .. import socketio
import os

from ..features import Features
from pathlib import Path

current_path = Path.cwd()
data_path = current_path.parent / Path(r"Dataset")

features_path = data_path / Path(r"data") / Path(r"features.csv") #os.path.join(os.path.abspath(__file__), r'..\..\data\features.csv')
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
