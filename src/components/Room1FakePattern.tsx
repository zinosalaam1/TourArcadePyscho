import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Room1Props {
  onComplete: (isCorrect: boolean) => void;
}

export function Room1FakePattern({ onComplete }: Room1Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const sequences = [
    { id: 'A', values: [2, 4, 8, 16, 32], description: 'Powers of 2?' },
    { id: 'B', values: [1, 4, 9, 16, 25], description: 'Perfect squares?' },
    { id: 'C', values: [3, 6, 12, 18, 24], description: 'Multiples of 3?' },
    { id: 'D', values: [5, 10, 15, 21, 28], description: 'Pattern unclear...' },
    { id: 'E', values: [7, 14, 21, 29, 35], description: 'Multiples of 7?' },
  ];

  const correctAnswer = 'B';

  const handleSelect = (id: string) => {
    if (revealed) return;
    setSelected(id);
  };

  const handleSubmit = () => {
    if (!selected || revealed) return;
    setRevealed(true);
    onComplete(selected === correctAnswer);
  };

  const getSequenceStatus = (id: string) => {
    if (!revealed) return null;
    if (id === correctAnswer) return 'correct';
    if (id === selected) return 'wrong';
    return 'neutral';
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
          <div className="text-red-400 text-sm tracking-widest">🟥 ROOM 1 OF 5</div>
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
            THE FAKE PATTERN
          </h2>
          <p className="text-gray-400 text-lg">
            Only ONE sequence is perfectly correct. Others contain hidden logical errors.
          </p>
        </motion.div>

        {/* Sequences */}
        <div className="space-y-4">
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
                className={`w-full p-6 rounded-lg border-2 transition-all text-left relative overflow-hidden ${
                  selected === seq.id && !revealed
                    ? 'border-purple-500 bg-purple-500/20'
                    : status === 'correct'
                    ? 'border-green-500 bg-green-500/20'
                    : status === 'wrong'
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-700 bg-black/40 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-2xl">{seq.id})</span>
                      <div className="flex gap-3 text-xl">
                        {seq.values.map((val, i) => (
                          <span key={i} className="text-gray-200">
                            {val}
                            {i < seq.values.length - 1 && <span className="text-gray-600 ml-3">,</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ml-12">{seq.description}</p>
                  </div>
                  
                  {status === 'correct' && (
                    <CheckCircle2 className="w-8 h-8 text-green-400 animate-pulse" />
                  )}
                  {status === 'wrong' && (
                    <XCircle className="w-8 h-8 text-red-400 animate-pulse" />
                  )}
                </div>

                {revealed && seq.id === correctAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-green-500/30 text-green-300 text-sm"
                  >
                    ✅ Perfect square numbers: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25
                  </motion.div>
                )}
                
                {revealed && seq.id !== correctAnswer && status === 'wrong' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-red-500/30 text-red-300 text-sm"
                  >
                    ❌ This sequence contains inconsistent rules
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
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-10 py-3 rounded-full transition-all shadow-lg"
            >
              LOCK IN ANSWER
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
