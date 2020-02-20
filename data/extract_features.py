import torch
import torch.nn as nn
from torchvision.models import resnet18
from torchvision import transforms

from PIL import Image

from pathlib import Path
import os
import scipy.io as sio

device = torch.device('cuda:0')

# Create the resnet18 base model
resnet = resnet18(pretrained=True)
model = nn.Sequential(*list(resnet.children())[:5], nn.AvgPool2d(56))
model.eval().to(device)
del resnet
print(model)


# Load the data (resized images to drastically reduce download time)
# please modify this line to your own local path of low res portrait subset dataset:
data_path = Path(r"C:\Users\mbakh\Desktop\Courses\InfoVis\omni-exploration-project\Datasets\omniarts\data\subsets\artwork_type\portrait")
filelist = [file for file in os.listdir(data_path) if file.endswith('.jpg')]
num_imgs = len(filelist)

# Each image is resized, cast to Tensor and normalized
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.225, 0.225, 0.225])
])

features = torch.empty(0, 64)
# ids = []
path = []

for index, image_name in enumerate(filelist):
    if index == num_imgs:
        break
    print(index)
    image_id = image_name[:-4]
    # ids.append(str(image_id))

    image_path = data_path / image_name
    path.append(str(image_path))

    img = Image.open(image_path).convert('RGB')
    img = transform(img).unsqueeze(0).to(device)

    # Extract features
    with torch.no_grad():
        feature = model(img).squeeze()
        features = torch.cat((features, feature.cpu().unsqueeze(0)), 0)

# Cast to pandas dataframe
# features = pd.DataFrame(features.numpy())
# ids = pd.DataFrame(np.array(ids).reshape((num_imgs, -1)))
# features.insert(0, 'id', ids)
# print(features)
# features.to_csv('features.csv', index=False)


# save to features as matrix
image_numpy = features.float().numpy()
mat_name = Path('features.mat')
save_path_mat = Path('./') / mat_name
sio.savemat(save_path_mat, {'feature': image_numpy, 'path': path})



