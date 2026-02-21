import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { SubtleBackground } from './SubtleBackground';

interface LayoutProps {
    children: React.ReactNode;
    accentColor?: string;
    perspectiveName?: string;
}

export const Layout = ({ children, accentColor = 'indigo', perspectiveName }: LayoutProps) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className={`min-h-screen w-full transition-colors duration-300 ${isDark ? 'bg-black text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
            <SubtleBackground accentColor={accentColor} />

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md border-slate-800/60 bg-black/80">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-slate-200 rounded flex-shrink-0 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-0.5">
                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black/40 rounded-sm"></div>
                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-sm"></div>
                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black rounded-sm"></div>
                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-black/40 rounded-sm"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                            <span className="font-black text-xs uppercase tracking-widest text-white whitespace-nowrap overflow-hidden text-ellipsis">World in Perspective</span>
                            {perspectiveName && (
                                <>
                                    <div className="w-px h-4 bg-slate-800 mx-1 flex-shrink-0 hidden sm:block" />
                                    <span className="font-bold text-xs md:text-sm text-slate-400 capitalize whitespace-nowrap overflow-hidden text-ellipsis hidden sm:block">{perspectiveName}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
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
