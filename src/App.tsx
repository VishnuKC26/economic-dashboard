import { useState, useRef } from 'react';
import { EntranceScreen } from './components/screens/EntranceScreen';
import { PerspectiveSelectionScreen } from './components/screens/PerspectiveSelectionScreen';
import { MainDashboardScreen } from './components/screens/MainDashboardScreen';
import type { Perspective } from './types/perspective';
import { SubtleBackground } from './components/SubtleBackground';

function App() {
  const [selectedPerspective, setSelectedPerspective] = useState<Perspective | null>(null);
  const selectionRef = useRef<HTMLDivElement>(null);

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
        <MainDashboardScreen
          perspective={selectedPerspective}
          onBack={handleBack}
          onSwitchPerspective={handleSelectPerspective}
        />
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-black relative">
      <SubtleBackground showAllColors={true} />
      <div className="relative z-10">
        <EntranceScreen onStart={handleStart} />
        <div ref={selectionRef}>
          <PerspectiveSelectionScreen onSelect={handleSelectPerspective} />
        </div>
      </div>
    </div>
  );
}

export default App;
