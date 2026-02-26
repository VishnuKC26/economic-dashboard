import type { EconomicData, Country, Metric } from '../data/economics';

export const generateInsight = (
    selectedCountries: Country[],
    selectedMetric: Metric,
    data: EconomicData[]
): string => {
    if (selectedCountries.length === 0) return "Please select at least one country to generate an analysis.";

    const relevantData = data.filter(d => selectedCountries.includes(d.country) && d.year === 2025);

    if (relevantData.length === 0) return "No data available for the selected parameters.";

    // Sort data for ranking
    const sorted = [...relevantData].sort((a, b) => {
        const valA = getValue(a, selectedMetric);
        const valB = getValue(b, selectedMetric);
        return valB - valA; // Descending order
    });

    const top = sorted[0];
    const bottom = sorted[sorted.length - 1];
    // Concise Insight Generation
    let insight = `In 2025, ${top.country} leads with a ${selectedMetric} of ${formatValue(top, selectedMetric)}. `;

    if (top.country !== bottom.country) {
        insight += `In contrast, ${bottom.country} records ${formatValue(bottom, selectedMetric)}. `;
    }

    const topPrev = data.find(d => d.country === top.country && d.year === 2023);
    if (topPrev) {
        const diff = getValue(top, selectedMetric) - getValue(topPrev, selectedMetric);
        const trend = diff > 0 ? "increased" : "decreased";
        insight += `Notably, ${top.country} has ${trend} its ${selectedMetric} since 2023, reflecting its evolving policy impact.`;
    }

    return insight;
};

const getValue = (d: EconomicData, metric: Metric): number => {
    const key = metric === 'GDP' ? 'gdp' : metric === 'GDP per Capita' ? 'gdpPerCapita' : metric.charAt(0).toLowerCase() + metric.slice(1).replace(/ /g, '');
    return d[key as keyof EconomicData] as number || 0;
};

const formatValue = (d: EconomicData, metric: Metric): string => {
    const val = getValue(d, metric);
    switch (metric) {
        case 'GDP': return `$${val}T`;
        case 'GDP per Capita': return `$${val.toLocaleString()}`;
        case 'Growth Rate': return `${val}%`;
        case 'CPI':
        case 'PPI':
        case 'Unemployment Rate':
        case 'Wage Growth':
        case 'Real Disposable Income':
        case 'Current Account': return `${val}%`;
        case 'Trade Balance': return `$${val}B`;
        case 'Exchange Rate': return `${val}`;
        case 'PMI':
        case 'IIP':
        case 'Import Price Index':
        case 'NEER': return `${val}`;
        default: return `${val}`;
    }
};
