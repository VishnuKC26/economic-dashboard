import React from 'react';

interface SubtleBackgroundProps {
    accentColor?: string;
    showAllColors?: boolean;
}

export const SubtleBackground: React.FC<SubtleBackgroundProps> = ({ accentColor = 'indigo', showAllColors = false }) => {
    return (
        <>
            {/* Background Reflection/Presence */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {showAllColors ? (
                    <>
                        {/* Multiple subtle tints for the combined look */}
                        <div
                            className="absolute top-0 left-[-10%] w-[1200px] h-[800px] rounded-full blur-[200px] opacity-[0.12]"
                            style={{
                                background: 'radial-gradient(circle, #4a72ff 0%, transparent 70%)',
                                transform: 'translate(-30%, -30%)'
                            }}
                        />
                        <div
                            className="absolute top-[20%] right-[-15%] w-[1000px] h-[1000px] rounded-full blur-[180px] opacity-[0.10]"
                            style={{
                                background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
                                transform: 'translate(20%, -20%)'
                            }}
                        />
                        <div
                            className="absolute bottom-[-15%] right-[-5%] w-[1300px] h-[1300px] rounded-full blur-[250px] opacity-[0.12]"
                            style={{
                                background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
                                transform: 'translate(10%, 10%)'
                            }}
                        />
                    </>
                ) : (
                    <div
                        className="absolute top-0 left-1/4 w-[1000px] h-[600px] rounded-full blur-[160px] opacity-[0.20] transition-all duration-1000"
                        style={{
                            background: `radial-gradient(circle, ${accentColor === 'red' ? '#ef4444' : accentColor === 'amber' ? '#f59e0b' : '#4a72ff'} 0%, transparent 70%)`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                )}
            </div>

            {/* Background Texture (Radial Dots) */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>
        </>
    );
};
