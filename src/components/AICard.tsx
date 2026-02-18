import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot } from 'lucide-react';

interface AICardProps {
    insight: string;
    loading?: boolean;
}

export const AICard: React.FC<AICardProps> = ({ insight, loading = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-500/30 backdrop-blur-md"
        >
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                        <Bot className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-300 to-white bg-clip-text text-transparent">
                        AI Economic Analysis
                    </h3>
                    <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
                </div>

                <div className="min-h-[100px] text-slate-300 leading-relaxed text-sm md:text-base font-light">
                    {loading ? (
                        <div className="flex flex-col gap-2">
                            <div className="h-4 bg-slate-700/50 rounded w-3/4 animate-pulse" />
                            <div className="h-4 bg-slate-700/50 rounded w-full animate-pulse" />
                            <div className="h-4 bg-slate-700/50 rounded w-5/6 animate-pulse" />
                        </div>
                    ) : (
                        <p>{insight}</p>
                    )}
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <span>Generated based on live data</span>
                    <div className="w-1 h-1 rounded-full bg-slate-600" />
                    <span>Model: EcoGen-Proto-v1</span>
                </div>
            </div>
        </motion.div>
    );
};
