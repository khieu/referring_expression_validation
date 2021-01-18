import subprocess
import pandas as pd

file_id = 100
subprocess.run([f'scp pc7:/scratch2/hle/refCOCO/train/attr_tables/attr_{file_id}.tsv ./'], shell=True)
df = pd.read_csv(f'./attr_{file_id}.tsv', encoding='utf-8',sep='\t')
img_id = df['image_id'][0]
subprocess.run([f'scp pc7:/scratch2/hle/refCOCO/train/imgs_by_id/{img_id}.jpg ./'], shell=True)

