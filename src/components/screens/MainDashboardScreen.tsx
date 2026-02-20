import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Perspective, Indicator } from '../../types/perspective';
import { PERSPECTIVES } from '../../types/perspective';
import { Layout } from '../Layout';
import { LeaderboardCard } from '../LeaderboardCard';
import { AICard } from '../AICard';
import { economicData, getCountryColor } from '../../data/economics';
import type { Country } from '../../data/economics';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, LineChart, Line
} from 'recharts';
import { BarChart2, LineChart as LineChartIcon, Activity, Check, LayoutGrid, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface MainDashboardScreenProps {
    perspective: Perspective;
    onBack: () => void;
    onSwitchPerspective: (p: Perspective) => void;
}

const COUNTRIES: Country[] = ['India', 'China', 'Japan', 'USA', 'Germany'];
type ChartType = 'area' | 'line' | 'bar';

export const MainDashboardScreen = ({ perspective, onSwitchPerspective }: MainDashboardScreenProps) => {
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

    const chartData = useMemo(() => {
        const years = [2023, 2024, 2025];
        return years.map(year => {
            const entry: any = { year };
            selectedCountries.forEach(country => {
                const dataPoint = economicData.find(d => d.country === country && d.year === year);
                if (dataPoint) {
                    const mapping: Record<string, keyof typeof dataPoint> = {
                        'GDP': 'gdp',
                        'Inflation': 'inflation',
                        'Fiscal Deficit': 'fiscalDeficit',
                        'Unemployment': 'unemployment',
                        'Growth Rate': 'growthRate'
                    };
                    const key = mapping[selectedIndicator.metricKey];
                    if (key) entry[country] = dataPoint[key];
                }
            });
            return entry;
        });
    }, [selectedCountries, selectedIndicator]);

    // Simple textual logic for "AI Insight" matching screenshot structure
    const getInsightText = () => {
        const filteredData = economicData.filter(d => d.year === 2025 && selectedCountries.includes(d.country as Country));
        const sorted = [...filteredData].sort((a, b) => {
            const key = selectedIndicator.metricKey.toLowerCase() as keyof typeof a;
            return (b[key] as number) - (a[key] as number);
        });

        if (sorted.length === 0) return <p className="text-slate-500 italic">Select countries to see AI analysis.</p>;

        const leader = sorted[0];
        const second = sorted[1];
        const value = leader[selectedIndicator.metricKey.toLowerCase() as keyof typeof leader];

        return (
            <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                <p>Focusing on <span className="text-white font-black">{selectedCountries.join(', ')}</span>: Analysis of <span className={`text-${perspective.color}-400 font-black`}>{selectedIndicator.name}</span> in 2025 reveals that <span className="text-white font-black">{leader.country}</span> currently leads this specific selection with a value of <span className="text-white font-black">{selectedIndicator.metricKey === 'GDP' ? `$${value}T` : `${value}%`}</span>.</p>
                {second && (
                    <p>The gap between {leader.country} and {second.country} highlights significant structural disparities within this selection. While {leader.country} shows signs of consolidation, {perspective.color === 'red' ? 'fiscal consolidation' : perspective.color === 'amber' ? 'labor tightness' : 'living standard improvements'} remain the primary driver of this trend.</p>
                )}
                <p>Notably, for this peer group, the current trajectory suggests that {selectedIndicator.metricKey} will continue to be a pivotal factor for stability, with {leader.country} anchoring the performance of these selected nations.</p>
            </div>
        );
    };

    const renderChart = () => {
        const commonProps = {
            data: chartData,
            margin: { top: 20, right: 30, left: 0, bottom: 0 }
        };

        if (chartType === 'line') {
            return (
                <LineChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false} />
                    <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#475569', fontWeight: 'bold' }} />
                    <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: '#475569', fontWeight: 'bold' }} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0c0c0e', borderRadius: '4px', border: '1px solid #1e293b', boxShadow: 'none' }} />
                    {selectedCountries.map(c => (
                        <Line key={c} type="monotone" dataKey={c} stroke={getCountryColor(c)} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }} />
                    ))}
                </LineChart>
            )
        }
        if (chartType === 'bar') {
            return (
                <BarChart {...commonProps}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false} />
                    <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <RechartsTooltip />
                    {selectedCountries.map(c => (
                        <Bar key={c} dataKey={c} fill={getCountryColor(c)} radius={[4, 4, 0, 0]} />
                    ))}
                </BarChart>
            )
        }
        return (
            <AreaChart {...commonProps}>
                <defs>
                    {selectedCountries.map(c => (
                        <linearGradient key={c} id={`color${c}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={getCountryColor(c)} stopOpacity={0.2} />
                            <stop offset="95%" stopColor={getCountryColor(c)} stopOpacity={0} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} vertical={false} />
                <XAxis dataKey="year" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <RechartsTooltip />
                {selectedCountries.map(c => (
                    <Area key={c} type="monotone" dataKey={c} stroke={getCountryColor(c)} fillOpacity={1} fill={`url(#color${c})`} strokeWidth={2} />
                ))}
            </AreaChart>
        );
    }

    return (
        <Layout accentColor={perspective.color} perspectiveName={perspective.title}>
            <div className="flex flex-col gap-4 max-w-[1600px] mx-auto pb-10">
                {/* Control Bar exactly from Screenshot 3 - Now Merged with Background */}
                <div className="sticky top-14 z-40 py-6 px-4 -mx-4 bg-black/40 backdrop-blur-xl border-b border-white/[0.02]">
                    <div className="flex items-center gap-8 max-w-[1600px] mx-auto">
                        <div className="flex items-center gap-6">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Countries</span>
                            <div className="flex gap-2">
                                {COUNTRIES.map(c => {
                                    const isSelected = selectedCountries.includes(c);
                                    return (
                                        <button
                                            key={c}
                                            onClick={() => toggleCountry(c)}
                                            className={clsx(
                                                "px-5 py-2 text-[10px] rounded-lg font-black transition-all border uppercase tracking-widest",
                                                isSelected ?
                                                    'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' :
                                                    'bg-white/[0.03] border-white/[0.05] text-slate-500 hover:text-white hover:bg-white/[0.08]'
                                            )}
                                        >
                                            {c}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="w-px h-8 bg-white/[0.05]"></div>

                        <div className="flex items-center gap-6">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Indicators</span>
                            <div className="flex gap-2">
                                {perspective.indicators.map(ind => {
                                    const isSelected = selectedIndicator.id === ind.id;
                                    const color = perspective.color;

                                    return (
                                        <button
                                            key={ind.id}
                                            onClick={() => setSelectedIndicator(ind)}
                                            className={clsx(
                                                "px-5 py-2 text-[10px] rounded-lg font-black transition-all border uppercase tracking-widest",
                                                isSelected ?
                                                    (color === 'red' ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-600/30' :
                                                        color === 'amber' ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-600/30' :
                                                            'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30') :
                                                    'bg-white/[0.03] border-white/[0.05] text-slate-500 hover:text-white hover:bg-white/[0.08]'
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* Left Column (4/12) */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        {/* Leaderboard Matching Screenshot */}
                        <LeaderboardCard
                            metric={selectedIndicator.metricKey}
                            data={economicData.filter(d => d.year === 2025)}
                            color={perspective.color}
                        />

                        {/* About this indicator - Now Expandable */}
                        <div className="p-6 rounded-lg bg-white/[0.03] border border-slate-800 shadow-sm transition-all duration-500">
                            <div className={`flex items-center gap-3 mb-3 ${perspective.color === 'red' ? 'text-red-400' : perspective.color === 'amber' ? 'text-amber-400' : 'text-blue-400'}`}>
                                <Activity className="w-3.5 h-3.5" />
                                <h3 className="text-[9px] font-black uppercase tracking-widest">About this indicator</h3>
                            </div>
                            <h4 className="text-lg font-bold mb-3 leading-tight">{selectedIndicator.description}</h4>

                            <AnimatePresence>
                                {isAboutExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-4 pt-2 border-t border-slate-800/50 mt-4">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Definition</p>
                                                <p className="text-xs text-slate-300 leading-relaxed font-medium">{selectedIndicator.fullDefinition}</p>
                                            </div>
                                            {selectedIndicator.dataSource && (
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Data Source</p>
                                                    <p className="text-xs text-slate-400 font-medium italic">{selectedIndicator.dataSource}</p>
                                                </div>
                                            )}
                                            {selectedIndicator.examples && (
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Examples</p>
                                                    <ul className="list-disc list-inside text-xs text-slate-400 gap-1 flex flex-col pt-1">
                                                        {selectedIndicator.examples.map((ex, i) => (
                                                            <li key={i}>{ex}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                                className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform mt-4 ${perspective.color === 'red' ? 'text-red-400' : perspective.color === 'amber' ? 'text-amber-400' : 'text-blue-400'}`}
                            >
                                {isAboutExpanded ? 'Collapse View' : 'See full definition & examples'}
                                <ArrowRight className={`w-3 h-3 transition-transform ${isAboutExpanded ? '-rotate-90' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Right Column (9/12) */}
                    <div className="lg:col-span-9 flex flex-col gap-4">
                        {/* Trends Card */}
                        <div className="p-6 rounded-lg bg-white/[0.02] border border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`w-1 h-4 rounded-full ${perspective.color === 'red' ? 'bg-red-500' : perspective.color === 'amber' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                        <h3 className="text-lg font-black tracking-tight uppercase leading-none">{selectedIndicator.name} Analysis</h3>
                                    </div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Trends 2023 - 2025</p>
                                </div>

                                <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700/50 shadow-inner">
                                    {['area', 'line', 'bar'].map(type => {
                                        const isActive = chartType === type;
                                        const color = perspective.color;
                                        const activeClasses = {
                                            blue: 'bg-blue-600 shadow-blue-600/30',
                                            amber: 'bg-amber-600 shadow-amber-600/30',
                                            red: 'bg-red-600 shadow-red-600/30'
                                        }[color === 'indigo' ? 'blue' : color as 'blue' | 'amber' | 'red'];

                                        const Icon = type === 'area' ? Activity : type === 'line' ? LineChartIcon : BarChart2;

                                        return (
                                            <button
                                                key={type}
                                                onClick={() => setChartType(type as any)}
                                                className={`p-2 rounded-xl transition-all ${isActive ? `${activeClasses} text-white shadow-lg` : 'text-slate-500 hover:text-white'}`}
                                            >
                                                <Icon className="w-3.5 h-3.5" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="h-[320px] w-full mt-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    {renderChart()}
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* AI Analysis Matching "What This Comparison Tells Us" */}
                        <AICard insight={getInsightText() as any} color={perspective.color} />
                    </div>
                </div>

                {/* Perspective Switcher Overlays - Bottom Left */}
                <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-4 items-start">
                    <AnimatePresence>
                        {isPerspectiveOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-6 rounded-xl w-[260px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]"
                            >
                                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Switch Perspective</h5>
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
                                                <div className={`w-2 h-2 rounded-full ${p.color === 'red' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : p.color === 'amber' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(74,114,255,0.4)]'}`}></div>
                                                <span className={`text-sm font-bold ${perspective.id === p.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{p.title}</span>
                                            </div>
                                            {perspective.id === p.id && <Check className="w-4 h-4 text-blue-500" />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsPerspectiveOpen(!isPerspectiveOpen)}
                        className={`w-16 h-16 rounded-xl text-white flex items-center justify-center shadow-2xl transition-all hover:scale-105 backdrop-blur-xl border border-white/[0.1] ${perspective.color === 'red' ? 'bg-red-600/30 hover:bg-red-500/40 shadow-red-600/20' :
                            perspective.color === 'amber' ? 'bg-amber-600/30 hover:bg-amber-500/40 shadow-amber-600/20' :
                                'bg-blue-600/30 hover:bg-blue-500/40 shadow-blue-600/20'
                            }`}
                    >
                        <LayoutGrid className="w-7 h-7" />
                    </button>
                </div>
            </div>
        </Layout>
    );
};
