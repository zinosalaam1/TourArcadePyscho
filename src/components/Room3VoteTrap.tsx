import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, TrendingDown } from 'lucide-react';

interface Room3Props {
  onComplete: (isCorrect: boolean) => void;
}

export function Room3VoteTrap({ onComplete }: Room3Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const options = [
    { id: 'A', value: '9', fakeVotes: 42 },
    { id: 'B', value: '16', fakeVotes: 31 },
    { id: 'C', value: '25', fakeVotes: 19 },
    { id: 'D', value: '27', fakeVotes: 8 },
  ];

  const correctAnswer = 'D';
  const totalVotes = options.reduce((sum, opt) => sum + opt.fakeVotes, 0);

  useEffect(() => {
    const timer = setTimeout(() => setShowWarning(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (!selected || revealed) return;
    setRevealed(true);
    onComplete(selected === correctAnswer);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-green-400 text-sm tracking-widest">🟩 ROOM 3 OF 5</div>
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
            THE VOTE TRAP
          </h2>
          <p className="text-gray-400 text-lg">
            Which number is most logically isolated?
          </p>
        </motion.div>

        {/* Warning */}
        {showWarning && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-center gap-3"
          >
            <TrendingDown className="w-6 h-6 text-red-400" />
            <p className="text-red-300">
              <span className="font-semibold">WARNING:</span> The correct answer will always be the LEAST chosen option.
            </p>
          </motion.div>
        )}

        {/* Options with fake vote counts */}
        <div className="space-y-4">
          {options.map((option, idx) => {
            const percentage = ((option.fakeVotes / totalVotes) * 100).toFixed(0);
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
                className={`w-full p-6 rounded-lg border-2 transition-all text-left relative overflow-hidden ${
                  selected === option.id && !revealed
                    ? 'border-purple-500 bg-purple-500/20'
                    : revealed && isCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : isWrong
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-700 bg-black/40 hover:border-gray-600'
                }`}
              >
                {/* Fake vote bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500/20 to-transparent pointer-events-none"
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="text-3xl">{option.id})</span>
                    <span className="text-2xl text-gray-200">{option.value}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Community votes</div>
                      <div className="text-xl text-green-400">{percentage}%</div>
                    </div>
                    
                    {revealed && isCorrect && (
                      <CheckCircle2 className="w-8 h-8 text-green-400 animate-pulse" />
                    )}
                    {isWrong && (
                      <XCircle className="w-8 h-8 text-red-400 animate-pulse" />
                    )}
                  </div>
                </div>

                {revealed && isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-green-500/30 text-green-300 text-sm"
                  >
                    ✅ Correct! 27 is the only non-perfect square (9=3², 16=4², 25=5²)
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

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
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-10 py-3 rounded-full transition-all shadow-lg"
            >
              LOCK IN ANSWER
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
