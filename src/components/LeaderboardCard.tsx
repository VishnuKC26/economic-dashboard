import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import type { EconomicData, Metric } from '../data/economics';
import { getCountryColor } from '../data/economics';

interface LeaderboardCardProps {
    metric: Metric;
    data: EconomicData[]; // Should be data for a specific year (2025)
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ metric, data }) => {

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
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm"
        >
            <div className="flex items-center gap-2 mb-4 text-amber-500">
                <Trophy className="w-5 h-5" />
                <h3 className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide text-sm">Top 3 {metric}</h3>
            </div>

            <div className="space-y-4">
                {sortedData.map((d, index) => (
                    <div key={d.country} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className={clsx(
                                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
                                index === 0 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                                    index === 1 ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300" :
                                        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" // Bronze-ish
                            )}>
                                {index + 1}
                            </span>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold dark:text-slate-200 text-slate-700">{d.country}</span>
                                <div className="h-1 w-16 rounded-full mt-1" style={{ backgroundColor: getCountryColor(d.country) }}></div>
                            </div>
                        </div>
                        <span className="font-mono font-medium text-slate-600 dark:text-slate-400">
                            {formatValue(d)}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
