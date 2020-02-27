from flask_socketio import emit, send
from .. import socketio
import os
import pandas as pd
import json

from ..features import Features
from pathlib import Path

current_path = Path.cwd()
data_path = current_path.parent / Path(r"Dataset")

features_path = data_path / Path(r"data") / Path(r"features.csv")
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

@socketio.on('create_meta_json')
def create_meta_json():
    print("Creating subset_meta.json file")
    # Get correct paths
    current_path = Path.cwd()
    data_path = current_path.parent / Path(r"Dataset")

    # Get the data
    data = pd.read_csv(data_path / Path(r"data/csv") / Path(r"subset.csv"))
    data = data.set_index('omni_id').fillna('').to_dict(orient='index')

    # Make and store json file
    with open(current_path / Path(r'app/static/subset_meta.json'), 'w') as outfile:
    	json.dump(data, outfile)
    print("Sending JSON_LOADED signal")
    emit('json_loaded')
