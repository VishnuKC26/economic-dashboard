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

    if (selectedMetric === 'GDP') {
        insight += `Its massive economic scale dominates the group, while smaller economies like ${bottom.country} (${formatValue(bottom, selectedMetric)}) must focus on niche growth. `;
    } else if (selectedMetric === 'Inflation') {
        insight += top.inflation > 4
            ? `High inflation (>4%) here signals purchasing power erosion, contrasting with ${bottom.country}'s lower rate of ${bottom.inflation}%. `
            : `The group maintains stable prices, with ${bottom.country} seeing the lowest inflation at ${bottom.inflation}%. `;
    } else if (selectedMetric === 'Fiscal Deficit') {
        insight += `A high deficit of ${top.fiscalDeficit}% suggests aggressive spending, whereas ${bottom.country} (${bottom.fiscalDeficit}%) shows fiscal prudence. `;
    } else if (selectedMetric === 'Unemployment') {
        insight += `${bottom.country} outperforms with only ${bottom.unemployment}% unemployment, indicating near-full employment compared to ${top.country}'s ${top.unemployment}%. `;
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
    switch (metric) {
        case 'GDP': return d.gdp;
        case 'Inflation': return d.inflation;
        case 'Fiscal Deficit': return d.fiscalDeficit;
        case 'Unemployment': return d.unemployment;
    }
};

const formatValue = (d: EconomicData, metric: Metric): string => {
    switch (metric) {
        case 'GDP': return `$${d.gdp}T`;
        case 'Inflation': return `${d.inflation}%`;
        case 'Fiscal Deficit': return `${d.fiscalDeficit}%`;
        case 'Unemployment': return `${d.unemployment}%`;
    }
};
