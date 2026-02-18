import pandas as pd
import os

files = ['Fiscal Deficit and Growth Data.xlsx', 'GDP_Data_2023-2025.xlsx', 'UnemplRate.xlsx']
output_file = 'inspection_output.txt'

with open(output_file, 'w') as f:
    for file in files:
        f.write(f"\n--- {file} ---\n")
        try:
            df = pd.read_excel(file)
            f.write(f"Columns: {df.columns.tolist()}\n")
            f.write(df.head().to_string())
            f.write("\n")
        except Exception as e:
            f.write(f"Error reading {file}: {e}\n")

print(f"Inspection complete. Results written to {output_file}")
