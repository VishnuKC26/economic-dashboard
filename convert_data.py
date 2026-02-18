import pandas as pd
import json
import os

# Define consistent country names mapping if needed
# Based on inspection, names seem to be: 'India', 'China', 'Japan', 'USA', 'Germany'

def normalize_country(name):
    if not isinstance(name, str):
        return str(name)
    name = name.strip()
    if name.lower() in ['united states', 'us', 'usa', 'united states of america']:
        return 'USA'
    return name

data_map = {} # (Country, Year) -> {gdp, inflation, fiscalDeficit, unemployment}

def get_entry(country, year):
    if (country, year) not in data_map:
        data_map[(country, year)] = {'gdp': 0, 'inflation': 0, 'fiscalDeficit': 0, 'unemployment': 0}
    return data_map[(country, year)]

# 1. Process GDP Data
print("Processing GDP Data...")
try:
    df_gdp = pd.read_excel('GDP_Data_2023-2025.xlsx', sheet_name='Year-wise View')
    # Columns: ['Year', 'Country', 'GDP (Trillion USD)', 'Growth Rate (%)']
    for _, row in df_gdp.iterrows():
        country = normalize_country(row['Country'])
        year = int(row['Year'])
        entry = get_entry(country, year)
        entry['gdp'] = row['GDP (Trillion USD)']
except Exception as e:
    print(f"Error processing GDP data: {e}")


# 2. Process Fiscal Deficit Data
print("Processing Fiscal Deficit Data...")
try:
    df_fd = pd.read_excel('Fiscal Deficit and Growth Data.xlsx', sheet_name='Fiscal Deficit and Growth Data')
    # Columns: ['Country', '2023 (Actual)', 'FD Growth (2023 to 2024)', '2024 (Final/RE)', 'FD Growth (2024 to 2025)', '2025 (Projected/BE)', 'Trend']
    # Mapping columns to years
    fd_year_map = {
        2023: '2023 (Actual)',
        2024: '2024 (Final/RE)',
        2025: '2025 (Projected/BE)'
    }

    for _, row in df_fd.iterrows():
        country = normalize_country(row['Country'])
        for year, col in fd_year_map.items():
            entry = get_entry(country, year)
            
            # val might be string with % or just number
            val = row[col]
            if isinstance(val, str):
                try:
                    val = float(val.replace('%', '').strip())
                except ValueError:
                    val = 0
            
            entry['fiscalDeficit'] = val
except Exception as e:
    print(f"Error processing Fiscal Deficit data: {e}")

# 3. Process Unemployment Data
print("Processing Unemployment Data...")
try:
    df_un = pd.read_excel('UnemplRate.xlsx', sheet_name='Sheet1')
    # Columns: ['Country', 'Unemployment rate(2023)', '%change(23-24)', 'Unemployment rate(2024)', '%change(23-24).1', 'Unemployment rate(2025)']
    un_year_map = {
        2023: 'Unemployment rate(2023)',
        2024: 'Unemployment rate(2024)',
        2025: 'Unemployment rate(2025)'
    }

    for _, row in df_un.iterrows():
        country = normalize_country(row['Country'])
        for year, col in un_year_map.items():
            entry = get_entry(country, year)
            
            val = row[col]
            if isinstance(val, str):
                try:
                    val = float(val.replace('%', '').strip())
                except ValueError:
                    val = 0
                
            entry['unemployment'] = val
except Exception as e:
    print(f"Error processing Unemployment data: {e}")

# Convert to list for JSON
output_data = []
for (country, year), metrics in data_map.items():
    entry = {
        'country': country,
        'year': year,
        **metrics
    }
    output_data.append(entry)

# Sort by Country, then Year
output_data.sort(key=lambda x: (x['country'], x['year']))

# Filter to ensure we only have the required years
output_data = [d for d in output_data if d['year'] in [2023, 2024, 2025]]

output_dir = 'src/data'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

output_path = os.path.join(output_dir, 'economic_data.json')
with open(output_path, 'w') as f:
    json.dump(output_data, f, indent=4)

print(f"Data conversion complete. Saved to {output_path}")
print(f"Total records: {len(output_data)}")
