import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sun, Moon } from 'lucide-react';
interface EntranceScreenProps {
    onStart: () => void;
    isDark: boolean;
    toggleTheme: () => void;
}

export const EntranceScreen: React.FC<EntranceScreenProps> = ({ onStart, isDark, toggleTheme }) => {
    return (
        <div className={`min-h-screen transition-colors duration-500 overflow-hidden relative selection:bg-indigo-500/30 font-data ${isDark ? 'text-slate-200 bg-black' : 'text-[#433422] bg-[#f5f2e9]'}`}>

            <div className="absolute top-8 right-8 z-50">
                <button
                    onClick={toggleTheme}
                    className={`p-3 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10' : 'bg-black/5 hover:bg-black/10 text-[#8c7b60] hover:text-[#433422] border border-black/10'}`}
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Subtle Background Accent Blobs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Indigo (Industrial) */}
                <motion.div
                    className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-blue-500/15 dark:bg-blue-500/15 blur-[100px] md:blur-[150px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Amber (Cost of Living) */}
                <motion.div
                    className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-amber-500/15 dark:bg-amber-500/15 blur-[100px] md:blur-[150px]"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Red (Jobs & Incomes) */}
                <motion.div
                    className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-red-500/15 dark:bg-red-500/15 blur-[100px] md:blur-[150px]"
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -40, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5
                    }}
                />
                {/* Emerald (Global Trade) */}
                <motion.div
                    className="absolute bottom-[10%] right-[20%] w-[25vw] h-[25vw] rounded-full bg-emerald-500/15 dark:bg-emerald-500/15 blur-[100px] md:blur-[120px]"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 8
                    }}
                />
            </div>

            {/* Bottom-Left Content Container (Pinned) */}
            <div className="relative z-10 min-h-screen flex flex-col justify-end p-8 sm:p-12 md:p-24 lg:p-32 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start gap-8 md:gap-10"
                >
                    <div className="space-y-4 md:space-y-6">
                        <h1 className="text-4xl sm:text-6xl md:text-[90px] font-black leading-[0.9] tracking-tighter uppercase select-none">
                            One World.<br />
                            Many Realities.
                        </h1>

                        <p className="text-base md:text-xl text-[#8c7b60] dark:text-slate-400 font-medium max-w-2xl leading-tight opacity-70">
                            Countries grow differently. This space helps you see those differences simply.
                        </p>
                    </div>

                    <motion.button
                        whileHover={isDark ? { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' } : { backgroundColor: '#433422', color: '#f5f2e9', scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onStart}
                        className="flex items-center gap-4 md:gap-6 px-10 md:px-14 py-4 md:py-5 border border-[#433422]/20 dark:border-white/20 text-[#433422] dark:text-slate-100 rounded-none font-bold tracking-[0.2em] md:tracking-[0.3em] transition-all hover:border-[#433422] dark:hover:border-slate-200 uppercase text-xs md:text-sm group"
                    >
                        EXPLORE
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};
