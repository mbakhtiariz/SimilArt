from flask import render_template
import pandas as pd
import os
import json

from . import main


@main.route('/', methods=['GET'])
def index():
	data_path = os.path.join(os.path.abspath(__file__), r'..\..\data')

	# Based on feature data, extract available ids
	feature_data = pd.read_csv(os.path.join(data_path, 'features.csv'))
	ids = feature_data['id'].to_list()

	# From metadata, extract data with available ids
	data = pd.read_csv(os.path.join(data_path, 'metadatas.csv'))
	data = data.set_index('omni_id')
	data = data.loc[ids].to_json(orient='index')

	ids = json.dumps(ids)

	return render_template("base.html", data=data, available_ids=ids)


@main.route('/test', methods=['GET'])
def test():
	data_path = os.path.join(os.path.abspath(__file__), r'..\..\data')

	# Based on feature data, extract available ids
	feature_data = pd.read_csv(os.path.join(data_path, 'features.csv'))
	ids = feature_data['id'].to_list()

	# From metadata, extract data with available ids
	data = pd.read_csv(os.path.join(data_path, 'metadatas.csv'))
	data = data.set_index('omni_id')
	data = data.loc[ids].to_json(orient='index')

	ids = json.dumps(ids)

	return render_template("test.html", data=data, available_ids=ids)
