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

    for iter in range(4):
        query_size = min(n * (5 ** iter), 150000)
        print(f"!!!!!!!!!!!!!!!!! querying iter {iter} for {query_size} nearest neighbors")
        dists, ids, sim_scores = features.nearest(int(id), query_size)
        filtered_ids = [id for id in ids if is_valid(data[id]["creation_year"], data[id]["general_type"])][:n]
        print(f">>>>>>>>>>{len(filtered_ids)} samples where in the sought for range.")
        if len(filtered_ids) == n:
            break
    num_samples = min(n, len(filtered_ids))
    filtered_dists = [dist for id, dist in zip(ids, dists) if is_valid(data[id]["creation_year"], data[id]["general_type"])][:num_samples]
    filtered_sim_scores = [sim_score for id, sim_score in zip(ids, sim_scores) if is_valid(data[id]["creation_year"], data[id]["general_type"])][:num_samples]
    emit('nearest_neighbors_data', {'dists': filtered_dists, 'ids': filtered_ids, 'sim_scores': filtered_sim_scores})

@socketio.on('get_sim_scores')
def get_sim_scores(info):
    print("Getting similarity scores")
    id = info['id']
    ind = info['ind']
    sim_scores = features.get_sim_scores(int(id), ind)
    emit('get_sim_scores_data', {'sim_scores': sim_scores})

@socketio.on('create_meta_json')
def create_meta_json():
    print("Creating subset_meta.json file")
    # Get correct paths


    # Make and store json file
    with open(current_path / Path(r'app/static/subset_meta.json'), 'w') as outfile:
    	json.dump(data, outfile)
    print("Sending JSON_LOADED signal")
    emit('json_loaded')
