import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, AlertTriangle, Eye } from 'lucide-react';

interface Room1Props {
  onComplete: (isCorrect: boolean, codeDigit: number) => void;
}

export function Room1MisdirectedPattern({ onComplete }: Room1Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [showHint, setShowHint] = useState(false);

  const sequences = [
    {
      id: 'A',
      values: [2, 6, 12, 20, 30],
      rule: 'Add increasing even numbers.',
      explanation: 'FAILS: Pattern should be +2, +4, +6, +8, +10, but starts at +4',
      isCorrect: false,
    },
    {
      id: 'B',
      values: [3, 9, 27, 81],
      rule: 'Multiply by 3.',
      explanation: 'PERFECT: 3×3=9, 9×3=27, 27×3=81. Rule + Execution + Consistency ✓',
      isCorrect: true,
    },
    {
      id: 'C',
      values: [1, 2, 4, 8, 15],
      rule: 'Multiply by 2.',
      explanation: 'FAILS: 8×2=16, not 15. Hidden violation in final term',
      isCorrect: false,
    },
    {
      id: 'D',
      values: [5, 10, 20, 40],
      rule: 'Double each time.',
      explanation: 'FAILS: Inconsistent length (others have 5 terms, missing 80)',
      isCorrect: false,
    },
  ];

  const correctAnswer = 'B';
  const hiddenCodeDigit = 3; // Number of failures hidden (A, C, D)

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

    const hintTimer = setTimeout(() => setShowHint(true), 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(hintTimer);
    };
  }, []);

  const handleTimeout = () => {
    if (!revealed) {
      setRevealed(true);
      onComplete(false, 0);
    }
  };

  const handleSelect = (id: string) => {
    if (revealed) return;
    setSelected(id);
  };

  const handleSubmit = () => {
    if (!selected || revealed) return;
    setRevealed(true);
    const isCorrect = selected === correctAnswer;
    onComplete(isCorrect, isCorrect ? hiddenCodeDigit : 0);
  };

  const getSequenceStatus = (id: string) => {
    if (!revealed) return null;
    if (id === correctAnswer) return 'correct';
    if (id === selected) return 'wrong';
    return 'neutral';
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
            <div className="text-red-400 text-sm tracking-widest">🔴 ROUND 1 OF 5</div>
            <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-yellow-500/50">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className={`text-lg tabular-nums ${timeLeft < 30 ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
            THE MISDIRECTED PATTERN
          </h2>
          <p className="text-gray-400 text-lg">
            Only ONE sequence follows its own rule correctly. Find the perfect execution.
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3"
        >
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-300">
              <span className="font-semibold">TASK:</span> Choose the only sequence where the rule is valid, execution is perfect, and there is NO hidden violation.
            </p>
          </div>
        </motion.div>

        {/* Hidden clue hint */}
        {showHint && !revealed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 flex items-center gap-3"
          >
            <Eye className="w-5 h-5 text-purple-400" />
            <p className="text-purple-300 text-sm">
              Hidden Clue: Check term counts, first jumps, and final values. Surface truth hides deep flaws.
            </p>
          </motion.div>
        )}

        {/* Sequences */}
        <div className="space-y-3">
          {sequences.map((seq, idx) => {
            const status = getSequenceStatus(seq.id);
            return (
              <motion.button
                key={seq.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSelect(seq.id)}
                disabled={revealed}
                className={`w-full p-5 rounded-lg border-2 transition-all text-left relative overflow-hidden ${
                  selected === seq.id && !revealed
                    ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                    : status === 'correct'
                    ? 'border-green-500 bg-green-500/20'
                    : status === 'wrong'
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-700 bg-black/40 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-2xl">{seq.id})</span>
                      <div className="flex gap-3 text-xl">
                        {seq.values.map((val, i) => (
                          <span key={i} className="text-gray-200">
                            {val}
                            {i < seq.values.length - 1 && <span className="text-gray-600 ml-2">,</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 ml-10 italic">
                      Rule given: &quot;{seq.rule}&quot;
                    </p>

                    {revealed && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 pt-4 border-t ${
                          seq.isCorrect
                            ? 'border-green-500/30 text-green-300'
                            : 'border-red-500/30 text-red-300'
                        } text-sm`}
                      >
                        {seq.explanation}
                      </motion.div>
                    )}
                  </div>
                  
                  {status === 'correct' && (
                    <CheckCircle2 className="w-8 h-8 text-green-400 animate-pulse" />
                  )}
                  {status === 'wrong' && (
                    <XCircle className="w-8 h-8 text-red-400 animate-pulse" />
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
              ({hiddenCodeDigit} failures hidden: A, C, D)
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
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-12 py-4 rounded-full transition-all shadow-lg text-lg"
            >
              LOCK IN ANSWER
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Wrong answer = instant elimination
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
