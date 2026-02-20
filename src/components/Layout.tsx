import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

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
        <div className={`min-h-screen w-full transition-colors duration-300 ${isDark ? 'bg-[#0c0c0e] text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
            {/* Background Reflection/Presence */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div
                    className={`absolute top-0 left-1/4 w-[1000px] h-[600px] rounded-full blur-[160px] opacity-[0.12] transition-all duration-1000`}
                    style={{
                        background: `radial-gradient(circle, ${accentColor === 'red' ? '#ef4444' : accentColor === 'amber' ? '#f59e0b' : '#6366f1'} 0%, transparent 70%)`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            </div>

            {/* Background Texture */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md border-slate-800/60 bg-[#0c0c0e]/80">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-slate-200 rounded flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-0.5">
                                <div className="w-1.5 h-1.5 bg-black/40 rounded-sm"></div>
                                <div className="w-1.5 h-1.5 bg-black rounded-sm"></div>
                                <div className="w-1.5 h-1.5 bg-black rounded-sm"></div>
                                <div className="w-1.5 h-1.5 bg-black/40 rounded-sm"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-black text-sm uppercase tracking-widest text-white">World in Perspective</span>
                            {perspectiveName && (
                                <>
                                    <div className="w-px h-4 bg-slate-800 mx-1" />
                                    <span className="font-bold text-sm text-slate-400 capitalize">{perspectiveName}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
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
            <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                {children}
            </main>
        </div>
    );
};
