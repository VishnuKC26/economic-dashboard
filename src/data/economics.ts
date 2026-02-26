import rawData from './economic_data.json';

export type Country = 'India' | 'China' | 'Japan' | 'USA' | 'Germany';
export type Metric = 'GDP' | 'GDP per Capita' | 'Growth Rate' | 'PMI' | 'IIP' | 'Retail Sales' | 'CPI' | 'PPI' | 'Import Price Index' | 'Unemployment Rate' | 'Wage Growth' | 'Real Disposable Income' | 'Current Account' | 'Trade Balance' | 'Exchange Rate' | 'NEER';

export interface EconomicData {
    country: Country;
    year: number;
    gdp: number; // in Trillion USD
    gdpPerCapita: number; // in USD
    growthRate: number; // in %
    pmi: number; // Index
    iip: number; // Index
    retailSales: number; // in % YoY
    cpi: number; // in % YoY
    ppi: number; // in % YoY
    importPriceIndex: number; // Index
    unemployment: number; // in %
    wageGrowth: number; // in % YoY
    realDisposableIncome: number; // in % YoY
    currentAccount: number; // % of GDP
    tradeBalance: number; // Billion USD
    exchangeRate: number; // Local Currency per USD
    neer: number; // Index
}

// Cast the imported JSON to the EconomicData type to ensure type safety
// The JSON has the exact same structure as the interface
export const economicData: EconomicData[] = rawData as EconomicData[];

export const getCountryColor = (country: Country): string => {
    switch (country) {
        case 'India': return '#FF9933'; // Saffron
        case 'China': return '#DE2910'; // Chinese Red
        case 'Japan': return '#F97316'; // Orange-500 (Distinct from China)
        case 'USA': return '#3C3B6E'; // Blue
        case 'Germany': return '#EAB308'; // Yellow-500 (Visible on Dark)
        default: return '#cccccc';
    }
};
