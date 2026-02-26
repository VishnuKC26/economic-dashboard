import React from 'react';
import { motion } from 'framer-motion';
import { PERSPECTIVES } from '../../types/perspective';
import type { Perspective } from '../../types/perspective';
import { Home, Briefcase, Scale, ArrowRight, Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';

interface PerspectiveSelectionScreenProps {
    onSelect: (p: Perspective) => void;
    isDark: boolean;
    toggleTheme: () => void;
}

const iconMap: Record<string, any> = {
    Home,
    Briefcase,
    Scale
};

export const PerspectiveSelectionScreen: React.FC<PerspectiveSelectionScreenProps> = ({ onSelect, isDark, toggleTheme }) => {
    return (
        <div className={clsx("min-h-[100dvh] p-6 relative transition-colors duration-500", isDark ? "text-slate-200 bg-black" : "text-[#433422] bg-[#f5f2e9]")}>
            {/* Header copy from screenshot */}
            <div className="absolute top-0 left-0 w-full p-4 px-8 flex justify-between items-center z-50">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-slate-200 rounded flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-0.5">
                            <div className="w-1.5 h-1.5 bg-black/40 rounded-sm"></div>
                            <div className="w-1.5 h-1.5 bg-black rounded-sm"></div>
                            <div className="w-1.5 h-1.5 bg-black rounded-sm"></div>
                            <div className="w-1.5 h-1.5 bg-black/40 rounded-sm"></div>
                        </div>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-[#433422] dark:text-slate-200">World in Perspective</span>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={toggleTheme}
                        className={clsx(
                            "p-2 rounded-lg transition-all",
                            isDark ? "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10" : "bg-black/5 hover:bg-black/10 text-[#8c7b60] hover:text-[#433422] border border-black/10"
                        )}
                    >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    <div className="flex items-center gap-3 p-2 px-4 rounded-lg bg-[#433422]/5 dark:bg-slate-800/50 border border-[#433422]/10 dark:border-slate-700/50">
                        <div className="w-5 h-5 rounded-full border-2 border-emerald-500/40 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8c7b60] dark:text-emerald-400">Live Data Active — 2025</span>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 md:mb-6 mt-14 md:mt-16"
            >
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-px bg-[#433422]/20 dark:bg-slate-800"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8c7b60] dark:text-slate-500">Lens Selection</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black mb-2 tracking-tight uppercase leading-none px-4 text-[#433422] dark:text-slate-100">Choose a <span className="text-[#8c7b60] dark:text-slate-500">Perspective</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-[1600px] mx-auto items-stretch px-4 pb-6 md:pb-8 h-full min-h-0">
                {PERSPECTIVES.map((p, idx) => {
                    const Icon = iconMap[p.icon] || Home;

                    const themeClasses = {
                        indigo: { border: 'bg-blue-500/40 group-hover:bg-blue-500 group-hover:h-[4px]', text: 'text-blue-400', dot: 'bg-blue-500', btn: 'border-blue-500/20 text-blue-500/60 group-hover:border-blue-500 group-hover:text-blue-400 group-hover:bg-blue-500/5' },
                        red: { border: 'bg-red-500/40 group-hover:bg-red-500 group-hover:h-[4px]', text: 'text-red-400', dot: 'bg-red-500', btn: 'border-red-500/20 text-red-500/60 group-hover:border-red-500 group-hover:text-red-400 group-hover:bg-red-500/5' },
                        amber: { border: 'bg-amber-500/40 group-hover:bg-amber-500 group-hover:h-[4px]', text: 'text-amber-400', dot: 'bg-amber-500', btn: 'border-amber-500/20 text-amber-500/60 group-hover:border-amber-500 group-hover:text-amber-400 group-hover:bg-amber-500/5' },
                        emerald: { border: 'bg-emerald-500/40 group-hover:bg-emerald-500 group-hover:h-[4px]', text: 'text-emerald-400', dot: 'bg-emerald-500', btn: 'border-emerald-500/20 text-emerald-500/60 group-hover:border-emerald-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/5' },
                    };
                    const t = themeClasses[p.color as keyof typeof themeClasses] || themeClasses.amber;

                    return (
                        <motion.button
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            onClick={() => onSelect(p)}
                            className="group relative flex flex-col items-start p-4 md:p-5 rounded-lg bg-white/40 dark:bg-white/[0.02] border border-[#433422]/10 dark:border-white/[0.05] hover:border-[#433422]/30 dark:hover:border-slate-700/50 hover:bg-white/60 dark:hover:bg-white/[0.04] transition-all text-left overflow-hidden h-full shadow-sm hover:shadow-md"
                        >
                            <div className={clsx(
                                "absolute bottom-0 left-0 h-[2px] w-full transition-all duration-500", t.border
                            )} />

                            <div className="w-full flex justify-between items-start mb-3 md:mb-4">
                                <Icon className={clsx("w-4 h-4 md:w-5 md:h-5 opacity-30 group-hover:opacity-100 transition-opacity", t.text)} />
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">0{idx + 1}</span>
                            </div>

                            <h3 className="text-lg md:text-xl font-black mb-1 md:mb-2 leading-none uppercase tracking-tighter group-hover:tracking-tight transition-all duration-500">
                                {p.title}
                            </h3>

                            <p className="text-[#8c7b60] dark:text-slate-400 mb-3 md:mb-4 font-medium text-[10px] md:text-xs leading-relaxed line-clamp-2">
                                {p.description}
                            </p>

                            <div className="flex flex-col gap-1.5 md:gap-2 mb-4 md:mb-5 flex-grow w-full">
                                <span className="text-[8px] font-black text-[#8c7b60] dark:text-slate-500 uppercase tracking-[0.2em] mb-0.5">Indicators</span>
                                {p.indicators.map((ind, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[9px] font-bold text-[#8c7b60] dark:text-slate-300 uppercase tracking-widest bg-black/5 dark:bg-white/[0.03] p-1 px-2 rounded border border-[#433422]/5 dark:border-white/[0.02] w-full truncate">
                                        <div className={clsx("w-1 h-1 rounded-full flex-shrink-0", t.dot)} />
                                        <span className="truncate">{ind.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={clsx(
                                "mt-auto w-full py-2.5 rounded-md border-2 font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-300",
                                t.btn
                            )}>
                                Select <ArrowRight className="w-3 h-3" />
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Footer matching screenshot */}
            <div className="w-full p-6 md:p-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-700 font-bold uppercase tracking-widest border-t border-white/[0.02] gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-slate-900 rounded-lg flex items-center justify-center border border-white/[0.05]">
                        <div className="w-2 h-2 bg-indigo-500/20 rounded-xs"></div>
                    </div>
                    <span>World in Perspective</span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <span className="hover:text-slate-400 cursor-pointer transition-colors">Project Info</span>
                    <span className="hover:text-slate-400 cursor-pointer transition-colors">Global Metrics</span>
                    <span className="hover:text-slate-400 cursor-pointer transition-colors">Documentation</span>
                </div>
                <div className="flex gap-6">
                    <span>© 2026</span>
                </div>
            </div>
        </div>
    );
};
