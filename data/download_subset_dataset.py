from pathlib import Path
import pandas as pd
import urllib.request
from tqdm import tqdm
from shutil import copyfile
import argparse


def extract_portraits(omni_ds, selected_column, sub_cat_name, src_path, dst_path, dl_or_copy):
    for index in tqdm(range(len(omni_ds))):
        if omni_ds[selected_column][index] == sub_cat_name:
            file_name = str(omni_ds['omni_id'][index]) + ".jpg"
            # if file_name not in ["11034064.jpg", "11038913.jpg", "11041471.jpg"]:
            dst = dst_path / file_name
            if dl_or_copy:
                # download from the official omniart url of low resolution images:
                src = src_path + file_name
                urllib.request.urlretrieve(src, dst)
            else:
                # copy from local directory
                src = src_path / file_name
                copyfile(src, dst)
            # print(file_name)


# ------------------------------------------------------------------
def main(opt):
    print(opt)

    # Categories that you want to download:
    selected_column = "artwork_type"  # It contains 512 categories!!
    sub_cat_name = "landscape"

    # Paths:
    metadata_path = opt.metadata_root
    Path(metadata_path).mkdir(parents=True, exist_ok=True)

    if opt.dl_dataset:
        # official omniart url of low resolution images:
        src_path = "http://isis-data.science.uva.nl/strezoski/omniart/omniart_v3/data/img_300x/"
        if opt.dl_metadata:
            urllib.request.urlretrieve(
                "http://isis-data.science.uva.nl/strezoski/omniart/omniart_v3/artsight_csvs/metadatas.csv",
                metadata_path / Path('metadatas.csv'))
    else:
        src_path = opt.complete_dataset

    metadata_path = metadata_path / Path('metadatas.csv')

    omni_ds = pd.read_csv(metadata_path)
    print(omni_ds.columns)

    dst_path = Path(opt.data_root) / "subsets" / selected_column / sub_cat_name
    Path(dst_path).mkdir(parents=True, exist_ok=True)

    extract_portraits(omni_ds, selected_column, sub_cat_name, src_path, dst_path, opt.dl_dataset)


# ---------------------------

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--data_root', required=True,
                        help='path to save subset images')

    parser.add_argument('--metadata_root', required=True,
                        help='path to load/save the metadata file')

    parser.add_argument('--complete_dataset', type=str, default='',
                        help='path of predownload whole dataset')

    parser.add_argument('--dl_dataset', action='store_true',
                        help='if specified, download dataset directly from the url, '
                             'otherwise you have to pass the location of your pre-downloaded-dataset to the '
                             'command line.')

    parser.add_argument('--dl_metadata', action='store_true',
                        help='if specified, download metadata directly from the url, '
                             'otherwise you have to pass the location of your metadata to the command line.')

    args = parser.parse_args()
    main(args)
