from flask import render_template
import pandas as pd
import os
import json

from . import main
from pathlib import Path

@main.route('/', methods=['GET'])
def index():
	current_path = Path.cwd()
	data_path = current_path.parent / Path(r"Dataset")

	# Based on feature data, extract available ids
	feature_data = pd.read_csv(data_path / Path(r"data") / Path(r"features.csv"))
	ids = feature_data['id'].to_list()

	# From metadata, extract data with available ids
	data = pd.read_csv(data_path / Path(r"data/csv") / Path(r"subset.csv"))
	data = data.set_index('omni_id')
	data = data.loc[ids].to_json(orient='index')

	ids = json.dumps(ids)
	return render_template("base.html", data=data, available_ids=ids)


@main.route('/test', methods=['GET'])
def test():
	current_path = Path.cwd()
	ids = os.listdir(current_path / Path(r"app/static/subset"))
	ids = json.dumps([id.split(".")[0] for id in ids[:10000]])
	return render_template("test.html", tmp_ids=ids)
