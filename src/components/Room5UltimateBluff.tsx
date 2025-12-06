import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Skull } from 'lucide-react';

interface Room5Props {
  onComplete: (isCorrect: boolean) => void;
}

export function Room5UltimateBluff({ onComplete }: Room5Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const statements = [
    {
      id: 'A',
      text: 'All smart people overthink.',
      explanation: 'Too absolute - logically flawed generalization',
    },
    {
      id: 'B',
      text: 'Some liars always tell the truth.',
      explanation: 'Self-contradictory - liars cannot always tell truth',
    },
    {
      id: 'C',
      text: 'If every rule has an exception, then this rule has one too.',
      explanation: 'Logically consistent self-referential paradox',
    },
    {
      id: 'D',
      text: 'Nothing is absolute.',
      explanation: 'Self-defeating - claims absolute while denying absolutes',
    },
    {
      id: 'E',
      text: 'This statement is false.',
      explanation: 'Classic liar paradox - creates infinite logical loop',
    },
  ];

  const correctAnswer = 'C';

  const handleSubmit = () => {
    if (!selected || revealed) return;
    setRevealed(true);
    onComplete(selected === correctAnswer);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-5xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-purple-400 text-sm tracking-widest">🟪 ROOM 5 OF 5</div>
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
            THE ULTIMATE BLUFF
          </h2>
          <p className="text-gray-400 text-lg">
            Only ONE statement is logically airtight. Pure logic only.
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ scale: 0, rotate: 5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-6 flex items-center gap-4"
        >
          <Skull className="w-10 h-10 text-purple-400 flex-shrink-0" />
          <div>
            <p className="text-purple-300 text-lg">
              <span className="font-semibold">FINAL CHALLENGE:</span> Detect the bluff. Ignore emotional wording. Trust only pure logic.
            </p>
          </div>
        </motion.div>

        {/* Statements */}
        <div className="space-y-4">
          {statements.map((statement, idx) => {
            const isCorrect = statement.id === correctAnswer;
            const isWrong = revealed && selected === statement.id && !isCorrect;
            
            return (
              <motion.button
                key={statement.id}
                initial={{ x: -50, opacity: 0, rotateX: -10 }}
                animate={{ x: 0, opacity: 1, rotateX: 0 }}
                transition={{ delay: idx * 0.15 }}
                onClick={() => !revealed && setSelected(statement.id)}
                disabled={revealed}
                className={`w-full p-6 rounded-lg border-2 transition-all text-left relative overflow-hidden ${
                  selected === statement.id && !revealed
                    ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                    : revealed && isCorrect
                    ? 'border-green-500 bg-green-500/20'
                    : isWrong
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-700 bg-black/40 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <span className="text-2xl flex-shrink-0">{statement.id})</span>
                      <p className="text-xl text-gray-200 leading-relaxed">
                        {statement.text}
                      </p>
                    </div>
                    
                    {revealed && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`ml-10 pt-3 border-t ${
                          isCorrect
                            ? 'border-green-500/30 text-green-300'
                            : 'border-gray-700 text-gray-400'
                        } text-sm`}
                      >
                        {isCorrect ? '✅ ' : '💭 '}
                        {statement.explanation}
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {revealed && isCorrect && (
                      <CheckCircle2 className="w-8 h-8 text-green-400 animate-pulse" />
                    )}
                    {isWrong && (
                      <XCircle className="w-8 h-8 text-red-400 animate-pulse" />
                    )}
                  </div>
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
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-10 py-3 rounded-full transition-all shadow-lg shadow-purple-500/50 text-lg"
            >
              FINAL ANSWER
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
