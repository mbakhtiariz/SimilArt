import torch
import torch.nn as nn
from torchvision.models import resnet18
from torchvision import transforms

import numpy as np
import pandas as pd
import os
from tqdm import tqdm
from PIL import Image

def extract_features(num_imgs, img_folder, outfile):
    device = torch.device('cuda:0')

    # Create the resnet18 base model
    resnet = resnet18(pretrained=True)
    model = nn.Sequential(*list(resnet.children())[:5], nn.AvgPool2d(56))
    model.eval().to(device)
    del resnet

    # Each image is resized, cast to Tensor and normalized
    transform = transforms.Compose([
        transforms.Resize(224),
        transforms.CenterCrop((224,224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5,0.5,0.5], std=[0.225, 0.225, 0.225])
    ])

    # Create empty Tensor to store features
    features = torch.empty(0, 64)
    ids = []
    failed_ids = []

    # For each image, load the image and extract features
    for file in tqdm(os.listdir(img_folder)[:num_imgs]):
        if file.endswith(".jpg"):
            id = file[:-4]
            try:
                ids.append(id)
                img = Image.open(os.path.join(img_folder, file)).convert('RGB')
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

# Change folder below to what you need
extract_features(15000, r'C:\Users\kylia\Documents\Msc AI jaar 1\Information Visualization\Infovis\imgs', 'features.csv')
