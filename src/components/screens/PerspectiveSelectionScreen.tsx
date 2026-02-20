import React from 'react';
import { motion } from 'framer-motion';
import { PERSPECTIVES } from '../../types/perspective';
import type { Perspective } from '../../types/perspective';
import { Home, Briefcase, Scale, ArrowRight } from 'lucide-react';

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
        <div className="min-h-screen p-6 bg-black text-white relative">
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
                className="text-center mb-16"
            >
                <h2 className="text-6xl font-black mb-4 tracking-tight">Choose a Perspective</h2>
                <p className="text-slate-400 text-lg">
                    Pick a lens to begin your exploration of the global economy.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                {PERSPECTIVES.map((p, idx) => {
                    const Icon = iconMap[p.icon] || Home;
                    return (
                        <motion.button
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => onSelect(p)}
                            className="flex flex-col items-start p-10 rounded-3xl bg-[#0f172a]/20 border border-slate-800 hover:border-slate-500 hover:bg-slate-500/5 transition-all text-left shadow-sm"
                        >
                            <div className={`p-4 rounded-2xl mb-12 bg-slate-800/50 ring-1 ring-slate-700/50 ${p.color === 'red' ? 'text-red-400' : p.color === 'amber' ? 'text-amber-400' : 'text-indigo-400'
                                }`}>
                                <Icon className="w-8 h-8" />
                            </div>

                            <h3 className="text-3xl font-black mb-2 leading-none">{p.title}</h3>
                            <p className="text-slate-400 mb-8 font-medium">
                                {p.description}
                            </p>

                            <div className="w-full bg-slate-900/60 p-4 rounded-2xl mb-8 border border-slate-800/50">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex flex-wrap gap-x-3 gap-y-1 italic">
                                    {p.tags.map((tag, i) => (
                                        <span key={i} className="flex items-center gap-2">
                                            {tag}
                                            {i < p.tags.length - 1 && <span>-</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className={`mt-auto flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] ${p.color === 'red' ? 'text-red-400' : p.color === 'amber' ? 'text-amber-400' : 'text-indigo-400'
                                }`}>
                                Explore View <ArrowRight className="w-3 h-3" />
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Footer matching screenshot */}
            <div className="absolute bottom-0 left-0 w-full p-6 px-12 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest border-t border-slate-800/30">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-800 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-500/50 rounded-xs"></div>
                    </div>
                    <span>World in Perspective</span>
                </div>
                <div className="flex gap-6">
                    <span>© 2026</span>
                    <span>Privacy</span>
                    <span>Terms</span>
                </div>
            </div>
        </div>
    );
};
