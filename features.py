import torch
import torch.nn as nn
from torchvision.models import resnet18
from torchvision import transforms

from PIL import Image

import numpy as np
import pandas as pd
import requests

from io import BytesIO

device = torch.device('cuda:0')
num_imgs = 100

# Create the resnet18 base model
resnet = resnet18(pretrained=True)
model = nn.Sequential(*list(resnet.children())[:5], nn.AvgPool2d(56))
model.eval().to(device)
del resnet
print(model)


# Load the data (resized images to drastically reduce download time)
data_url = 'http://isis-data.science.uva.nl/strezoski/omniart/omniart_v3/data/img_300x/'
data = pd.read_csv('app/data/reproductions.csv', dtype=str, nrows=num_imgs)

# Each image is resized, cast to Tensor and normalized
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5,0.5,0.5], std=[0.225, 0.225, 0.225])
])

# Create empty Tensor to store features
features = torch.empty(0, 64)
ids = []

# For each data entry, load the image and extract features
for index, row in data.iterrows():
    id = row['metadata_id_id']
    ids.append(str(id))
    url = data_url + row['filename'].split('/')[-1]

    # Retrieve image through url (could possibly also load from disk if stored)
    response = requests.get(url)
    img = Image.open(BytesIO(response.content)).convert('RGB')
    img = transform(img).unsqueeze(0).to(device)
    print(index)
    # Extract features
    with torch.no_grad():
        feature = model(img).squeeze()
        features = torch.cat((features, feature.cpu().unsqueeze(0)), 0)


# Cast to pandas dataframe
features = pd.DataFrame(features.numpy())
ids = pd.DataFrame(np.array(ids).reshape((num_imgs, -1)))
features.insert(0, 'id', ids)
print(features)
features.to_csv('features.csv', index=False)
