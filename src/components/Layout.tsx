import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { SubtleBackground } from './SubtleBackground';

interface LayoutProps {
    children: React.ReactNode;
    accentColor?: string;
    perspectiveName?: string;
    isDark: boolean;
    toggleTheme: () => void;
}

export const Layout = ({ children, accentColor = 'indigo', perspectiveName, isDark, toggleTheme }: LayoutProps) => {

    return (
        <div className={`min-h-screen w-full transition-colors duration-500 ${isDark ? 'dark bg-black text-slate-200' : 'bg-[#f5f2e9] text-[#433422]'}`}>
            <SubtleBackground accentColor={accentColor} />

            {/* Header */}
            <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-500 ${isDark ? 'border-slate-800/60 bg-black/80' : 'border-[#433422]/10 bg-[#f5f2e9]/80'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                        <button onClick={() => window.location.reload()} className="flex items-center gap-2 md:gap-3 overflow-hidden hover:opacity-80 transition-opacity text-left">
                            <div className="w-6 h-6 md:w-7 md:h-7 bg-slate-200 rounded flex-shrink-0 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-0.5">
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black/40 rounded-sm"></div>
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-sm"></div>
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-sm"></div>
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black/40 rounded-sm"></div>
                                </div>
                            </div>
                            <span className={`font-black text-xs uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis ${isDark ? 'text-slate-100' : 'text-[#433422]'}`}>World in Perspective</span>
                        </button>

                        {perspectiveName && (
                            <div className="flex items-center overflow-hidden">
                                <div className={`w-px h-4 mx-2 flex-shrink-0 hidden sm:block ${isDark ? 'bg-slate-800' : 'bg-[#433422]/10'}`} />
                                <span className={`font-bold text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis hidden sm:block ${isDark ? 'text-slate-400' : 'text-[#8c7b60]'}`}>{perspectiveName}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        <button
                            onClick={toggleTheme}
                            className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-[#433422]/10 text-[#8c7b60] hover:text-[#433422]'}`}
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8">
                {children}
            </main>
        </div>
    );
};
