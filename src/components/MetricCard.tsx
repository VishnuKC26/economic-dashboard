import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

interface MetricCardProps {
    title: string;
    value: string;
    trend?: number; // percentage change
    trendDir?: 'up' | 'down' | 'neutral';
    color?: string;
    delay?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, trendDir = 'neutral', color = "indigo", delay = 0 }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            className="relative overflow-hidden p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm group hover:border-slate-600/50 transition-colors"
        >
            <div className={clsx("absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity", `text-${color}-400`)}>
                <TrendingUp className="w-16 h-16" />
            </div>

            <div className="relative z-10">
                <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-100">{value}</span>
                </div>

                {trend !== undefined && (
                    <div className="mt-3 flex items-center gap-2">
                        <div className={clsx("flex items-center px-1.5 py-0.5 rounded text-xs font-semibold",
                            trendDir === 'up' && "bg-emerald-500/10 text-emerald-400",
                            trendDir === 'down' && "bg-rose-500/10 text-rose-400",
                            trendDir === 'neutral' && "bg-slate-500/10 text-slate-400"
                        )}>
                            {trendDir === 'up' && <ArrowUpRight className="w-3 h-3 mr-1" />}
                            {trendDir === 'down' && <ArrowDownRight className="w-3 h-3 mr-1" />}
                            {trendDir === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
                            {trend}%
                        </div>
                        <span className="text-xs text-slate-500">vs last year</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
