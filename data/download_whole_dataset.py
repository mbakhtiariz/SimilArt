from pathlib import Path
import pandas as pd
import urllib.request
from tqdm import tqdm

def download_images(metadata_path, url_path, dst_path):
    omni_ds = pd.read_csv(metadata_path)
    print(omni_ds.columns)

    for index in tqdm(range(len(omni_ds))):
        file_name = str(omni_ds['omni_id'][index]) + ".jpg"
        src = url_path + file_name
        dst = dst_path / file_name
        urllib.request.urlretrieve(src, dst)

# ------------------------------------------
url_path = "http://isis-data.science.uva.nl/strezoski/omniart/omniart_v3/data/img_300x/"

# modify these 2 lines:
dst_path = Path(r"C:\Users\mbakh\Desktop\Courses\InfoVis\Datasets\omniarts\data\300x")
metadata_path = Path(r'C:\Users\mbakh\Desktop\Courses\InfoVis\Datasets\omniarts\data\csv\omniart_v3_datadump.csv')

download_images(metadata_path, url_path, dst_path)
