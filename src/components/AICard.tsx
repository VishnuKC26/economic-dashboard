import React from 'react';
import { motion } from 'framer-motion';
import { Activity, RefreshCcw } from 'lucide-react';

interface AICardProps {
    insight: React.ReactNode;
    loading?: boolean;
    color?: string;
}

export const AICard = ({ insight, loading = false, color = 'indigo' }: AICardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden p-6 md:p-8 rounded-lg transition-all duration-500 bg-black/5 dark:bg-slate-900/40 border border-[#433422]/10 dark:border-white/[0.05] shadow-sm hover:border-${color === 'indigo' ? 'blue' : color}-500/20`}
        >

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ring-1 ${color === 'red' ? 'bg-red-500/10 text-red-400 ring-red-500/20' :
                            color === 'amber' ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20' :
                                'bg-blue-500/10 text-blue-400 ring-blue-500/20'
                            }`}>
                            <Activity className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-black bg-gradient-to-br from-[#433422] to-[#8c7b60] dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent tracking-tight">
                            What This Comparison Tells Us
                        </h3>
                    </div>

                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-[10px] font-bold bg-slate-800/10 dark:bg-slate-800/50 border border-slate-700/50 dark:border-slate-700/50 text-[#8c7b60] dark:text-slate-300 hover:text-[#433422] dark:hover:text-slate-100">
                        <RefreshCcw className="w-3 h-3" />
                        Regenerate
                    </button>
                </div>

                <div className="min-h-[120px]">
                    {loading ? (
                        <div className="space-y-4">
                            <div className="h-4 bg-[#433422]/10 dark:bg-slate-800/80 rounded-full w-3/4 animate-pulse" />
                            <div className="h-4 bg-[#433422]/10 dark:bg-slate-800/80 rounded-full w-full animate-pulse" />
                            <div className="h-4 bg-[#433422]/10 dark:bg-slate-800/80 rounded-full w-2/3 animate-pulse" />
                        </div>
                    ) : (
                        insight
                    )}
                </div>
            </div>
        </motion.div>
    );
};
