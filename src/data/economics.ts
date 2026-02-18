import rawData from './economic_data.json';

export type Country = 'India' | 'China' | 'Japan' | 'USA' | 'Germany';
export type Metric = 'GDP' | 'Inflation' | 'Fiscal Deficit' | 'Unemployment';

export interface EconomicData {
    country: Country;
    year: number;
    gdp: number; // in Trillion USD
    inflation: number; // in %
    fiscalDeficit: number; // in % of GDP
    unemployment: number; // in %
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
