from pathlib import Path
import pandas as pd
import urllib.request
from tqdm import tqdm
from shutil import copyfile


def extract_portraits(omni_ds, selected_column, sub_cat_name, src_path, dst_path, dl_or_copy="dl"):
    for index in tqdm(range(len(omni_ds))):
        if omni_ds[selected_column][index] == sub_cat_name:
            file_name = str(omni_ds['omni_id'][index]) + ".jpg"
            # if file_name not in ["11034064.jpg", "11038913.jpg", "11041471.jpg"]:
            dst = dst_path / file_name
            if dl_or_copy == "dl":
                # download from the official omniart url of low resolution images:
                src = src_path + file_name
                urllib.request.urlretrieve(src, dst)
            else:
                # copy from local directory
                src = src_path / file_name
                copyfile(src, dst)
            # print(file_name)


# ------------------------------------------------------------------

# Categories that you want to download:
selected_column = "artwork_type"  # It contains 512 categories!!
sub_cat_name = "landscape"

# Flags
dl_or_copy = "dl"  # download directly from given ominarts url
# dl_or_copy = "copy" # copy from pre-downloaded dataset from the local path
metadata_dl_flag = False

# Paths:
# please modify this line to your local path of the dataset:
local_root_path = Path(r"C:\Users\mbakh\Desktop\Courses\InfoVis\omni-exploration-project\Datasets\omniarts")
metadata_path = local_root_path / Path(r'artsight_csvs')
Path(metadata_path).mkdir(parents=True, exist_ok=True)

if dl_or_copy == "dl":
    # official omniart url of low resolution images:
    src_path = "http://isis-data.science.uva.nl/strezoski/omniart/omniart_v3/data/img_300x/"
    if metadata_dl_flag == True:
        urllib.request.urlretrieve("http://isis-data.science.uva.nl/strezoski/omniart/omniart_v3/artsight_csvs/metadatas.csv", metadata_path / Path('metadatas.csv'))

else:
    # please modify this line to your local path of the whole dataset:
    src_path = local_root_path / "data" /  "300x"

metadata_path = metadata_path / Path('metadatas.csv')

omni_ds = pd.read_csv(metadata_path)
print(omni_ds.columns)

dst_path = local_root_path / "data" / "subsets" / selected_column / sub_cat_name
Path(dst_path).mkdir(parents=True, exist_ok=True)


extract_portraits(omni_ds, selected_column, sub_cat_name, src_path, dst_path, dl_or_copy)
