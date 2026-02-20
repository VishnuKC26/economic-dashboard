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
            className={`relative overflow-hidden p-8 rounded-lg bg-white/[0.04] border border-slate-800 shadow-sm hover:border-${color === 'indigo' ? 'blue' : color}-500/20 transition-all duration-500`}
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
                        <h3 className="text-xl font-black bg-white bg-clip-text text-transparent tracking-tight">
                            What This Comparison Tells Us
                        </h3>
                    </div>

                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white transition-all text-[10px] font-bold">
                        <RefreshCcw className="w-3 h-3" />
                        Regenerate
                    </button>
                </div>

                <div className="min-h-[120px]">
                    {loading ? (
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-800/80 rounded-full w-3/4 animate-pulse" />
                            <div className="h-4 bg-slate-800/80 rounded-full w-full animate-pulse" />
                            <div className="h-4 bg-slate-800/80 rounded-full w-2/3 animate-pulse" />
                        </div>
                    ) : (
                        insight
                    )}
                </div>
            </div>
        </motion.div>
    );
};
