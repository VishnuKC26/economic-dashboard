import pandas as pd

files = ['Fiscal Deficit and Growth Data.xlsx', 'GDP_Data_2023-2025.xlsx', 'UnemplRate.xlsx']
output_file = 'sheet_inspection.txt'

with open(output_file, 'w') as f:
    for file in files:
        f.write(f"\n--- {file} ---\n")
        try:
            xl = pd.ExcelFile(file)
            f.write(f"Sheets: {xl.sheet_names}\n")
            for sheet in xl.sheet_names:
                df = pd.read_excel(file, sheet_name=sheet)
                f.write(f"  Sheet '{sheet}' Columns: {df.columns.tolist()}\n")
        except Exception as e:
            f.write(f"Error reading {file}: {e}\n")

print(f"Sheet inspection complete. Results written to {output_file}")
