import React from 'react';
import { motion } from 'framer-motion';
import { PERSPECTIVES } from '../../types/perspective';
import type { Perspective } from '../../types/perspective';
import { Home, Briefcase, Scale, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface PerspectiveSelectionScreenProps {
    onSelect: (p: Perspective) => void;
}

const iconMap: Record<string, any> = {
    Home,
    Briefcase,
    Scale
};

export const PerspectiveSelectionScreen: React.FC<PerspectiveSelectionScreenProps> = ({ onSelect }) => {
    return (
        <div className="min-h-screen p-6 text-white relative">
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
                    <span className="font-bold text-lg tracking-tight">World in Perspective</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/50 text-amber-300">
                    <div className="w-4 h-4 rounded-full border-2 border-amber-300/40 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-amber-300 rounded-full"></div>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10 md:mb-16 pt-20 md:pt-24"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 md:w-12 h-px bg-slate-800" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Navigation</span>
                    <div className="w-8 md:w-12 h-px bg-slate-800" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase leading-none px-4">Choose a <span className="text-slate-500">Perspective</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto items-stretch px-4 pb-16 md:pb-24">
                {PERSPECTIVES.map((p, idx) => {
                    const Icon = iconMap[p.icon] || Home;
                    const displayTitle = p.title.includes(' ') ? p.title.replace(' ', ' / ') : p.title;

                    return (
                        <motion.button
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => onSelect(p)}
                            className="group relative flex flex-col items-start p-8 md:p-10 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.2] hover:bg-white/[0.04] transition-all text-left overflow-hidden h-full min-h-[380px] md:min-h-[420px]"
                        >
                            <div className={clsx(
                                "absolute bottom-0 left-0 h-[2px] w-full transition-all duration-500",
                                p.color === 'red' ? 'bg-red-500/40 group-hover:bg-red-500 group-hover:h-[4px]' :
                                    p.color === 'amber' ? 'bg-amber-500/40 group-hover:bg-amber-500 group-hover:h-[4px]' :
                                        'bg-blue-500/40 group-hover:bg-blue-500 group-hover:h-[4px]'
                            )} />

                            <div className="w-full flex justify-between items-start mb-8 md:mb-12">
                                <Icon className={clsx("w-5 h-5 md:w-6 md:h-6 opacity-30 group-hover:opacity-100 transition-opacity",
                                    p.color === 'red' ? 'text-red-400' : p.color === 'amber' ? 'text-amber-400' : 'text-blue-400'
                                )} />
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">0{idx + 1}</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-black mb-4 leading-none uppercase tracking-tighter group-hover:tracking-tight transition-all duration-500">
                                {displayTitle}
                            </h3>

                            <p className="text-slate-400 mb-8 md:mb-12 font-medium text-xs md:text-sm leading-relaxed max-w-[280px]">
                                {p.description}
                            </p>

                            <div className="flex flex-col gap-3 mb-8 md:mb-12 flex-grow">
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">Indicators</span>
                                {p.indicators.slice(0, 3).map((ind, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-white/[0.03] p-2 px-3 rounded-md border border-white/[0.02]">
                                        <div className={clsx("w-1 h-1 rounded-full",
                                            p.color === 'red' ? 'bg-red-500' : p.color === 'amber' ? 'bg-amber-500' : 'bg-blue-500'
                                        )} />
                                        {ind.name}
                                    </div>
                                ))}
                                {p.indicators.length > 3 && (
                                    <span className="text-[9px] font-bold text-slate-500 uppercase italic pl-4">+ {p.indicators.length - 3} others</span>
                                )}
                            </div>

                            <div className={clsx(
                                "mt-auto w-full py-3 rounded-md border-2 font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-300",
                                p.color === 'red' ? 'border-red-500/20 text-red-500/60 group-hover:border-red-500 group-hover:text-red-400 group-hover:bg-red-500/5' :
                                    p.color === 'amber' ? 'border-amber-500/20 text-amber-500/60 group-hover:border-amber-500 group-hover:text-amber-400 group-hover:bg-amber-500/5' :
                                        'border-blue-500/20 text-blue-500/60 group-hover:border-blue-500 group-hover:text-blue-400 group-hover:bg-blue-500/5'
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
