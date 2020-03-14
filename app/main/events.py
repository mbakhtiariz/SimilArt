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


def load_data():
    current_path = Path.cwd()
    data_path = current_path.parent / Path(r"Dataset")

    # Get the data
    my_data = pd.read_csv(data_path / Path(r"data/csv") / Path(r"subset.csv"))
    my_data = my_data.set_index('omni_id').fillna('').to_dict(orient='index')
    return my_data

data = load_data()

@socketio.on('connect')
def test_connect():
    print("Connection succesful")


@socketio.on('nearest_neighbors')
def nearest_neighbors(info):
    print("Emitting nearest neighbors query")
    id = info['id']
    n = info['n']
    start_time = info['start_time']
    end_time = info['end_time']
    category = info["category"]
    def is_valid(sample_year, sample_cat):
        return start_time <= sample_year <= end_time and (category == sample_cat or category == "all")

    for iter in range(5):
        dists, ids, cos_sims = features.nearest(int(id), n * (5 ** iter))
        filtered_ids = [id for id in ids if is_valid(data[id]["creation_year"], data[id]["general_type"])][:n]
        if len(filtered_ids) == n:
            filtered_dists = [dist for id, dist in zip(ids, dists) if is_valid(data[id]["creation_year"], data[id]["general_type"])][:n]
            filtered_cos_sims = [cos_sim for id, cos_sim in zip(ids, cos_sims) if is_valid(data[id]["creation_year"], data[id]["general_type"])][:n]
            break
    emit('nearest_neighbors_data', {'dists': filtered_dists, 'ids': filtered_ids, 'cos_sims': filtered_cos_sims, 'log': category})

@socketio.on('get_cosine_sim')
def get_cosine_sim(info):
    print("Getting cosine similarity")
    id = info['id']
    ind = info['ind']
    cos_sims = features.get_cos_sims(int(id), ind)
    emit('get_cosine_sim_data', {'cos_sims': cos_sims})

@socketio.on('create_meta_json')
def create_meta_json():
    print("Creating subset_meta.json file")
    # Get correct paths


    # Make and store json file
    with open(current_path / Path(r'app/static/subset_meta.json'), 'w') as outfile:
    	json.dump(data, outfile)
    print("Sending JSON_LOADED signal")
    emit('json_loaded')
