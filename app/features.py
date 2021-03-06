# run: python features.py --feature_path \path\the\directory\to\load\features
# Example:
# python features.py --feature_path C:\Users\mbakh\Desktop\Courses\InfoVis\omni-exploration-project\Dataset\data


import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity
import sklearn.metrics.pairwise as pairwise

import argparse
from pathlib import Path
import numpy as np


class Features(object):
    def __init__(self, filename=None):
        self.ids = None
        self.id2i = None  # Maps id to feature index
        self.features = None
        self.neigh = None  # Nearest neighbor sklearn object
        if filename:
            self.read_csv(filename)

    def read_csv(self, filename, n=50):
        features_df = pd.read_csv(filename)
        ids = features_df['id'].to_list()
        self.id2i = {id: i for i, id in enumerate(ids)}
        features = features_df.drop(['id'], axis=1).to_numpy()
        neigh = NearestNeighbors(n)
        neigh.fit(features)

        self.ids = ids
        self.features = features
        self.neigh = neigh

    def nearest(self, id, n=50):
        assert self.neigh is not None, "No features stored"
        img_idx = self.id2i[id]
        vec = self.features[img_idx].reshape(1, -1)
        dist, ind = self.neigh.kneighbors(vec, n_neighbors=n)
        ind_list = [self.ids[i] for i in ind[0]]
        sim_scores = self.get_sim_scores(id, ind_list)
        return list(dist[0]), ind_list, sim_scores

    def get_sim_scores(self, center_id, ind):
        center_img_idx = self.id2i[center_id]
        vec = self.features[center_img_idx].reshape(1, -1)
        sim_scores = []
        for i in range(len(ind)):
            img_idx = self.id2i[ind[i]]
            vec_i = self.features[img_idx].reshape(1, -1)
            # Get cosine distances
            cos_dist = pairwise.cosine_distances(vec, vec_i).item(0, 0)
            # Handcrafted similarity score
            sim_score = (1 - (4*cos_dist))
            # Account for values outside range
            if sim_score < 0:
                sim_score = 0
            if sim_score > 1:
                sim_score = 1
            sim_scores.append(sim_score)
        return sim_scores

def main(opt):
    feature_file_path = Path(opt.feature_path) / Path(r'features.csv')
    features = Features(feature_file_path)
    dist, ind = features.nearest(11042916)
    for d, i in zip(dist, ind):
        print(f'{i}\t{d}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process run-time args.')

    parser.add_argument('--feature_path', required=True,
                        help='path of the directory to load features')

    args = parser.parse_args()
    main(args)
