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


## Meeting notes

### Meeting 1, 13 February 2020
- design is very important
- 3 questions that user can answer with visualisation (motivation to open tool)
- goals:
    - find new pictures that I like (similar to what I already know I like), with specific criteria
    - exploring new pictures
    - compare similar pictures
- modalities: what happens when you change timeline, explain what each component does, what does it mean
- make model to compare images (Machine Leaning, similarities, features) (pretrained)
- Focus is on the center part of the design sketch and not on other windows and features
- Meeting next week: choose a subset (portraits or other genre), discuss model

Questions:
- What paintings are similar to this specific painting?
- How similar are two different paintings (similarity scores, attributes)?
- What paintings are not that similar but still have the same criteria?

Modalities:
- Center image is query image
- Center square contains center image and similar images
  Images around center are similar according to model, when clicked they become center image
- Explore area
  Images outside of center square are completely random, when clicked they become center image
- Undo / redo button for selected center image
- Refresh / random button to refresh the entire explore area
- Tooltips for every painting with info about painting, artist
- Title, artist, year, (technique) of selected painting: maybe below painting?

Optional Modalities:
1. Timeline: you can pick time period by dragging bars, all paintings shown are from within this time period
2. Filters: artist, type, color, etc.
3. Favorites section
