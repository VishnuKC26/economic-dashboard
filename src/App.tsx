import { useState, useRef, useEffect } from 'react';
import { EntranceScreen } from './components/screens/EntranceScreen';
import { PerspectiveSelectionScreen } from './components/screens/PerspectiveSelectionScreen';
import { AppDashboardScreen } from './components/screens/AppDashboardScreen';
import type { Perspective } from './types/perspective';
import { SubtleBackground } from './components/SubtleBackground';

function App() {
  const [selectedPerspective, setSelectedPerspective] = useState<Perspective | null>(null);
  const [isDark, setIsDark] = useState(true);
  const selectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleStart = () => {
    selectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPerspective = (p: Perspective) => {
    setSelectedPerspective(p);
    // When we select a perspective, we want to reset scroll or just jump to dashboard
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedPerspective(null);
  };

  if (selectedPerspective) {
    return (
      <div className="App">
        <AppDashboardScreen
          perspective={selectedPerspective}
          onBack={handleBack}
          onSwitchPerspective={handleSelectPerspective}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      </div>
    );
  }

  return (
    <div className={`App min-h-screen relative transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-[#f5f2e9]'}`}>
      <SubtleBackground showAllColors={true} />
      <div className="relative z-10">
        <EntranceScreen onStart={handleStart} isDark={isDark} toggleTheme={toggleTheme} />
        <div ref={selectionRef}>
          <PerspectiveSelectionScreen onSelect={handleSelectPerspective} isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  );
}

export default App;
