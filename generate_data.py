import json
import random

# Countries and years mapped to generate 10-year history
countries = ['India', 'China', 'Japan', 'USA', 'Germany']
years = list(range(2016, 2026))

# Base data to simulate realistic values starting point
base_metrics = {
    'USA': {'gdp': 21.0, 'gdpPerCapita': 63000, 'growthRate': 2.5, 'pmi': 52.0, 'iip': 105.0, 'retailSales': 5.0, 'cpi': 2.5, 'ppi': 2.0, 'importPriceIndex': 102.0, 'unemployment': 4.0, 'wageGrowth': 3.0, 'realDisposableIncome': 2.5, 'currentAccount': -3.0, 'tradeBalance': -50.0, 'exchangeRate': 1.0, 'neer': 110.0},
    'China': {'gdp': 15.0, 'gdpPerCapita': 10500, 'growthRate': 6.0, 'pmi': 51.5, 'iip': 120.0, 'retailSales': 8.0, 'cpi': 2.0, 'ppi': 1.5, 'importPriceIndex': 100.0, 'unemployment': 5.0, 'wageGrowth': 7.0, 'realDisposableIncome': 6.5, 'currentAccount': 1.5, 'tradeBalance': 40.0, 'exchangeRate': 6.5, 'neer': 125.0},
    'Germany': {'gdp': 4.0, 'gdpPerCapita': 48000, 'growthRate': 1.5, 'pmi': 50.0, 'iip': 102.0, 'retailSales': 2.0, 'cpi': 1.8, 'ppi': 1.2, 'importPriceIndex': 98.0, 'unemployment': 3.5, 'wageGrowth': 2.5, 'realDisposableIncome': 1.5, 'currentAccount': 7.0, 'tradeBalance': 20.0, 'exchangeRate': 0.85, 'neer': 105.0},
    'Japan': {'gdp': 5.0, 'gdpPerCapita': 40000, 'growthRate': 1.0, 'pmi': 49.5, 'iip': 98.0, 'retailSales': 1.0, 'cpi': 0.5, 'ppi': 0.8, 'importPriceIndex': 101.0, 'unemployment': 2.5, 'wageGrowth': 1.0, 'realDisposableIncome': 0.5, 'currentAccount': 3.5, 'tradeBalance': 2.0, 'exchangeRate': 110.0, 'neer': 95.0},
    'India': {'gdp': 2.8, 'gdpPerCapita': 2000, 'growthRate': 7.0, 'pmi': 54.0, 'iip': 130.0, 'retailSales': 10.0, 'cpi': 4.5, 'ppi': 3.5, 'importPriceIndex': 105.0, 'unemployment': 6.0, 'wageGrowth': 8.0, 'realDisposableIncome': 5.5, 'currentAccount': -1.5, 'tradeBalance': -15.0, 'exchangeRate': 70.0, 'neer': 85.0}
}

data = []

for c in countries:
    current_metrics = base_metrics[c].copy()
    for y in years:
        # Create a data point with small random variations mimicking economic cycles
        year_data = {
            "country": c,
            "year": y,
            "gdp": round(current_metrics['gdp'], 2),
            "gdpPerCapita": int(current_metrics['gdpPerCapita']),
            "growthRate": round(current_metrics['growthRate'] + random.uniform(-1, 1), 1),
            "pmi": round(current_metrics['pmi'] + random.uniform(-2, 2), 1),
            "iip": round(current_metrics['iip'] + random.uniform(-1, 3), 1),
            "retailSales": round(current_metrics['retailSales'] + random.uniform(-0.5, 1.5), 1),
            "cpi": round(current_metrics['cpi'] + random.uniform(-0.5, 1), 1),
            "ppi": round(current_metrics['ppi'] + random.uniform(-0.5, 1), 1),
            "importPriceIndex": round(current_metrics['importPriceIndex'] + random.uniform(-2, 2), 1),
            "unemployment": round(current_metrics['unemployment'] + random.uniform(-0.5, 0.5), 1),
            "wageGrowth": round(current_metrics['wageGrowth'] + random.uniform(-0.5, 0.5), 1),
            "realDisposableIncome": round(current_metrics['realDisposableIncome'] + random.uniform(-0.5, 0.5), 1),
            "currentAccount": round(current_metrics['currentAccount'] + random.uniform(-0.5, 0.5), 1),
            "tradeBalance": round(current_metrics['tradeBalance'] + random.uniform(-5, 5), 1),
            "exchangeRate": round(current_metrics['exchangeRate'] * (1 + random.uniform(-0.02, 0.02)), 2),
            "neer": round(current_metrics['neer'] + random.uniform(-2, 2), 1)
        }
        data.append(year_data)
        
        # Advance base metrics slightly for next year (compounding effects)
        current_metrics['gdp'] *= (1 + year_data['growthRate'] / 100)
        current_metrics['gdpPerCapita'] *= (1 + year_data['growthRate'] / 100)
        # Revert mean-reverting metrics slightly back to base to avoid drifting to extreme values over 10 years
        current_metrics['pmi'] = (current_metrics['pmi'] + base_metrics[c]['pmi']) / 2
        current_metrics['unemployment'] = (current_metrics['unemployment'] + base_metrics[c]['unemployment']) / 2
        

# Convert to JSON block and save
with open('src/data/economic_data.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Generated dummy economic data successfully!")
