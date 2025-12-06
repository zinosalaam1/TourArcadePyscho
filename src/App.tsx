import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UsernameEntry } from './components/UsernameEntry';
import { GameIntro } from './components/GameIntro';
import { Room1MisdirectedPattern } from './components/Room1MisdirectedPattern';
import { Room2DoubleLie } from './components/Room2DoubleLie';
import { Room3CrowdParadox } from './components/Room3CrowdParadox';
import { Room4ConfidenceCollapse } from './components/Room4ConfidenceCollapse';
import { Room5FinalIntel } from './components/Room5FinalIntel';
import { GameResults } from './components/GameResults';
import { EliminationScreen } from './components/EliminationScreen';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [hiddenCode, setHiddenCode] = useState<number[]>([]);
  const [eliminated, setEliminated] = useState(false);
  const [completionTimes, setCompletionTimes] = useState<number[]>([]);
  const [roomStartTime, setRoomStartTime] = useState(Date.now());

  const handleRoomComplete = (isCorrect: boolean, codeDigit: number) => {
    const timeTaken = Math.floor((Date.now() - roomStartTime) / 1000);
    setCompletionTimes([...completionTimes, timeTaken]);

    if (!isCorrect) {
      setEliminated(true);
      return;
    }

    setHiddenCode([...hiddenCode, codeDigit]);
    
    // Wait before moving to next room
    setTimeout(() => {
      setCurrentRoom(currentRoom + 1);
      setRoomStartTime(Date.now());
    }, 2500);
  };

  const handleFinalSubmit = (isCorrect: boolean, finalTime: number) => {
    setCompletionTimes([...completionTimes, finalTime]);
    if (!isCorrect) {
      setEliminated(true);
      return;
    }
    
    setTimeout(() => {
      setCurrentRoom(6);
    }, 2000);
  };

  const handleRestart = () => {
    setUsername(null);
    setCurrentRoom(0);
    setHiddenCode([]);
    setEliminated(false);
    setCompletionTimes([]);
    setRoomStartTime(Date.now());
  };

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
    setCurrentRoom(1);
  };

  if (eliminated) {
    return <EliminationScreen onRestart={handleRestart} failedRoom={currentRoom} username={username || 'Player'} />;
  }

  const renderRoom = () => {
    switch (currentRoom) {
      case 0:
        return <UsernameEntry onUsernameSubmit={handleUsernameSubmit} />;
      case 1:
        return <GameIntro username={username || 'Player'} onStart={() => { setCurrentRoom(2); setRoomStartTime(Date.now()); }} />;
      case 2:
        return <Room1MisdirectedPattern onComplete={handleRoomComplete} />;
      case 3:
        return <Room2DoubleLie onComplete={handleRoomComplete} />;
      case 4:
        return <Room3CrowdParadox onComplete={handleRoomComplete} />;
      case 5:
        return <Room4ConfidenceCollapse onComplete={handleRoomComplete} />;
      case 6:
        return <Room5FinalIntel hiddenCode={hiddenCode} onComplete={handleFinalSubmit} />;
      case 7:
        return <GameResults username={username || 'Player'} completionTimes={completionTimes} onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoom}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {renderRoom()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}