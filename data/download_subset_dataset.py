from pathlib import Path
import pandas as pd
import urllib.request
from tqdm import tqdm
from shutil import copyfile
import argparse


def extract_portraits(omni_ds, selected_column, sub_cat_name, src_path, dst_path, dl_or_copy):
    counter = 0
    for index in tqdm(range(len(omni_ds))):
        if counter < 25000:
            if omni_ds[selected_column][index] == sub_cat_name:
                counter += 1
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
        else:
            print(sub_cat_name," loaded ...")
            break


# ------------------------------------------------------------------
def main(opt):
    print(opt,'\n')

    if not opt.dl_dataset:
        if opt.complete_dataset == '':
            print("---- Error: You should specify the path to the pre-dowloaded dataset by using \"--complete_dataset\", since you did not use the \"--dl_dataset\" option")
            assert False
    # Categories that you want to download:
    # selected_column = "artwork_type"  # It contains 520 categories!!
    # categories = ["landscape",  "accessory", "sword blades", "fencing equipment", "plaster-reproductions", "design"]

    selected_column = "general_type"  # It contains 15 categories!!
    categories = ['print', 'photograph', 'sculpture', 'design', 'weapons and armor', 'drawing', 'painting', 'craft', 'installation', 'textile']


    # Paths:
    metadata_path = opt.metadata_root

    if opt.dl_dataset:
        # official omniart url of low resolution images:
        src_path = opt.url_root + "/data/img_300x/"
        if opt.dl_metadata:
            Path(metadata_path).mkdir(parents=True, exist_ok=True)
            urllib.request.urlretrieve(
                opt.url_root + "/data/csv/omniart_v3_datadump.csv",
                metadata_path / Path('omniart_v3_datadump.csv'))
    else:
        src_path = Path(opt.complete_dataset)

    metadata_path = metadata_path / Path('omniart_v3_datadump.csv')

    omni_ds = pd.read_csv(metadata_path)
    print(omni_ds.columns)


    for sub_cat_name in categories:
        dst_path = Path(opt.data_root) / "subset" #"subsets" / selected_column / sub_cat_name
        Path(dst_path).mkdir(parents=True, exist_ok=True)

        extract_portraits(omni_ds, selected_column, sub_cat_name, src_path, dst_path, opt.dl_dataset)


# ---------------------------

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process run time args.')

    parser.add_argument('--url_root', required=True,
                        help='url path to parent directory (omniart_v3)')

    parser.add_argument('--data_root', required=True,
                        help='path to save subset images')

    parser.add_argument('--metadata_root', required=True,
                        help='path to load/save the metadata file (omniart_v3_datadump.csv)')

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
