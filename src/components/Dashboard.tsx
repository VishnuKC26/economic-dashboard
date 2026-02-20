import React, { useState, useMemo } from 'react';
import { Layout } from './Layout';
import { LeaderboardCard } from './LeaderboardCard';
import { AICard } from './AICard';
import { WorldMap } from './WorldMap';
import { economicData, getCountryColor } from '../data/economics';
import type { Country, Metric } from '../data/economics';
import { generateInsight } from '../utils/aiLogic';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';
import { Filter, BarChart2, LineChart as LineChartIcon, Activity } from 'lucide-react';

const COUNTRIES: Country[] = ['India', 'China', 'Japan', 'USA', 'Germany'];
const METRICS: Metric[] = ['GDP', 'Inflation', 'Fiscal Deficit', 'Unemployment', 'Growth Rate'];
type ChartType = 'area' | 'line' | 'bar';

export const Dashboard: React.FC = () => {
    const [selectedCountries, setSelectedCountries] = useState<Country[]>(['India', 'USA', 'China']);
    const [selectedMetric, setSelectedMetric] = useState<Metric>('GDP');
    const [chartType, setChartType] = useState<ChartType>('area');

    const toggleCountry = (c: Country) => {
        if (selectedCountries.includes(c)) {
            if (selectedCountries.length > 1) setSelectedCountries(prev => prev.filter(item => item !== c));
        } else {
            if (selectedCountries.length < 5) setSelectedCountries(prev => [...prev, c]);
        }
    };

    const chartData = useMemo(() => {
        const years = [2023, 2024, 2025];
        return years.map(year => {
            const entry: any = { year };
            selectedCountries.forEach(country => {
                const dataPoint = economicData.find(d => d.country === country && d.year === year);
                if (dataPoint) {
                    switch (selectedMetric) {
                        case 'GDP': entry[country] = dataPoint.gdp; break;
                        case 'Inflation': entry[country] = dataPoint.inflation; break;
                        case 'Fiscal Deficit': entry[country] = dataPoint.fiscalDeficit; break;
                        case 'Unemployment': entry[country] = dataPoint.unemployment; break;
                        case 'Growth Rate': entry[country] = dataPoint.growthRate; break;
                    }
                }
            });
            return entry;
        });
    }, [selectedCountries, selectedMetric]);

    const aiInsight = useMemo(() => generateInsight(selectedCountries, selectedMetric, economicData), [selectedCountries, selectedMetric]);

    const renderChart = () => {
        const commonProps = {
            data: chartData,
            margin: { top: 10, right: 30, left: 0, bottom: 0 }
        };

        if (chartType === 'line') {
            return (
                <LineChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', color: '#fff' }} />
                    {selectedCountries.map(c => (
                        <Line key={c} type="monotone" dataKey={c} stroke={getCountryColor(c)} strokeWidth={3} dot={{ r: 4 }} />
                    ))}
                </LineChart>
            )
        }
        if (chartType === 'bar') {
            return (
                <BarChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', color: '#fff' }} />
                    {selectedCountries.map(c => (
                        <Bar key={c} dataKey={c} fill={getCountryColor(c)} />
                    ))}
                </BarChart>
            )
        }
        // Default Area
        return (
            <AreaChart {...commonProps}>
                <defs>
                    {selectedCountries.map(c => (
                        <linearGradient key={c} id={`color${c}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={getCountryColor(c)} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={getCountryColor(c)} stopOpacity={0} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', color: '#fff' }} />
                {selectedCountries.map(c => (
                    <Area key={c} type="monotone" dataKey={c} stroke={getCountryColor(c)} fillOpacity={1} fill={`url(#color${c})`} strokeWidth={3} />
                ))}
            </AreaChart>
        );
    }

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Column: Controls & AI */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Global Leaderboard (Top Left) */}
                    <LeaderboardCard
                        metric={selectedMetric}
                        data={economicData.filter(d => d.year === 2025)}
                    />

                    {/* Controls */}
                    <div className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-6 text-indigo-500">
                            <Filter className="w-5 h-5" />
                            <h2 className="font-bold">Control Panel</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider">Metrics</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {METRICS.map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setSelectedMetric(m)}
                                            className={`px-3 py-2 text-xs rounded-lg transition-all border font-medium ${selectedMetric === m ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider">Countries</label>
                                <div className="flex flex-wrap gap-2">
                                    {COUNTRIES.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => toggleCountry(c)}
                                            className={`px-3 py-1.5 text-xs rounded-full border transition-all ${selectedCountries.includes(c) ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500 font-semibold' : 'bg-transparent border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <AICard insight={aiInsight} />
                </div>

                {/* Right Column: Visualization */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Chart Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-xl font-bold dark:text-slate-200 text-slate-800">{selectedMetric} Trends</h2>
                                <p className="text-sm text-slate-500">Comparative view over time (2023-2025)</p>
                            </div>

                            <div className="flex bg-slate-100 dark:bg-slate-800/80 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                                <button onClick={() => setChartType('area')} className={`p-2 rounded-md ${chartType === 'area' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}><Activity className="w-4 h-4" /></button>
                                <button onClick={() => setChartType('line')} className={`p-2 rounded-md ${chartType === 'line' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}><LineChartIcon className="w-4 h-4" /></button>
                                <button onClick={() => setChartType('bar')} className={`p-2 rounded-md ${chartType === 'bar' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}><BarChart2 className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                {renderChart()}
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm"
                    >
                        <div className="mb-4">
                            <h2 className="text-xl font-bold dark:text-slate-200 text-slate-800">Global Heatmap (2025)</h2>
                            <p className="text-sm text-slate-500">Geographic distribution of {selectedMetric}</p>
                        </div>
                        <WorldMap data={economicData} selectedMetric={selectedMetric} />
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};
