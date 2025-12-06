import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Brain, Eye, Zap } from 'lucide-react';

interface Room4Props {
  onComplete: (isCorrect: boolean, codeDigit: number) => void;
}

export function Room4ConfidenceCollapse({ onComplete }: Room4Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds - very tight
  const [confidenceStats, setConfidenceStats] = useState([48, 26, 21, 5]);
  const [showHint, setShowHint] = useState(false);

  const options = [
    {
      id: 'A',
      text: 'Always false',
      explanation: 'If always false, then the statement "everything I say is a lie" would be false, meaning he tells truth',
      states: 1,
    },
    {
      id: 'B',
      text: 'Always true',
      explanation: 'If always true, then he is lying, which contradicts "always true"',
      states: 1,
    },
    {
      id: 'C',
      text: 'Both true and false',
      explanation: 'BI-STABLE LOGICAL STATE: If true→false, if false→true. Self-oscillating paradox = 2 states',
      states: 2,
    },
    {
      id: 'D',
      text: 'Meaningless',
      explanation: 'Not meaningless - it has precise logical structure, just paradoxical',
      states: 0,
    },
  ];

  const correctAnswer = 'C';
  const hiddenCodeDigit = 2; // Number of logical states in the correct answer

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate confidence stat fluctuations
    const confInterval = setInterval(() => {
      if (!revealed) {
        setConfidenceStats(prev => {
          const total = 100;
          const newStats = prev.map(v => {
            const change = Math.floor(Math.random() * 5) - 2;
            return Math.max(1, v + change);
          });
          const sum = newStats.reduce((a, b) => a + b, 0);
          return newStats.map(v => Math.round((v / sum) * total));
        });
      }
    }, 1500);

    const hintTimer = setTimeout(() => setShowHint(true), 15000);

    return () => {
      clearInterval(timer);
      clearInterval(confInterval);
      clearTimeout(hintTimer);
    };
  }, [revealed]);

  const handleTimeout = () => {
    if (!revealed) {
      setRevealed(true);
      onComplete(false, 0);
    }
  };

  const handleSubmit = () => {
    if (!selected || revealed) return;
    setRevealed(true);
    const isCorrect = selected === correctAnswer;
    onComplete(isCorrect, isCorrect ? hiddenCodeDigit : 0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="text-blue-400 text-sm tracking-widest">🔵 ROUND 4 OF 5</div>
            <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-red-500/50">
              <Clock className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-lg tabular-nums text-red-400 animate-pulse">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            THE CONFIDENCE COLLAPSE
          </h2>
          <p className="text-gray-400 text-lg">
            A man says: &quot;Everything I say is a lie.&quot;
          </p>
          <p className="text-orange-400">
            Which option best describes this sentence?
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="bg-orange-500/20 border border-orange-500 rounded-lg p-4 space-y-2"
        >
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-orange-400" />
            <p className="text-orange-300">
              <span className="font-semibold">META-LOGIC TRAP:</span> This tests understanding of self-referential paradoxes
            </p>
          </div>
          <p className="text-yellow-300 text-sm pl-9">
            Bi-stable ≠ Meaningless. Logical oscillation ≠ Nonsense.
          </p>
        </motion.div>

        {/* Fake confidence stats warning */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 flex items-center gap-3"
        >
          <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
          <p className="text-purple-300 text-sm">
            <span className="font-semibold">Confidence Statistics from Previous Players</span> — Don&apos;t trust popularity
          </p>
        </motion.div>

        {/* Hidden clue hint */}
        {showHint && !revealed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 flex items-center gap-3"
          >
            <Eye className="w-5 h-5 text-cyan-400" />
            <p className="text-cyan-300 text-sm">
              Hidden Clue: If true → becomes false. If false → becomes true. Count the oscillating states.
            </p>
          </motion.div>
        )}

        {/* Options with fake confidence stats */}
        <div className="space-y-3">
          {options.map((option, idx) => {
            const isCorrect = option.id === correctAnswer;
            const isWrong = revealed && selected === option.id && !isCorrect;
            
            return (
              <motion.button
                key={option.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => !revealed && setSelected(option.id)}
                disabled={revealed}
                className={`w-full rounded-lg border-2 transition-all text-left relative overflow-hidden ${
                  selected === option.id && !revealed
                    ? 'border-purple-500 bg-purple-500/20 shadow-lg'
                    : revealed && isCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : isWrong
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-700 bg-black/40 hover:border-gray-600'
                }`}
              >
                {/* Confidence bar */}
                <motion.div
                  animate={{ width: `${confidenceStats[idx]}%` }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-y-0 left-0 pointer-events-none ${
                    confidenceStats[idx] > 40
                      ? 'bg-gradient-to-r from-blue-600/30 to-transparent'
                      : confidenceStats[idx] > 20
                      ? 'bg-gradient-to-r from-blue-600/20 to-transparent'
                      : 'bg-gradient-to-r from-blue-600/10 to-transparent'
                  }`}
                />

                <div className="relative p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-6">
                      <span className="text-3xl">{option.id})</span>
                      <span className="text-2xl text-gray-200">{option.text}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {!revealed && (
                        <motion.div 
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-right"
                        >
                          <div className="text-xs text-gray-500">Confidence</div>
                          <div className={`text-xl tabular-nums ${
                            confidenceStats[idx] > 40 ? 'text-blue-400' : 'text-gray-500'
                          }`}>
                            {confidenceStats[idx]}%
                          </div>
                        </motion.div>
                      )}

                      {revealed && isCorrect && (
                        <CheckCircle2 className="w-8 h-8 text-green-400 animate-pulse" />
                      )}
                      {isWrong && (
                        <XCircle className="w-8 h-8 text-red-400 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Confidence indicator bar */}
                  {!revealed && (
                    <div className="flex items-center gap-3 ml-14">
                      <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          animate={{ width: `${confidenceStats[idx]}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full ${
                            confidenceStats[idx] > 40
                              ? 'bg-blue-500'
                              : confidenceStats[idx] > 20
                              ? 'bg-blue-400'
                              : 'bg-blue-300'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {revealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 pt-4 border-t ${
                        isCorrect ? 'border-green-500/30' : 'border-gray-700'
                      }`}
                    >
                      <p className={`text-sm ${isCorrect ? 'text-green-300' : 'text-gray-400'}`}>
                        {isCorrect && '✅ '}{option.explanation}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Hidden code reveal */}
        {revealed && selected === correctAnswer && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-cyan-500/10 border-2 border-cyan-500 rounded-lg p-6 text-center"
          >
            <p className="text-cyan-300 text-lg mb-2">🔐 Hidden Code Digit Unlocked</p>
            <p className="text-5xl text-cyan-400 tabular-nums">{hiddenCodeDigit}</p>
            <p className="text-sm text-gray-400 mt-2">
              ({hiddenCodeDigit} logical states: true ↔ false oscillation)
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        {!revealed && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-12 py-4 rounded-full transition-all shadow-lg text-lg"
            >
              LOCK IN ANSWER
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Ignore fake confidence — trust logic only
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
