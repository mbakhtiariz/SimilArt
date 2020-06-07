# Infovis

This repository contains the code for SimilArt (a platform for visualization, explaration and comparision of artworks) **group 16** of the *Information Visualization* course at the University of Amsterdam.

**Preview: [Cast](https://drive.google.com/file/d/14qyTlJ3S3k7uOsjBqV7WgeadMIndCTxc/view?usp=sharing) | [Slide](https://github.com/mbakhtiariz/SimilArt/blob/master/Slides.pdf) | [Report](https://github.com/mbakhtiariz/SimilArt/blob/master/Report.pdf)**

## Group members
  - Masoumeh Bakhtiariziabari
  - Kylian van Geijtenbeek
  - Barry Hendriks
  - Iulia Ionescu
  - Martine Toering
### Supervisor
  - Gjorgji Strezoski


## Path structure:
```
please upload/save dataset and files with this structure:

├── ...
├── Infovis                           # Code files
│   ├── data                          # This folder contains the codes for downloading and preprocessing of the dataset
│   ├── app
|   |   ├── data
|   |   ├── main                      # Flask routes and events
|   |   ├── templates                 # HTML templates for the app
|   |   ├── static
|   |   |   ├── css                   # Css style files
|   |   |   ├── js                    # Javascript files
|   |   |   └── subset                # The selected subset of low resolution images should be saved in this folder.
|   |   └── ...
│   ├── README.md
│   ├── requirements.txt
│   ├── start_app.sh
│   └── run.py
|   | 
|   | 
| 
├── Dataset                           # Dataset root directory it contains omniart_v3 images and csv files
│   ├── data                          # This folder is the main directory that we read data from it/ save related preprocing files in it
│   │   ├── img_300x                  # It containes low res images. If you have downloaded the whole dataset it should be save here
│   │   ├── csv                       # This folder contains the metadatas (including artwork_tpye and general_type) for low res images
│   │   │   └── omniart_v3_datadump.csv
│   │   └── features.csv              # This file is the calculated features of all images by running ../Infovis/extract_features.py
│   │
│   └── artsight_csvs                 # This directory contains 3 different kinds of metadata file each covers a few dataset attributes.
│       ├── metadatas.csv             
│       ├── metalevelmeta.csv         
│       └── reproductions.csv
└── ...


```

## Data downloading/preproccessing:

#### Download 150'000 images from 10 subsets of "general_type" category:
```
python data\download_subset_dataset.py --data_root \path\to\dirctory\to\save\dataset --metadata_root \path\to\dirctory\to\save\or\load\metadata --url_root http:\\url\path\to\omniart_v3 --dl_dataset --dl_metadata
```

#### Extract features from the pretrained Resnet18:
```
python data\extract_features.py --dataset_path \path\to\image\dataset\directory --feature_path \path\the\directory\to\save\features
```

## Running script
```
python run.py
```



