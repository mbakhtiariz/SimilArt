from sklearn.cluster import KMeans
from sklearn.manifold import TSNE

from bokeh.models import ColumnDataSource, LabelSet
from bokeh.plotting import figure, show
from bokeh.palettes import d3

import scipy.io as sio
import pickle



def emb_scatter(data, names, path, perplexity=30.0, N=20):
    """
    Uses t-SNE with given perplexity to reduce the dimension of the
    vectors in data to 2, plots these in a bokeh 2d scatter plot,
    and colors them with N colors using K-means clustering of the
    originial vectors. The colored dots are tagged with labels from
    the list names.

    :param data: numpy array of shape [num_vectors, embedding_dim]
    :param names: a list of words of length num_vectors in the same order as data
    :param perplexity: the perplexity for t-SNE
    :param N: the number of clusters to find by K-means
    """
    ## Try to find some clusters ##
    print("Finding clusters")
    kmeans = KMeans(n_clusters=N)
    kmeans_clusters = kmeans.fit(data)
    klabels = kmeans.labels_

    ## Get a tsne fit ##
    print("Fitting tsne")
    tsne = TSNE(n_components=2, perplexity=perplexity)
    emb_tsne = tsne.fit_transform(data)

    pickle.dump({'tsne_clusters': emb_tsne, 'kmeans_clusters': kmeans_clusters}, open("clusters.pkl", 'wb'))

    ## Plot the tsne of the embeddings with bokeh ##
    # source: https://github.com/oxford-cs-deepnlp-2017/practical-1
    p = figure(tools="pan,wheel_zoom,reset,save",
               toolbar_location="above",
               title="T-SNE for Omniart portrait images")

    # Set colormap as a list
    colormap = d3['Category20'][N]
    colors = [colormap[i] for i in klabels]

    source = ColumnDataSource(data=dict(x1=emb_tsne[:, 0],
                                        x2=emb_tsne[:, 1],
                                        names=names,
                                        colors=colors))


    p.scatter(x="x1", y="x2", size=8, source=source, color='colors')

    labels = LabelSet(x="x1", y="x2", text="names", y_offset=6,
                      text_font_size="8pt", text_color="#555555",
                      source=source, text_align='center')
    # p.add_layout(labels)
    show(p)


feat_mat = sio.loadmat("./features.mat")
features = feat_mat["feature"]
words = [i for i in range(len(features))]
path = feat_mat["path"]

#The performance of t-SNE is fairly robust under different settings of the perplexity.
#The most appropriate value depends on the density of your data.
#Loosely speaking, one could say that a larger / denser dataset requires a larger perplexity.
#Typical values for the perplexity range between 5 and 50.
# With perplexity 2, local variations dominate.
emb_scatter(features, words , path, perplexity=50, N=20)
