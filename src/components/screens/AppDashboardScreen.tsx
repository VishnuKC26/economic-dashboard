import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Perspective, Indicator } from '../../types/perspective';
import { PERSPECTIVES } from '../../types/perspective';
import { Layout } from '../Layout';
import { LeaderboardCard } from '../LeaderboardCard';
import { AICard } from '../AICard';
import { economicData, getCountryColor } from '../../data/economics';
import type { Country, Metric } from '../../data/economics';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, LineChart, Line, Legend
} from 'recharts';
import { BarChart2, LineChart as LineChartIcon, Activity, Check, LayoutGrid, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface AppDashboardScreenProps {
    perspective: Perspective;
    onBack: () => void;
    onSwitchPerspective: (p: Perspective) => void;
    isDark: boolean;
    toggleTheme: () => void;
}

const COUNTRIES: Country[] = ['India', 'China', 'Japan', 'USA', 'Germany'];
type ChartType = 'area' | 'line' | 'bar';

export const AppDashboardScreen: React.FC<AppDashboardScreenProps> = ({ perspective, onSwitchPerspective, isDark, toggleTheme }) => {
    const [selectedCountries, setSelectedCountries] = useState<Country[]>(['USA', 'India']);
    const [selectedIndicator, setSelectedIndicator] = useState<Indicator>(perspective.indicators[0]);
    const [chartType, setChartType] = useState<ChartType>('line');
    const [isPerspectiveOpen, setIsPerspectiveOpen] = useState(false);
    const [isAboutExpanded, setIsAboutExpanded] = useState(false);

    const toggleCountry = (c: Country) => {
        if (selectedCountries.includes(c)) {
            if (selectedCountries.length > 1) setSelectedCountries(prev => prev.filter(item => item !== c));
        } else {
            if (selectedCountries.length < 5) setSelectedCountries(prev => [...prev, c]);
        }
    };

    const themeClasses = {
        indigo: { text: 'text-blue-500', border: 'border-blue-500', shadow: 'shadow-blue-600/20', text400: 'text-blue-400', bg400: 'bg-blue-400', hexRGBAHead: isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.05)' },
        red: { text: 'text-red-500', border: 'border-red-500', shadow: 'shadow-red-600/20', text400: 'text-red-400', bg400: 'bg-red-400', hexRGBAHead: isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.05)' },
        emerald: { text: 'text-emerald-500', border: 'border-emerald-500', shadow: 'shadow-emerald-600/20', text400: 'text-emerald-400', bg400: 'bg-emerald-400', hexRGBAHead: isDark ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.05)' },
        amber: { text: 'text-amber-500', border: 'border-amber-500', shadow: 'shadow-amber-600/20', text400: 'text-amber-400', bg400: 'bg-amber-400', hexRGBAHead: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.05)' },
    };
    const t = themeClasses[perspective.color as keyof typeof themeClasses] || themeClasses.amber;

    const getRawValue = (d: any, m: Metric) => {
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
        const key = keyMap[m];
        return d[key] as number || 0;
    };

    const getChartData = () => {
        const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
        return years.map(year => {
            const dataPoint: any = { year };
            selectedCountries.forEach(country => {
                const countryData = economicData.find(d => d.country === country && d.year === year);
                if (countryData) {
                    dataPoint[country] = getRawValue(countryData, selectedIndicator.metricKey);
                }
            });
            return dataPoint;
        });
    };

    const getInsightText = () => {
        const indiaData = economicData.find(d => d.country === 'India' && d.year === 2025);
        const chinaData = economicData.find(d => d.country === 'China' && d.year === 2025);

        if (perspective.id === 'growth') {
            return `India represents the highest potential in the world stage with ${indiaData?.growthRate}% growth, while China faces a slower trajectory at ${chinaData?.growthRate}%. The G7 nations, led by the USA, are maintaining stability but struggle to match the velocity of emerging markets. Strategic pivot towards Southeast Asian corridors is recommended.`;
        } else if (perspective.id === 'poverty') {
            return `Poverty alleviation remains a critical challenge. India has shown remarkable progress in reducing extreme poverty, though wealth inequality persists. The USA maintains high living standards but faces rising costs for essential services. Targeted social safety nets and education reform are key levers for parity.`;
        } else {
            return `The Global South is emerging as the primary engine for consumer demand. While Western economies deal with aging demographics, countries like India and China are investing heavily in domestic infrastructure and technology sectors. Expect a significant shift in GDP contribution by 2030 as middle-class expansion accelerates.`;
        }
    };

    const renderChart = () => {
        const data = getChartData();

        if (chartType === 'line') {
            return (
                <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false} />
                    <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <RechartsTooltip formatter={(value: number | undefined) => [`${value ?? 0} ${selectedIndicator.unit || ''}`, '']} labelStyle={{ color: '#0f172a' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    {selectedCountries.map(c => (
                        <Line key={c} type="monotone" dataKey={c} stroke={getCountryColor(c)} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    ))}
                </LineChart>
            );
        }

        if (chartType === 'bar') {
            return (
                <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false} />
                    <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <RechartsTooltip formatter={(value: number | undefined) => [`${value ?? 0} ${selectedIndicator.unit || ''}`, '']} labelStyle={{ color: '#0f172a' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    {selectedCountries.map(c => (
                        <Bar key={c} dataKey={c} fill={getCountryColor(c)} radius={[4, 4, 0, 0]} />
                    ))}
                </BarChart>
            );
        }

        return (
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                <defs>
                    {selectedCountries.map(c => (
                        <linearGradient key={c} id={`color${c}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={getCountryColor(c)} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={getCountryColor(c)} stopOpacity={0} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false} />
                <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <RechartsTooltip formatter={(value: number | undefined) => [`${value ?? 0} ${selectedIndicator.unit || ''}`, '']} labelStyle={{ color: '#0f172a' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                {selectedCountries.map(c => (
                    <Area key={c} type="monotone" dataKey={c} stroke={getCountryColor(c)} fillOpacity={1} fill={`url(#color${c})`} strokeWidth={2} />
                ))}
            </AreaChart>
        );

    }

    return (
        <Layout accentColor={perspective.color} perspectiveName={perspective.title} isDark={isDark} toggleTheme={toggleTheme}>
            <div className="flex flex-col gap-6 max-w-[1600px] mx-auto pb-10 px-4 md:px-8">
                <div className="group sticky top-14 z-40 py-4 md:py-5 px-8 -mx-8 transition-all duration-500 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-[#433422]/5 dark:border-white/[0.05] shadow-2xl overflow-hidden max-h-[88px] hover:max-h-[500px] cursor-pointer hover:bg-white/60 dark:hover:bg-white/[0.04] md:rounded-xl">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12 max-w-[1600px] mx-auto">
                        <div className="flex flex-col gap-4 flex-shrink-0">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8c7b60] dark:text-slate-500">Global Markets</span>
                            <div className="flex flex-wrap gap-2">
                                {COUNTRIES.map(c => {
                                    const isSelected = selectedCountries.includes(c);
                                    return (
                                        <button
                                            key={c}
                                            onClick={(e) => { e.stopPropagation(); toggleCountry(c); }}
                                            className={clsx(
                                                "px-5 py-2 text-[10px] rounded-lg font-black transition-all border uppercase tracking-widest whitespace-nowrap",
                                                isSelected ?
                                                    `bg-transparent border-2 ${t.border} ${t.text} shadow-lg ${t.shadow}` :
                                                    'bg-black/5 dark:bg-white/[0.03] border-[#433422]/10 dark:border-white/[0.05] text-[#433422]/60 dark:text-slate-500 hover:text-[#433422] dark:hover:text-slate-200 shadow-sm'
                                            )}
                                        >
                                            {c}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-[#433422]/10 dark:bg-white/[0.05]"></div>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8c7b60] dark:text-slate-500">Active Indicators</span>
                                <span className="text-[10px] text-slate-500 md:hidden opacity-50">(Hover to expand)</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {perspective.indicators.map(ind => {
                                    const isSelected = selectedIndicator.id === ind.id;

                                    return (
                                        <button
                                            key={ind.id}
                                            onClick={(e) => { e.stopPropagation(); setSelectedIndicator(ind); }}
                                            className={clsx(
                                                "px-5 py-2 text-[10px] rounded-lg font-black transition-all border uppercase tracking-widest whitespace-nowrap",
                                                isSelected ?
                                                    `bg-transparent border-2 ${t.border} ${t.text} shadow-lg ${t.shadow}` :
                                                    'bg-black/5 dark:bg-white/[0.03] border-[#433422]/10 dark:border-white/[0.05] text-[#433422]/60 dark:text-slate-500 hover:text-[#433422] dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/[0.08] shadow-sm'
                                            )}
                                        >
                                            {ind.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <LeaderboardCard
                            metric={selectedIndicator.metricKey}
                            data={economicData.filter(d => d.year === 2025)}
                            color={perspective.color}
                        />

                        <div className="p-5 md:p-6 rounded-lg bg-white/40 dark:bg-white/[0.03] border border-[#433422]/10 dark:border-slate-800 shadow-sm transition-all duration-500">
                            <div className={`flex items-center gap-3 mb-3 ${t.text400}`}>
                                <Activity className="w-3.5 h-3.5" />
                                <h3 className="text-[9px] font-black uppercase tracking-widest">About this indicator</h3>
                            </div>
                            <h4 className="text-base md:text-lg font-bold mb-3 leading-tight">{selectedIndicator.description}</h4>

                            <AnimatePresence>
                                {isAboutExpanded && (
                                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                            className="w-full max-w-2xl bg-[#f5f2e9] dark:bg-black border border-[#433422]/10 dark:border-white/10 rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[80vh] mt-12"
                                        >
                                            <div
                                                className="p-6 md:p-8 border-b border-[#433422]/10 dark:border-white/10 flex justify-between items-center"
                                                style={{ backgroundColor: t.hexRGBAHead }}
                                            >
                                                <div className={`flex items-center gap-3 ${t.text400}`}>
                                                    <Activity className="w-5 h-5" />
                                                    <h3 className="text-sm font-black uppercase tracking-widest">{selectedIndicator.name}</h3>
                                                </div>
                                                <button onClick={() => setIsAboutExpanded(false)} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 transition-colors">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 1L1 13M1 1l12 12" /></svg>
                                                </button>
                                            </div>
                                            <div className="p-6 md:p-8 overflow-y-auto space-y-8 custom-scrollbar">
                                                <div>
                                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${t.text400}`}>Definition</p>
                                                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{selectedIndicator.fullDefinition}</p>
                                                </div>
                                                {selectedIndicator.dataSource && (
                                                    <div>
                                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${t.text400}`}>Data Source</p>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium italic">{selectedIndicator.dataSource}</p>
                                                    </div>
                                                )}
                                                {selectedIndicator.examples && (
                                                    <div>
                                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${t.text400}`}>Examples</p>
                                                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 gap-3 flex flex-col pt-1">
                                                            {selectedIndicator.examples.map((ex, i) => (
                                                                <li key={i}>{ex}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                <div className="pt-6 mt-6 border-t border-[#433422]/10 dark:border-white/10 space-y-6">
                                                    <div>
                                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${t.text400}`}>Historical Context (Placeholder)</p>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                            Historically, this indicator has been a primary metric used by central banks and global financial institutions to gauge the underlying momentum of economic cycles. During periods of rapid expansion, anomalous spikes in the dataset often precede inflationary pressures or subsequent monetary tightening. Conversely, prolonged stagnation typically triggers quantitative easing measures. Analysts continue to monitor minute deviances from the 10-year rolling average as an early warning system for broader market recessions.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${t.text400}`}>Methodology & Calculation (Placeholder)</p>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                            The underlying data aggregation relies on a stratified random sampling technique across thousands of municipal and corporate reporting nodes. Values are seasonally adjusted using the X-13ARIMA-SEATS algorithm to remove recurrent intra-year volatility patterns. It is important to note that the raw indices are subject to retroactive revisions up to three quarters post-publication, meaning preliminary figures should be treated with statistical caution. The baseline index value is typically normalized to 100 based on the reference year 2015.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setIsAboutExpanded(true)}
                                className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform mt-4 ${t.text400}`}
                            >
                                See full definition & examples
                                <ArrowRight className="w-3 h-3 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-9 flex flex-col gap-4">
                        <div className="p-4 md:p-8 rounded-lg bg-white/40 dark:bg-white/[0.02] border border-[#433422]/10 dark:border-white/[0.05] shadow-sm transition-all duration-500">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className={`w-12 h-px ${t.bg400}`}></div>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${t.text400}`}>
                                            {selectedIndicator.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex p-1 rounded-lg bg-black/5 dark:bg-white/[0.03] border border-[#433422]/10 dark:border-white/[0.05]">
                                        {([
                                            { id: 'area', icon: Activity },
                                            { id: 'line', icon: LineChartIcon },
                                            { id: 'bar', icon: BarChart2 }
                                        ] as const).map(({ id, icon: Icon }) => {
                                            const isSelected = chartType === id;
                                            return (
                                                <button
                                                    key={id}
                                                    onClick={() => setChartType(id)}
                                                    className={clsx(
                                                        "p-2 rounded-md transition-all",
                                                        isSelected ? "bg-[#433422] dark:bg-white/10 text-white dark:text-white shadow-lg" : "text-[#8c7b60] dark:text-slate-500 hover:text-[#433422] dark:hover:text-white"
                                                    )}
                                                >
                                                    <Icon className="w-3.5 h-3.5" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mt-2 transition-all h-[280px] md:h-[320px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    {renderChart()}
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <AICard insight={getInsightText() as any} color={perspective.color} />
                    </div>
                </div>

                <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-4 items-start">
                    <AnimatePresence>
                        {isPerspectiveOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-6 rounded-lg w-[260px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]"
                            >
                                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Switch Perspective</h5>
                                <div className="flex flex-col gap-4">
                                    {PERSPECTIVES.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => {
                                                onSwitchPerspective(p);
                                                setIsPerspectiveOpen(false);
                                            }}
                                            className="flex items-center justify-between group p-2 rounded-lg hover:bg-white/[0.05] transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${p.color === 'red' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : p.color === 'amber' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : p.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(74,114,255,0.4)]'}`}></div>
                                                <span className={`text-sm font-bold ${perspective.id === p.id ? 'text-[#433422] dark:text-slate-100' : 'text-[#8c7b60] dark:text-slate-400 group-hover:text-[#433422] dark:group-hover:text-slate-200'}`}>{p.title}</span>
                                            </div>
                                            {perspective.id === p.id && <Check className={`w-4 h-4 ${t.text}`} />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsPerspectiveOpen(!isPerspectiveOpen)}
                        className={`w-16 h-16 rounded-xl text-white flex items-center justify-center shadow-2xl transition-all hover:scale-105 backdrop-blur-xl border border-white/20 dark:border-white/[0.1] ${perspective.color === 'red' ? 'bg-red-600/80 dark:bg-red-600/30 hover:bg-red-500 dark:hover:bg-red-500/40 shadow-red-600/20' :
                            perspective.color === 'amber' ? 'bg-amber-600/80 dark:bg-amber-600/30 hover:bg-amber-500 dark:hover:bg-amber-500/40 shadow-amber-600/20' :
                                perspective.color === 'emerald' ? 'bg-emerald-600/80 dark:bg-emerald-600/30 hover:bg-emerald-500 dark:hover:bg-emerald-500/40 shadow-emerald-600/20' :
                                    'bg-blue-600/80 dark:bg-blue-600/30 hover:bg-blue-500 dark:hover:bg-blue-500/40 shadow-blue-600/20'
                            }`}
                    >
                        <LayoutGrid className="w-7 h-7" />
                    </button>
                </div>
            </div>
        </Layout>
    );
};
