import pandas as pd
from sklearn.neighbors import NearestNeighbors

class Features(object):
    def __init__(self, filename=None):
        self.ids = None
        self.id2i = None # Maps id to feature index
        self.features = None
        self.neigh = None # Nearest neighbor sklearn object
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
        return list(dist[0]), [self.ids[i] for i in ind[0]]

if __name__ == '__main__':
    features = Features('data/features.csv')
    dist, ind = features.nearest(11042971)
    for d, i in zip(dist, ind):
        print(f'{i}\t{d}')
