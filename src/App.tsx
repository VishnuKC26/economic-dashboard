import { useState, useRef } from 'react';
import { EntranceScreen } from './components/screens/EntranceScreen';
import { PerspectiveSelectionScreen } from './components/screens/PerspectiveSelectionScreen';
import { MainDashboardScreen } from './components/screens/MainDashboardScreen';
import type { Perspective } from './types/perspective';

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
    <div className="App bg-black">
      <EntranceScreen onStart={handleStart} />
      <div ref={selectionRef} className="bg-black">
        <PerspectiveSelectionScreen onSelect={handleSelectPerspective} />
      </div>
    </div>
  );
}

export default App;
