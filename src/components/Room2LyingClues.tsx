import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface Room2Props {
  onComplete: (isCorrect: boolean) => void;
}

export function Room2LyingClues({ onComplete }: Room2Props) {
  const [answer, setAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);

  const clues = [
    { text: 'The object is used daily.', isTruth: true },
    { text: 'It requires electricity.', isTruth: false },
    { text: 'It fits inside a pocket.', isTruth: true },
    { text: 'It existed 200 years ago.', isTruth: false },
  ];

  const correctAnswer = 'watch';

  const handleSubmit = () => {
    if (!answer.trim() || revealed) return;
    setRevealed(true);
    const isCorrect = answer.toLowerCase().trim() === correctAnswer;
    onComplete(isCorrect);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-yellow-400 text-sm tracking-widest">🟨 ROOM 2 OF 5</div>
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            THE LYING CLUES
          </h2>
          <p className="text-gray-400 text-lg">
            Find the hidden object. Exactly 2 clues are TRUE and 2 are LIES.
          </p>
        </motion.div>

        {/* Clues */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-8 space-y-6"
        >
          <div className="flex items-center gap-3 text-yellow-400 justify-center mb-6">
            <Lightbulb className="w-6 h-6" />
            <span className="text-sm tracking-wider">DECODE THE TRUTH</span>
            <Lightbulb className="w-6 h-6" />
          </div>

          <div className="space-y-4">
            {clues.map((clue, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  revealed
                    ? clue.isTruth
                      ? 'border-l-green-500 bg-green-500/10'
                      : 'border-l-red-500 bg-red-500/10'
                    : 'border-l-yellow-500 bg-yellow-500/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-200">
                    <span className="text-yellow-400 mr-3">Clue {idx + 1}:</span>
                    {clue.text}
                  </p>
                  {revealed && (
                    <span className="text-sm">
                      {clue.isTruth ? (
                        <span className="text-green-400">✓ TRUTH</span>
                      ) : (
                        <span className="text-red-400">✗ LIE</span>
                      )}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Answer Input */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={revealed}
              placeholder="Type your answer..."
              className="flex-1 bg-black/60 border border-yellow-500/50 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSubmit}
              disabled={!answer.trim() || revealed}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-10 py-4 rounded-lg transition-all shadow-lg whitespace-nowrap"
            >
              SUBMIT
            </button>
          </div>

          {revealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-lg border-2 ${
                answer.toLowerCase().trim() === correctAnswer
                  ? 'border-green-500 bg-green-500/20'
                  : 'border-red-500 bg-red-500/20'
              }`}
            >
              {answer.toLowerCase().trim() === correctAnswer ? (
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-green-300 text-lg">Correct! A Watch</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Truths: Daily use + fits in pocket. Lies: Electricity (not required), 200 years ago (modern wristwatch form)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-red-300 text-lg">Incorrect! The answer was: A Watch</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Truths: Daily use + fits in pocket. Lies: Electricity (not required), 200 years ago (modern wristwatch form)
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
