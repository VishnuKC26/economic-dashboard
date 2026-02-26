import type { Metric } from '../data/economics';

export interface Indicator {
    id: string;
    name: string;
    description: string;
    fullDefinition: string;
    metricKey: Metric;
    unit?: string;
    dataSource?: string;
    examples?: string[];
}

export interface Perspective {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    tags: string[];
    indicators: Indicator[];
}

export const PERSPECTIVES: Perspective[] = [
    {
        id: 'industrial-activity',
        title: 'Industrial Activity',
        description: 'How much is the economy producing and selling?',
        icon: 'Factory', // Will map to a real lucide icon in component
        color: 'indigo',
        tags: ['PMI', 'IIP', 'RETAIL SALES', 'GDP GROWTH'],
        indicators: [
            {
                id: 'pmi', name: 'Purchasing Managers Index (PMI)',
                description: 'Economic trends in manufacturing and services',
                fullDefinition: 'PMI provides an advance indication of what is really happening in the private sector economy by tracking variables such as output, new orders, employment and prices across key sectors.',
                metricKey: 'PMI',
                unit: 'Index (Baseline 50)',
                dataSource: 'S&P Global PMI, ISM',
                examples: ['Manufacturing output', 'Service sector confidence']
            },
            {
                id: 'iip', name: 'Index of Industrial Production (IIP)',
                description: 'Measures growth rates in different industry groups',
                fullDefinition: 'IIP details out the growth of various sectors in an economy such as mining, electricity and manufacturing.',
                metricKey: 'IIP',
                unit: '% YoY Growth',
                dataSource: 'National Statistics Offices',
                examples: ['Factory output', 'Mining extraction', 'Electricity generation']
            },
            {
                id: 'retail-sales', name: 'Retail Sales',
                description: 'Consumer spending at retail stores',
                fullDefinition: 'Measures the purchases of finished goods and services by consumers and businesses.',
                metricKey: 'Retail Sales',
                unit: '% YoY Growth',
                dataSource: 'Census Bureaus, National Statistics',
                examples: ['E-commerce spending', 'Automobile sales', 'Department store revenue']
            },
            {
                id: 'gdp-growth', name: 'GDP Growth Rate',
                description: 'Annual percentage growth of GDP',
                fullDefinition: 'Measures the rate at which a country\'s economy is growing or shrinking from year to year, adjusted for inflation.',
                metricKey: 'Growth Rate',
                unit: '%',
                dataSource: 'World Bank, IMF',
                examples: ['Quarterly GDP reports', 'Annual economic forecasts']
            }
        ]
    },
    {
        id: 'cost-of-living',
        title: 'Cost of Living',
        description: 'How do prices move for consumers and producers?',
        icon: 'Tag',
        color: 'amber',
        tags: ['CPI', 'PPI', 'IMPORT PRICES'],
        indicators: [
            {
                id: 'cpi', name: 'Consumer Price Index (CPI)',
                description: 'Changes in the price level of consumer goods',
                fullDefinition: 'A measure that examines the weighted average of prices of a basket of consumer goods and services, such as transportation, food, and medical care.',
                metricKey: 'CPI',
                unit: '% YoY',
                dataSource: 'Bureau of Labor Statistics, Eurostat',
                examples: ['Grocery prices', 'Housing rent', 'Fuel costs']
            },
            {
                id: 'ppi', name: 'Producer Price Index (PPI)',
                description: 'Average changes in selling prices received by producers',
                fullDefinition: 'Measures the average changes in prices received by domestic producers for their output.',
                metricKey: 'PPI',
                unit: '% YoY',
                dataSource: 'Bureau of Labor Statistics, National Statistics',
                examples: ['Wholesale goods', 'Raw material costs']
            },
            {
                id: 'import-prices', name: 'Import Price Index',
                description: 'Changes in the prices of imported goods',
                fullDefinition: 'Measures the changes in the prices of goods and services purchased from abroad.',
                metricKey: 'Import Price Index',
                unit: 'Index',
                dataSource: 'Customs Authorities, National Statistics',
                examples: ['Imported oil prices', 'Foreign machinery costs']
            }
        ]
    },
    {
        id: 'jobs-incomes',
        title: 'Jobs and Incomes',
        description: 'Labour market health and household income viability',
        icon: 'Users',
        color: 'red',
        tags: ['UNEMPLOYMENT', 'WAGE GROWTH', 'DISPOSABLE INCOME'],
        indicators: [
            {
                id: 'unemployment', name: 'Unemployment Rate',
                description: 'Percentage of labor force looking for work',
                fullDefinition: 'The percentage of the total labor force that is jobless and actively seeking employment.',
                metricKey: 'Unemployment Rate',
                unit: '%',
                dataSource: 'International Labour Organization (ILO)',
                examples: ['Youth unemployment', 'Long-term joblessness']
            },
            {
                id: 'wage-growth', name: 'Wage Growth',
                description: 'Rate of change in worker compensation',
                fullDefinition: 'Measures the year-over-year increase in average hourly or weekly earnings for workers.',
                metricKey: 'Wage Growth',
                unit: '% YoY',
                dataSource: 'National Labor Departments',
                examples: ['Minimum wage increases', 'Average salary hikes']
            },
            {
                id: 'real-income', name: 'Real Disposable Income',
                description: 'Income after taxes and inflation',
                fullDefinition: 'The amount of money that households have available for spending and saving after income taxes have been accounted for, adjusted for inflation.',
                metricKey: 'Real Disposable Income',
                unit: '% YoY Growth',
                dataSource: 'Bureau of Economic Analysis',
                examples: ['Household purchasing power', 'Savings rates']
            },
            {
                id: 'gdp-per-capita', name: 'GDP per Capita',
                description: 'Economic output per person',
                fullDefinition: 'A metric that breaks down a country\'s economic output per person and is calculated by dividing the GDP of a country by its population.',
                metricKey: 'GDP per Capita',
                unit: 'USD',
                dataSource: 'World Bank',
                examples: ['Average individual wealth', 'Standard of living indicator']
            }
        ]
    },
    {
        id: 'global-trade',
        title: 'Global Trade & Currency',
        description: 'External flows, currency moves, and foreign demand',
        icon: 'Globe',
        color: 'emerald', // Using an alternative tailwind color for the 4th tab
        tags: ['CURRENT ACCOUNT', 'TRADE BALANCE', 'EXCHANGE RATE'],
        indicators: [
            {
                id: 'current-account', name: 'Current Account (% of GDP)',
                description: 'Balance of trade, net income, and direct transfers',
                fullDefinition: 'A record of a country\'s international transactions with the rest of the world. A positive balance indicates the nation is a net lender to the rest of the world.',
                metricKey: 'Current Account',
                unit: '% of GDP',
                dataSource: 'IMF, World Bank',
                examples: ['Export revenues', 'Foreign aid', 'Remittances']
            },
            {
                id: 'trade-balance', name: 'Trade Balance',
                description: 'Difference between value of exports and imports',
                fullDefinition: 'The calculation of a country\'s exports minus its imports. A positive number indicates a trade surplus, while a negative number indicates a trade deficit.',
                metricKey: 'Trade Balance',
                unit: '% of GDP',
                dataSource: 'Customs and Border Protection, WTO',
                examples: ['Manufacturing exports', 'Oil imports']
            },
            {
                id: 'exchange-rate', name: 'Exchange Rate',
                description: 'Value of local currency against USD',
                fullDefinition: 'The rate at which one national currency will be exchanged for another. It is also regarded as the value of one country\'s currency in relation to another currency.',
                metricKey: 'Exchange Rate',
                unit: 'vs USD',
                dataSource: 'Central Banks, Forex Markets',
                examples: ['Currency depreciation', 'Import purchasing power']
            },
            {
                id: 'neer', name: 'Nominal Effective Exchange Rate (NEER)',
                description: 'Unadjusted weighted average value of a currency',
                fullDefinition: 'The unadjusted weighted average rate at which one country\'s currency exchanges for a basket of multiple foreign currencies.',
                metricKey: 'NEER',
                unit: 'Index',
                dataSource: 'Bank for International Settlements (BIS)',
                examples: ['Broad currency strength', 'Export competitiveness']
            },
            {
                id: 'total-wealth', name: 'Total Wealth (GDP)',
                description: 'Total economic output in trillion USD',
                fullDefinition: 'Gross Domestic Product (GDP) represents the total value of all goods and services produced over a specific time period.',
                metricKey: 'GDP',
                unit: 'Trillion USD',
                dataSource: 'World Bank Open Data',
                examples: ['Total national output']
            }
        ]
    }
];
