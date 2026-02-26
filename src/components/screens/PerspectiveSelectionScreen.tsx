import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [hoveredIndex, setHoveredIndex] = useState(0);

    const activePerspective = PERSPECTIVES[hoveredIndex];
    const ActiveIcon = iconMap[activePerspective.icon] || Home;

    const themeClasses = {
        indigo: { border: 'bg-blue-500/40 group-hover:bg-blue-500 group-hover:h-[4px]', text: 'text-blue-400', dot: 'bg-blue-500', cardGlow: 'border-blue-500/30 dark:border-blue-500/40 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] dark:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]' },
        red: { border: 'bg-red-500/40 group-hover:bg-red-500 group-hover:h-[4px]', text: 'text-red-400', dot: 'bg-red-500', cardGlow: 'border-red-500/30 dark:border-red-500/40 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)] dark:shadow-[0_0_30px_-5px_rgba(239,68,68,0.2)]' },
        amber: { border: 'bg-amber-500/40 group-hover:bg-amber-500 group-hover:h-[4px]', text: 'text-amber-400', dot: 'bg-amber-500', cardGlow: 'border-amber-500/30 dark:border-amber-500/40 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] dark:shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]' },
        emerald: { border: 'bg-emerald-500/40 group-hover:bg-emerald-500 group-hover:h-[4px]', text: 'text-emerald-400', dot: 'bg-emerald-500', cardGlow: 'border-emerald-500/30 dark:border-emerald-500/40 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] dark:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]' },
    };

    const activeTheme = themeClasses[activePerspective.color as keyof typeof themeClasses] || themeClasses.amber;

    return (
        <div className={clsx("min-h-[100dvh] p-6 relative transition-colors duration-500 flex flex-col", isDark ? "text-slate-200 bg-black" : "text-[#433422] bg-[#f5f2e9]")}>
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

            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 w-full max-w-6xl mx-auto px-4 lg:px-12 mb-12 min-h-0">
                {/* Left Side: Vertical Headings List */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-6 justify-center">
                    {PERSPECTIVES.map((p, idx) => {
                        const Icon = iconMap[p.icon] || Home;
                        const isHovered = hoveredIndex === idx;
                        const t = themeClasses[p.color as keyof typeof themeClasses] || themeClasses.amber;

                        return (
                            <motion.button
                                key={p.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onClick={() => onSelect(p)}
                                className={clsx(
                                    "group relative flex items-center justify-between p-4 md:p-6 rounded-xl border transition-all duration-300 text-left cursor-pointer",
                                    isHovered
                                        ? "bg-white/40 dark:bg-white/[0.04] border-[#433422]/20 dark:border-white/[0.1] shadow-md scale-[1.02]"
                                        : "bg-white/20 dark:bg-white/[0.01] border-[#433422]/5 dark:border-white/[0.02] hover:bg-white/30 dark:hover:bg-white/[0.02]"
                                )}
                            >
                                <div className="flex items-center gap-4 lg:gap-6">
                                    <div className={clsx(
                                        "p-2.5 rounded-lg transition-colors",
                                        isHovered ? "bg-black/5 dark:bg-white/10" : "bg-transparent text-[#8c7b60] dark:text-slate-500"
                                    )}>
                                        <Icon className={clsx("w-6 h-6 lg:w-8 lg:h-8", isHovered ? t.text : "")} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={clsx("text-[10px] font-black uppercase tracking-widest mb-1", isHovered ? t.text : "text-[#8c7b60]/60 dark:text-slate-500")}>
                                            0{idx + 1}
                                        </span>
                                        <h3 className={clsx(
                                            "text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter transition-colors",
                                            isHovered ? "text-[#433422] dark:text-slate-100" : "text-[#433422]/60 dark:text-slate-400"
                                        )}>
                                            {p.title}
                                        </h3>
                                    </div>
                                </div>
                                <ArrowRight className={clsx(
                                    "w-5 h-5 transition-all duration-300 transform",
                                    isHovered ? `opacity-100 translate-x-0 ${t.text}` : "opacity-0 -translate-x-4 text-[#8c7b60] dark:text-slate-600"
                                )} />
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right Side: Active Card Display */}
                <div className="w-full lg:w-1/2 flex justify-center items-center min-h-[420px] md:min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.button
                            key={activePerspective.id}
                            initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                            transition={{ duration: 0.1 }}
                            onClick={() => onSelect(activePerspective)}
                            className={clsx(
                                "relative flex flex-col items-start p-8 md:p-10 rounded-2xl bg-white/40 dark:bg-white/[0.02] border transition-all text-left overflow-hidden h-auto min-h-[420px] md:min-h-[500px] w-full max-w-[500px] group cursor-pointer",
                                activeTheme.cardGlow
                            )}
                        >
                            <div className={clsx(
                                "absolute bottom-0 left-0 h-[3px] w-full transition-all duration-500", activeTheme.border
                            )} />

                            <div className="w-full flex items-center gap-4 mb-4 lg:mb-6 mt-4">
                                <ActiveIcon className={clsx("w-8 h-8 lg:w-10 lg:h-10 opacity-80", activeTheme.text)} />
                                <h3 className="text-3xl lg:text-4xl font-black leading-none uppercase tracking-tighter text-[#433422] dark:text-slate-100 mb-0">
                                    {activePerspective.title}
                                </h3>
                            </div>

                            <p className="text-[#8c7b60] dark:text-slate-400 mb-6 lg:mb-8 font-medium text-sm lg:text-base leading-relaxed line-clamp-3 lg:line-clamp-none">
                                {activePerspective.description}
                            </p>

                            <div className="flex flex-col gap-3 mb-6 lg:mb-8 w-full flex-grow">
                                <span className="text-xs font-black text-[#8c7b60] dark:text-slate-500 uppercase tracking-[0.2em]">Tracked Indicators</span>
                                <div className="flex flex-col gap-3">
                                    {activePerspective.indicators.map((ind, i) => (
                                        <div key={i} className="flex items-start gap-3 text-xs lg:text-sm font-bold text-[#8c7b60] dark:text-slate-300 uppercase tracking-widest bg-black/5 dark:bg-white/[0.03] p-3 px-4 rounded-lg border border-[#433422]/5 dark:border-white/[0.02] w-full">
                                            <div className={clsx("w-2 h-2 rounded-full flex-shrink-0 mt-1", activeTheme.dot)} />
                                            <span className="leading-relaxed">{ind.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.button>
                    </AnimatePresence>
                </div>
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
