import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Lightbulb, Eye, Brain } from 'lucide-react';

interface Room2Props {
  onComplete: (isCorrect: boolean, codeDigit: number) => void;
}

export function Room2DoubleLie({ onComplete }: Room2Props) {
  const [answer, setAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds
  const [showHint, setShowHint] = useState(false);

  const clues = [
    { text: 'It is older than electricity', isTruth: false, tag: 'Historical' },
    { text: 'It is used in modern technology', isTruth: true, tag: 'Contemporary' },
    { text: 'It has no moving parts', isTruth: false, tag: 'Mechanical' },
    { text: 'It relies on human error to function properly', isTruth: true, tag: 'Conceptual' },
  ];

  const correctAnswer = 'keyboard';
  const hiddenCodeDigit = 2; // Number of false statements

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

    const hintTimer = setTimeout(() => setShowHint(true), 20000);

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

  const handleSubmit = () => {
    if (!answer.trim() || revealed) return;
    setRevealed(true);
    const isCorrect = answer.toLowerCase().trim() === correctAnswer;
    onComplete(isCorrect, isCorrect ? hiddenCodeDigit : 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="text-yellow-400 text-sm tracking-widest">🟡 ROUND 2 OF 5</div>
            <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-yellow-500/50">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className={`text-lg tabular-nums ${timeLeft < 20 ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            THE DOUBLE-LIE OBJECT
          </h2>
          <p className="text-gray-400 text-lg">
            Exactly 2 statements are TRUE. Exactly 2 are LIES. Decode the object.
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="bg-orange-500/10 border border-orange-500/50 rounded-lg p-4 flex items-center gap-3"
        >
          <Brain className="w-6 h-6 text-orange-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-orange-300">
              <span className="font-semibold">WARNING:</span> Surface meaning kills. Think conceptual function, not literal properties.
            </p>
          </div>
        </motion.div>

        {/* Clues */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-8 space-y-5"
        >
          <div className="flex items-center gap-3 text-yellow-400 justify-center mb-6">
            <Lightbulb className="w-6 h-6" />
            <span className="text-sm tracking-wider">DECODE THE TRUTH FROM DECEPTION</span>
            <Lightbulb className="w-6 h-6" />
          </div>

          <div className="space-y-3">
            {clues.map((clue, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`p-5 rounded-lg border-2 ${
                  revealed
                    ? clue.isTruth
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-red-500 bg-red-500/10'
                    : 'border-yellow-500/30 bg-yellow-500/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-yellow-400 text-sm">Statement {idx + 1}</span>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {clue.tag}
                      </span>
                    </div>
                    <p className="text-gray-200 text-lg">{clue.text}</p>
                  </div>
                  {revealed && (
                    <div className="ml-4">
                      {clue.isTruth ? (
                        <span className="text-green-400 text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          TRUTH
                        </span>
                      ) : (
                        <span className="text-red-400 text-sm flex items-center gap-2">
                          <XCircle className="w-5 h-5" />
                          LIE
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
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
              Hidden Clue: Think about devices that NEED mistakes to serve their purpose (security, validation, testing).
            </p>
          </motion.div>
        )}

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
              placeholder="Type the object name..."
              className="flex-1 bg-black/60 border-2 border-yellow-500/50 rounded-lg px-6 py-4 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                    <p className="text-green-300 text-xl">Correct! A Keyboard</p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>✅ <span className="text-green-400">TRUTH:</span> Used in modern technology</p>
                    <p>✅ <span className="text-green-400">TRUTH:</span> Relies on human error (typing mistakes enable CAPTCHA, autocorrect, security systems)</p>
                    <p>❌ <span className="text-red-400">LIE:</span> Not older than electricity</p>
                    <p>❌ <span className="text-red-400">LIE:</span> Keys are moving parts</p>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 bg-cyan-500/10 border-2 border-cyan-500 rounded-lg p-4 text-center"
                  >
                    <p className="text-cyan-300 mb-2">🔐 Hidden Code Digit Unlocked</p>
                    <p className="text-5xl text-cyan-400 tabular-nums">{hiddenCodeDigit}</p>
                    <p className="text-sm text-gray-400 mt-2">({hiddenCodeDigit} false statements)</p>
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-red-300 text-xl">Eliminated! The answer was: Keyboard</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Truths: Modern technology + relies on human error (typos enable security/autocorrect)
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
