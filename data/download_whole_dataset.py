# run: python download_subset_dataset.py --data_root \path\to\dirctory\to\save\whole\dataset --metadata_root \path\to\dirctory\to\save\or\load\metadata --url_root http:\\url\path\to\omniart_v3 --dl_metadata

# Example
# python download_subset_dataset.py --data_root C:\Users\mbakh\Desktop\Courses\InfoVis\omni-exploration-project\Dataset\data --metadata_root C:\Users\mbakh\Desktop\Courses\InfoVis\omni-exploration-project\Dataset\data\csv --url_root http:\\...\omniart_v3 --dl_metadata


from pathlib import Path
import pandas as pd
import urllib.request
from tqdm import tqdm
import argparse

def download_images(metadata_path, url_path, dst_path):
    omni_ds = pd.read_csv(metadata_path)
    print(omni_ds.columns)

    for index in tqdm(range(len(omni_ds))):
        file_name = str(omni_ds['omni_id'][index]) + ".jpg"
        src = url_path + file_name
        dst = dst_path / file_name
        urllib.request.urlretrieve(src, dst)

# ------------------------------------------
def main(opt):
    print(opt, '\n')

    url_path = opt.url_root + "/data/img_300x/"
    dst_path = opt.data_root / Path(r"data") / Path(r"\img_300x")
    metadata_path = opt.metadata_root / Path(r'omniart_v3_datadump.csv')
    download_images(metadata_path, url_path, dst_path)


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Process run time args.')

    parser.add_argument('--url_root', required=True,
                        help='url path to parent directory (omniart_v3)')

    parser.add_argument('--metadata_root', required=True,
                        help='path to load/save the metadata file (csv)')

    parser.add_argument('--data_root', type=str, default='',
                        help='path to save whole dataset')

    parser.add_argument('--dl_metadata', action='store_true',
                        help='if specified, download metadata directly from the url, '
                             'otherwise you have to pass the location of your metadata to the command line.')

    args = parser.parse_args()
    main(args)