# Infovis

This repository contains the code and meeting notes for **group 16** of the *Information Visualization* course at the University of Amsterdam.
## Group members
  - Masoumeh Bakhtiariziabari
  - Kylian van Geijtenbeek
  - Barry Hendriks
  - Iulia Ionescu
  - Martine Toering
### TA / supervisor
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
│
│
│
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
python extract_features.py --dataset_path \path\to\image\dataset\directory --feature_path \path\the\directory\to\save\features
```

## Meeting notes

### Meeting 1, 13 February 2020

Notes Meeting
- Design is very important
- 3 questions that user can answer with visualisation (motivation to open tool)
- Goals:
    - find new pictures that I like (similar to what I already know I like), with specific criteria
    - exploring new pictures
    - compare similar pictures
- Modalities: what happens when you change timeline, explain what each component does, what does it mean
- Make model to compare images (Machine Leaning, similarities, features) (pretrained)
- Focus is on the center part of the design sketch and not on other windows and features
- Meeting next week: choose a subset (portraits or other genre), discuss model

Questions:
- What paintings are similar to this specific painting?
- How similar are two different paintings?
- What paintings are entirely different from this specific painting?

Question answered with optional modalities:
- What paintings are not that similar but still have the same criteria?

Modalities:
- Center image is query image
- Center square contains center image and similar images
- Images around center are similar according to model, when clicked they become center image
  These two are possibly going to be combined into a bokeh plot with images.
- Explore area: dragable
  Images outside of center square are completely random, when clicked they become center image
- Undo / redo button for selected center image restores center image to previous one
- Refresh / random button to refresh the entire explore area
- Tooltips for every painting with info about painting, artist, similarity to center painting
- Title, artist, year, (technique) of selected painting: maybe below painting?

Optional Modalities:
- Timeline: you can pick time period by dragging bars, all paintings shown are from within this time period
- Filters: artist, type, color, etc.
- Favorites section



### Meeting 2, 20 February 2020

Notes Meeting
- Store the images or retrieve from url? -> Use the resized / lowres image, if user wants highres, pull, link to new tab
- Portraits: 15000, Landscape: 15000. Is amount and diversity right? -> Take multiple artwork types. Also take portraits, sketches, drawings. Maybe use genre attribute: Take 10 genres. Not more then 150.000.
- ResNet 18, extract features 64 dim and use similarity function, like Knn sklearn: Can it work? -> Try with 128 dim for now, higher the dim and better feature maps, the better but do not focus too much on it. Try to see how fast it is.
- Current idea is simple to implement. Idea: Creating small neighbourhoods of artworks. Drag and make your own neighbourhoods. Don’t have to let the model change it automatically, would be hard.
- Next Week meeting Wednesday at 10. Try to have a prototype ready.

Questions next meeting

### Meeting 3, 26 February 2020

## Links
- Trello: https://trello.com/invite/b/gSxiQTt3/92389c2b75a8f1e535cf2f66ab8ca667/omniarts-exploration
