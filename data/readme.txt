In this directory you may find the codes for downloading and preprocessing the image-data

- download_loweres.py           If you intend to download the whole low-resolution dataset from the original url source.
                                running this file is not mandatory.


- extract_portraits.py          If you have not access to the portrait dataset running this file is mandatory.
                                Here you can directly download the portraits from original url source,
                                or if you have already access to the whole low-res dataset by running this file you can extract portraits from it.

- extract_feature.py            After downloading the portraits, you should extract features of images
                                to be saved in a file names features.mat

- cluster_image.py              After calculating the feature vector for all images in dataset,
                                you should cluster those images based on these features and save the clusters in clusters.mat