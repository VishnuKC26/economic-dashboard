import type { Metric } from '../data/economics';

export interface Indicator {
    id: string;
    name: string;
    description: string;
    fullDefinition: string;
    metricKey: Metric;
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
        id: 'living-standards',
        title: 'Living Standards',
        description: 'How comfortably do people live?',
        icon: 'Home',
        color: 'indigo', // Muted per layout
        tags: ['GDP PER PERSON', 'PURCHASING POWER', 'INFLATION'],
        indicators: [
            {
                id: 'gdp', name: 'Total Wealth (GDP)',
                description: 'Total economic output in trillion USD',
                fullDefinition: 'Gross Domestic Product (GDP) is a primary indicator of a country\'s economic strength, representing the total value of all goods and services produced over a specific time period.',
                metricKey: 'GDP',
                dataSource: 'World Bank Open Data & International Monetary Fund (IMF)',
                examples: ['Manufacturing output', 'Service sector revenue', 'Government spending']
            },
            {
                id: 'growth-rate', name: 'GDP Growth Rate',
                description: 'Annual percentage growth of GDP',
                fullDefinition: 'Measures the rate at which a country\'s economy is growing or shrinking from year to year, adjusted for inflation.',
                metricKey: 'Growth Rate',
                dataSource: 'OECD Data & World Bank National Accounts',
                examples: ['Quarterly GDP reports', 'Annual economic forecasts']
            },
            {
                id: 'purchasing-power', name: 'Price Stability',
                description: 'Consumer price index changes',
                fullDefinition: 'Inflation affects the purchasing power of money. Price stability is achieved when inflation is low and predictable.',
                metricKey: 'Inflation',
                dataSource: 'Bureau of Labor Statistics (BLS) & Eurostat',
                examples: ['Grocery price changes', 'Fuel cost fluctuations', 'Housing rent increases']
            }
        ]
    },
    {
        id: 'job-market',
        title: 'Job Market',
        description: 'How healthy is the employment landscape?',
        icon: 'Briefcase',
        color: 'amber',
        tags: ['UNEMPLOYMENT RATE', 'JOB AVAILABILITY'],
        indicators: [
            {
                id: 'unemployment', name: 'Unemployment Rate',
                description: 'Percentage of labor force looking for work',
                fullDefinition: 'The percentage of the total labor force that is jobless and actively seeking employment.',
                metricKey: 'Unemployment',
                dataSource: 'International Labour Organization (ILO)',
                examples: ['Youth unemployment', 'Long-term joblessness', 'Labor participation rates']
            }
        ]
    },
    {
        id: 'fiscal-health',
        title: 'Fiscal Health',
        description: 'Is the nation\'s budget sustainable?',
        icon: 'Scale',
        color: 'red',
        tags: ['FISCAL DEFICIT', 'GOVERNMENT DEBT CONTEXT'],
        indicators: [
            {
                id: 'deficit', name: 'Fiscal Deficit',
                description: 'Government spending vs revenue as % of GDP',
                fullDefinition: 'The difference between total government expenditure and its total receipts (excluding borrowing). It indicates the extent to which a government is living beyond its means.',
                metricKey: 'Fiscal Deficit',
                dataSource: 'IMF Government Finance Statistics (GFS)',
                examples: ['Budget shortfalls', 'Increased national borrowing', 'Public infrastructure spending']
            }
        ]
    }
];
