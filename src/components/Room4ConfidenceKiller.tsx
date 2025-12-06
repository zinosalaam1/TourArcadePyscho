import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

interface Room4Props {
  onComplete: (isCorrect: boolean) => void;
}

export function Room4ConfidenceKiller({ onComplete }: Room4Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const options = [
    { id: 'A', text: 'Square', confidence: 62 },
    { id: 'B', text: 'Pentagon', confidence: 27 },
    { id: 'C', text: 'Hexagon', confidence: 9 },
    { id: 'D', text: 'Circle', confidence: 2 },
  ];

  const correctAnswer = 'C';

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
          <div className="text-blue-400 text-sm tracking-widest">🟦 ROOM 4 OF 5</div>
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            THE CONFIDENCE KILLER
          </h2>
          <p className="text-gray-400 text-lg">
            Which shape has the most internal angles?
          </p>
        </motion.div>

        {/* Fake confidence warning */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="bg-orange-500/20 border border-orange-500 rounded-lg p-4 flex items-center gap-3"
        >
          <TrendingUp className="w-6 h-6 text-orange-400" />
          <p className="text-orange-300 text-sm">
            <span className="font-semibold">Showing confidence statistics from previous players...</span>
          </p>
        </motion.div>

        {/* Options with fake confidence stats */}
        <div className="space-y-4">
          {options.map((option, idx) => {
            const isCorrect = option.id === correctAnswer;
            const isWrong = revealed && selected === option.id && !isCorrect;
            
            return (
              <motion.button
                key={option.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                onClick={() => !revealed && setSelected(option.id)}
                disabled={revealed}
                className={`w-full rounded-lg border-2 transition-all text-left relative overflow-hidden ${
                  selected === option.id && !revealed
                    ? 'border-purple-500 bg-purple-500/20'
                    : revealed && isCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : isWrong
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-700 bg-black/40 hover:border-gray-600'
                }`}
              >
                {/* Confidence bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${option.confidence}%` }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.8 }}
                  className={`absolute inset-y-0 left-0 pointer-events-none ${
                    option.confidence > 50
                      ? 'bg-gradient-to-r from-blue-600/30 to-transparent'
                      : option.confidence > 20
                      ? 'bg-gradient-to-r from-blue-600/20 to-transparent'
                      : 'bg-gradient-to-r from-blue-600/10 to-transparent'
                  }`}
                />

                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-6">
                      <span className="text-3xl">{option.id})</span>
                      <span className="text-2xl text-gray-200">{option.text}</span>
                    </div>
                    
                    {revealed && isCorrect && (
                      <CheckCircle2 className="w-8 h-8 text-green-400 animate-pulse" />
                    )}
                    {isWrong && (
                      <XCircle className="w-8 h-8 text-red-400 animate-pulse" />
                    )}
                  </div>

                  {/* Confidence indicator */}
                  <div className="flex items-center gap-3 ml-14">
                    <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${option.confidence}%` }}
                        transition={{ delay: 0.8 + idx * 0.1, duration: 0.8 }}
                        className={`h-full ${
                          option.confidence > 50
                            ? 'bg-blue-500'
                            : option.confidence > 20
                            ? 'bg-blue-400'
                            : 'bg-blue-300'
                        }`}
                      />
                    </div>
                    <span className={`text-sm w-12 ${
                      option.confidence > 50
                        ? 'text-blue-400'
                        : 'text-gray-500'
                    }`}>
                      {option.confidence}%
                    </span>
                  </div>

                  {revealed && isCorrect && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 border-t border-green-500/30 text-green-300 text-sm"
                    >
                      ✅ Correct! Hexagon has 6 internal angles (Square: 4, Pentagon: 5, Circle: 0)
                    </motion.div>
                  )}
                </div>
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
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-10 py-3 rounded-full transition-all shadow-lg"
            >
              LOCK IN ANSWER
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
