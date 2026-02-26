import React, { useMemo } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Tooltip } from 'recharts';
import type { EconomicData, Country, Metric } from '../data/economics';
import type { Perspective } from '../types/perspective';

interface RadialPerspectiveChartProps {
    perspective: Perspective;
    data: EconomicData[]; // Should be data for 2025
    selectedCountries: Country[]; // We will use the first selected country
}

export const RadialPerspectiveChart: React.FC<RadialPerspectiveChartProps> = ({ perspective, data, selectedCountries }) => {

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    const allChartData = useMemo(() => {
        const indicators = perspective.indicators;

        const normalizationMap: Record<string, { min: number, max: number, reverse: boolean }> = {
            'GDP': { min: Math.min(...data.map(d => d.gdp)), max: Math.max(...data.map(d => d.gdp)), reverse: false },
            'GDP per Capita': { min: Math.min(...data.map(d => d.gdpPerCapita)), max: Math.max(...data.map(d => d.gdpPerCapita)), reverse: false },
            'Growth Rate': { min: Math.min(...data.map(d => d.growthRate)), max: Math.max(...data.map(d => d.growthRate)), reverse: false },
            'PMI': { min: 40, max: 60, reverse: false },
            'IIP': { min: Math.min(...data.map(d => d.iip)), max: Math.max(...data.map(d => d.iip)), reverse: false },
            'Retail Sales': { min: Math.min(...data.map(d => d.retailSales)), max: Math.max(...data.map(d => d.retailSales)), reverse: false },
            'CPI': { min: Math.min(...data.map(d => d.cpi)), max: Math.max(...data.map(d => d.cpi)), reverse: true },
            'PPI': { min: Math.min(...data.map(d => d.ppi)), max: Math.max(...data.map(d => d.ppi)), reverse: true },
            'Import Price Index': { min: Math.min(...data.map(d => d.importPriceIndex)), max: Math.max(...data.map(d => d.importPriceIndex)), reverse: true },
            'Unemployment Rate': { min: Math.min(...data.map(d => d.unemployment)), max: Math.max(...data.map(d => d.unemployment)), reverse: true },
            'Wage Growth': { min: Math.min(...data.map(d => d.wageGrowth)), max: Math.max(...data.map(d => d.wageGrowth)), reverse: false },
            'Real Disposable Income': { min: Math.min(...data.map(d => d.realDisposableIncome)), max: Math.max(...data.map(d => d.realDisposableIncome)), reverse: false },
            'Current Account': { min: Math.min(...data.map(d => d.currentAccount)), max: Math.max(...data.map(d => d.currentAccount)), reverse: false },
            'Trade Balance': { min: Math.min(...data.map(d => d.tradeBalance)), max: Math.max(...data.map(d => d.tradeBalance)), reverse: false },
            'Exchange Rate': { min: Math.min(...data.map(d => d.exchangeRate)), max: Math.max(...data.map(d => d.exchangeRate)), reverse: false },
            'NEER': { min: Math.min(...data.map(d => d.neer)), max: Math.max(...data.map(d => d.neer)), reverse: false },
        };

        return selectedCountries.map(country => {
            const countryData = data.find(d => d.country === country);
            if (!countryData) return { country, chartData: [] };


            const chartData = indicators.map((ind, index) => {
                const norm = normalizationMap[ind.metricKey];

                const keyMap: Record<Metric, string> = {
                    'GDP': 'gdp',
                    'GDP per Capita': 'gdpPerCapita',
                    'Growth Rate': 'growthRate',
                    'PMI': 'pmi',
                    'IIP': 'iip',
                    'Retail Sales': 'retailSales',
                    'CPI': 'cpi',
                    'PPI': 'ppi',
                    'Import Price Index': 'importPriceIndex',
                    'Unemployment Rate': 'unemployment',
                    'Wage Growth': 'wageGrowth',
                    'Real Disposable Income': 'realDisposableIncome',
                    'Current Account': 'currentAccount',
                    'Trade Balance': 'tradeBalance',
                    'Exchange Rate': 'exchangeRate',
                    'NEER': 'neer'
                };
                const key = keyMap[ind.metricKey];
                const rawValue = (countryData as any)[key] as number || 0;

                let score = 0;
                if (norm && norm.max !== norm.min) {
                    score = (rawValue - norm.min) / (norm.max - norm.min);
                    if (norm.reverse) score = 1 - score;
                } else {
                    score = 0.5;
                }

                return {
                    name: ind.name,
                    value: Math.round(score * 100),
                    rawValue: rawValue,
                    fill: colors[index % colors.length]
                };
            }).sort((a, b) => b.value - a.value);

            return { country, chartData };
        });
    }, [perspective, data, selectedCountries]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-4">
            <div className="w-full flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center auto-rows-fr">
                {allChartData.map(({ country, chartData }) => (
                    <div key={country} className="flex flex-col items-center justify-center h-full min-h-[220px]">
                        <ResponsiveContainer width="100%" height="80%">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="15%"
                                outerRadius="90%"
                                barSize={12}
                                data={chartData as any}
                                startAngle={180}
                                endAngle={-180}
                            >
                                <PolarAngleAxis
                                    type="number"
                                    domain={[0, 100]}
                                    angleAxisId={0}
                                    tick={false}
                                />
                                <RadialBar
                                    background={{ fill: document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                    dataKey="value"
                                    cornerRadius={10}
                                />
                                <Tooltip
                                    formatter={(value: any, name: any, props: any) => {
                                        return [`Score: ${value} (Raw: ${props?.payload?.rawValue})`, name] as any;
                                    }}
                                    contentStyle={{
                                        backgroundColor: document.documentElement.classList.contains('dark') ? 'rgba(0,0,0,0.8)' : 'rgba(245,242,233,0.95)',
                                        backdropFilter: 'blur(4px)',
                                        border: `1px solid ${document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.1)' : 'rgba(67, 52, 34, 0.1)'}`,
                                        borderRadius: '8px',
                                        fontSize: '10px',
                                        color: document.documentElement.classList.contains('dark') ? '#fff' : '#433422'
                                    }}
                                    itemStyle={{ color: document.documentElement.classList.contains('dark') ? '#fff' : '#433422' }}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#8c7b60] dark:text-slate-400">
                            {country}
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-[#433422]/10 dark:border-white/[0.05] w-full">
                {perspective.indicators.map((ind, i) => (
                    <div key={ind.id} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#433422]/70 dark:text-slate-400">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[i % colors.length] }}></div>
                        {ind.name}
                    </div>
                ))}
            </div>
        </div>
    );
};
