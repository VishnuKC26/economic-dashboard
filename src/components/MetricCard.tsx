import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
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
            className="relative overflow-hidden p-5 md:p-6 pl-7 md:pl-8 rounded-lg bg-white/[0.03] border border-slate-800/60 backdrop-blur-sm group hover:bg-white/[0.05] transition-all duration-300"
        >
            {/* Professional Vertical Accent Bar */}
            <div className={clsx(
                "absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 group-hover:w-[5px]",
                color === 'red' ? 'bg-red-500/40' : color === 'amber' ? 'bg-amber-500/40' : 'bg-blue-500/40'
            )} />

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] leading-none mb-4">{title}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white tracking-tight">{value}</span>
                    </div>
                </div>

                {trend !== undefined && (
                    <div className="mt-6 flex items-center gap-3">
                        <div className={clsx("flex items-center text-[11px] font-bold",
                            trendDir === 'up' && "text-emerald-400",
                            trendDir === 'down' && "text-rose-400",
                            trendDir === 'neutral' && "text-slate-500"
                        )}>
                            {trendDir === 'up' && <ArrowUpRight className="w-3 h-3 mr-1" />}
                            {trendDir === 'down' && <ArrowDownRight className="w-3 h-3 mr-1" />}
                            {trendDir === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
                            {trend}%
                        </div>
                        <div className="h-px flex-1 bg-slate-800/50" />
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-none">YoY</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
