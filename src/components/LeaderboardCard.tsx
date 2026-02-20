import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import type { EconomicData, Metric } from '../data/economics';
import { getCountryColor } from '../data/economics';

interface LeaderboardCardProps {
    metric: Metric;
    data: EconomicData[]; // Should be data for a specific year (2025)
    color?: string;
}

export const LeaderboardCard = ({ metric, data, color = 'indigo' }: LeaderboardCardProps) => {

    const sortedData = useMemo(() => {
        // Sort by value descending
        return [...data].sort((a, b) => {
            let valA = 0;
            let valB = 0;
            switch (metric) {
                case 'GDP': valA = a.gdp; valB = b.gdp; break;
                case 'Inflation': valA = a.inflation; valB = b.inflation; break;
                case 'Fiscal Deficit': valA = a.fiscalDeficit; valB = b.fiscalDeficit; break;
                case 'Unemployment': valA = a.unemployment; valB = b.unemployment; break;
                case 'Growth Rate': valA = a.growthRate; valB = b.growthRate; break;
            }
            return valB - valA;
        }).slice(0, 3); // Take top 3
    }, [data, metric]);

    const formatValue = (d: EconomicData) => {
        switch (metric) {
            case 'GDP': return `$${d.gdp}T`;
            case 'Inflation': return `${d.inflation}%`;
            case 'Fiscal Deficit': return `${d.fiscalDeficit}%`;
            case 'Unemployment': return `${d.unemployment}%`;
            case 'Growth Rate': return `${d.growthRate}%`;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden p-6 rounded-3xl bg-[#0f172a]/20 border border-slate-800 shadow-sm transition-all duration-500 ${color === 'red' ? 'hover:border-red-500/20' : color === 'amber' ? 'hover:border-amber-500/20' : 'hover:border-indigo-500/20'
                }`}
        >
            {/* Perspective Accent Bar */}
            <div className={`absolute top-0 left-0 w-full h-0.5 ${color === 'red' ? 'bg-red-500/30' : color === 'amber' ? 'bg-amber-500/30' : 'bg-indigo-500/30'
                }`} />

            <div className="flex items-center gap-2 mb-6 text-amber-500">
                <Trophy className="w-3.5 h-3.5" />
                <h3 className="font-black text-slate-200 uppercase tracking-[0.2em] text-[10px]">Top 3 {metric}</h3>
            </div>

            <div className="space-y-4">
                {sortedData.map((d, index) => (
                    <div key={d.country} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={clsx(
                                "flex items-center justify-center w-8 h-8 rounded-full text-xs font-black",
                                index === 0 ? (
                                    color === 'red' ? 'bg-red-500/20 text-red-500' :
                                        color === 'amber' ? 'bg-amber-500/20 text-amber-500' :
                                            'bg-indigo-500/20 text-indigo-500'
                                ) :
                                    index === 1 ? "bg-slate-700/50 text-slate-400" :
                                        "bg-orange-950/40 text-orange-500"
                            )}>
                                {index + 1}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">{d.country}</span>
                                <div className="h-0.5 w-10 rounded-full mt-1.5 opacity-40" style={{ backgroundColor: getCountryColor(d.country) }}></div>
                            </div>
                        </div>
                        <span className="font-bold text-slate-400 text-base tracking-tight">
                            {formatValue(d)}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
