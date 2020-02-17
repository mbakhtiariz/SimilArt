import pandas as pd
import numpy as np

# metadata = pd.read_csv('data/metadatas.csv', dtype=str, nrows=100000)
# metadata = pd.read_csv('data/metalevelmeta.csv', dtype=str, nrows=100000)
metadata = pd.read_csv('data/omniart_v3_datadump.csv', dtype=str, nrows=100000)
print(metadata.columns)
