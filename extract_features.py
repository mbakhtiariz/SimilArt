# run: python extract_features.py --dataset_path \path\to\image\dataset\directory

import torch
import torch.nn as nn
from torchvision.models import resnet18
from torchvision import transforms

import numpy as np
import pandas as pd
import os
from tqdm import tqdm
from PIL import Image

import argparse
from pathlib import Path


def extract_features(img_folder, outfile, num_imgs=-1):
    ''''
    For extracting feauters of each image in the given dataset, Using a pretrained model (Resnet18). | # TODO:Resnet50
    input:
        - img_folder:           local path of the directory of image dataset
        - outfile:              path and name of the csv file that we intend to store all the features inside it.
        - num_img:              For the case that we want to calculate the features for a subset of dataset
                                and not all of the images. (for debuging purpose).
    output:
        It save the extracted features in a csv file.
    '''
    device = torch.device('cuda:0')

    # Create the resnet18 base model
    resnet = resnet18(pretrained=True)
    model = nn.Sequential(*list(resnet.children())[:6], nn.AvgPool2d(28))
    model.eval().to(device)
    del resnet

    # Each image is resized, cast to Tensor and normalized
    transform = transforms.Compose([
        transforms.Resize(224),
        transforms.CenterCrop((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.225, 0.225, 0.225])
    ])

    # Create empty Tensor to store features
    features = torch.empty(0, 128)
    ids = []
    failed_ids = []

    filelist = [file for file in os.listdir(img_folder) if file.endswith('.jpg')]

    if num_imgs == -1:  # if -1 pick all images
        num_imgs = len(filelist)

    # For each image, load the image and extract features
    # for file in tqdm(os.listdir(img_folder)[:num_imgs]):
    for file in tqdm(filelist[:num_imgs]):
        # if file.endswith(".jpg"):
        id = file[:-4]

        try:
            ids.append(id)
            # img = Image.open(os.path.join(img_folder, file)).convert('RGB')
            img = Image.open(Path(img_folder) / Path(file)).convert('RGB')
            img = transform(img).unsqueeze(0).to(device)

        except:
            failed_ids.append(id)

        # Extract features
        with torch.no_grad():
            feature = model(img).squeeze()
            features = torch.cat((features, feature.cpu().unsqueeze(0)), 0)

    # Cast to pandas dataframe
    features = pd.DataFrame(features.numpy())
    ids = pd.DataFrame(np.array(ids, dtype=int).reshape((len(ids), -1)))
    features.insert(0, 'id', ids)
    print(features)
    print(failed_ids)
    features.to_csv(outfile, index=False)


def main(opt):
    print(opt, '\n')
    # Change folder below to what you need
    #     extract_features(15000, r'C:\Users\kylia\Documents\Msc AI jaar 1\Information Visualization\Infovis\imgs', 'features.csv')
    extract_features(Path(opt.dataset_path), 'features.csv',-1)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process run-time args.')
    parser.add_argument('--dataset_path', required=True,
                        help='path of the directory of subset images')

    args = parser.parse_args()
    main(args)



