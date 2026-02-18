import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Sun, Moon } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className={`min-h-screen w-full transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? 'bg-blue-900/10' : 'bg-blue-300/30'}`} />
                <div className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? 'bg-indigo-900/10' : 'bg-indigo-300/30'}`} />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-indigo-600 text-white">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">InsightX</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                {children}
            </main>
        </div>
    );
};
