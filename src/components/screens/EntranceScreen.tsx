import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
interface EntranceScreenProps {
    onStart: () => void;
}

export const EntranceScreen: React.FC<EntranceScreenProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen text-white overflow-hidden relative selection:bg-indigo-500/30 font-data">

            {/* Bottom-Left Content Container (Pinned) */}
            <div className="relative z-10 min-h-screen flex flex-col justify-end p-12 md:p-24 lg:p-32 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start gap-10"
                >
                    <div className="space-y-6">
                        <h1 className="text-6xl md:text-[90px] font-black leading-[0.9] tracking-tighter uppercase select-none">
                            One World.<br />
                            Many Realities.
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-tight opacity-70">
                            Countries grow differently. This space helps you see those differences simply.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ backgroundColor: 'white', color: 'black', scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onStart}
                        className="flex items-center gap-6 px-14 py-5 border border-white/20 text-white rounded-none font-bold tracking-[0.3em] transition-all hover:border-white uppercase text-sm group"
                    >
                        EXPLORE
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};
