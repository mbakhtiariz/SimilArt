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
def main(opt):
    print(opt, '\n')

    url_path = opt.url_root + "/data/img_300x/"
    dst_path = opt.data_root / Path(r"data\img_300x")
    metadata_path = opt.metadata_root / Path(r'omniart_v3_datadump.csv')
    download_images(metadata_path, url_path, dst_path)


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Process run time args.')

    parser.add_argument('--url_root', required=True,
                        help='url path to parent directory (omniart_v3)')

    parser.add_argument('--metadata_root', required=True,
                        help='path to load/save the metadata file (omniart_v3_datadump.csv)')

    parser.add_argument('--data_root', type=str, default='',
                        help='path to save whole dataset')

    parser.add_argument('--dl_metadata', action='store_true',
                        help='if specified, download metadata directly from the url, '
                             'otherwise you have to pass the location of your metadata to the command line.')

    args = parser.parse_args()
    main(args)