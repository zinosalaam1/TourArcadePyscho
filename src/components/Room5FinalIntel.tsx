import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Clock, Brain, Skull, CheckCircle2, XCircle } from 'lucide-react';

interface Room5Props {
  hiddenCode: number[];
  onComplete: (isCorrect: boolean, finalTime: number) => void;
}

export function Room5FinalIntel({ hiddenCode, onComplete }: Room5Props) {
  const [code, setCode] = useState(['', '', '', '']);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for final challenge
  const [showCodeBreakdown, setShowCodeBreakdown] = useState(false);
  const [startTime] = useState(Date.now());

  const correctCode = '3232'; // As calculated: 3 failures, 2 lies, 3 static threats, 2 states
  const codeDigits = hiddenCode;

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

    const breakdownTimer = setTimeout(() => setShowCodeBreakdown(true), 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(breakdownTimer);
    };
  }, []);

  const handleTimeout = () => {
    if (!revealed) {
      setRevealed(true);
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      onComplete(false, timeTaken);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (revealed) return;
    if (!/^\d*$/.test(value) || value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (code.some(d => !d) || revealed) return;
    setRevealed(true);
    const submittedCode = code.join('');
    const isCorrect = submittedCode === correctCode;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(isCorrect, timeTaken);
  };

  const codeBreakdown = [
    {
      round: 'Round 1',
      task: 'Count of failures hidden inside options',
      answer: 'A ❌ C ❌ D ❌',
      digit: 3,
    },
    {
      round: 'Round 2',
      task: 'Number of false statements',
      answer: '2 lies detected',
      digit: 2,
    },
    {
      round: 'Round 3',
      task: 'Number of static threats',
      answer: 'Safe, Gun, Animal',
      digit: 3,
    },
    {
      round: 'Round 4',
      task: 'Number of logical states in correct answer',
      answer: 'True ↔ False',
      digit: 2,
    },
  ];

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
            <div className="text-purple-400 text-sm tracking-widest">🟣 FINAL ROUND — 5 OF 5</div>
            <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-red-500/50">
              <Clock className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-lg tabular-nums text-red-400 animate-pulse">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <h2 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
            THE FINAL INTEL TRAP
          </h2>
          <p className="text-gray-400 text-lg">
            Decode the master lock using hidden truths from all previous rounds
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="bg-red-500/20 border-2 border-red-500 rounded-lg p-6 space-y-3"
        >
          <div className="flex items-center gap-3 justify-center">
            <Skull className="w-8 h-8 text-red-400 animate-pulse" />
            <p className="text-red-300 text-xl">
              <span className="font-semibold">FINAL INTELLIGENCE TEST</span>
            </p>
            <Skull className="w-8 h-8 text-red-400 animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-orange-300">
              The final code is made of four digits from each round&apos;s <span className="text-yellow-400">deepest truth</span>
            </p>
            <p className="text-gray-400 text-sm">
              Not the surface answer — the HIDDEN number behind each puzzle
            </p>
          </div>
        </motion.div>

        {/* Code breakdown instructions */}
        {showCodeBreakdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center gap-3 text-purple-400 justify-center mb-4">
              <Brain className="w-6 h-6" />
              <span className="tracking-wider">DECODE THE PATTERN</span>
              <Brain className="w-6 h-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {codeBreakdown.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-purple-300 text-sm mb-1">{item.round}</p>
                      <p className="text-gray-300 text-xs mb-2">{item.task}</p>
                      {revealed && (
                        <p className="text-cyan-400 text-xs">{item.answer}</p>
                      )}
                    </div>
                    {revealed && (
                      <div className="bg-cyan-500/20 border border-cyan-500 rounded-lg w-10 h-10 flex items-center justify-center">
                        <span className="text-cyan-400 text-xl tabular-nums">{item.digit}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Code input */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/60 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-10"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Lock className="w-8 h-8 text-purple-400" />
            <p className="text-purple-300 text-lg">MASTER LOCK CODE</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            {code.map((digit, idx) => (
              <div key={idx}>
                <input
                  id={`code-${idx}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  disabled={revealed}
                  maxLength={1}
                  className="w-20 h-24 text-5xl text-center bg-black/60 border-2 border-purple-500/50 rounded-lg text-purple-400 tabular-nums focus:outline-none focus:border-purple-400 focus:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            ))}
          </div>

          {!revealed && (
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={code.some(d => !d)}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-16 py-5 rounded-full transition-all shadow-lg text-xl"
              >
                UNLOCK FINAL CODE
              </button>
              <p className="text-gray-500 text-sm mt-4">
                This is your final test. One chance only.
              </p>
            </div>
          )}
        </motion.div>

        {/* Result */}
        {revealed && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`p-8 rounded-lg border-2 ${
              code.join('') === correctCode
                ? 'border-green-500 bg-green-500/20'
                : 'border-red-500 bg-red-500/20'
            }`}
          >
            {code.join('') === correctCode ? (
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto animate-pulse" />
                <p className="text-green-300 text-3xl">CODE CRACKED!</p>
                <p className="text-xl text-gray-300">
                  Master Code: <span className="text-green-400 tabular-nums text-3xl">{correctCode}</span>
                </p>
                <div className="pt-4 border-t border-green-500/30 text-left space-y-2 text-sm text-gray-300">
                  <p>✅ Round 1: <span className="text-cyan-400">3</span> failures (A, C, D)</p>
                  <p>✅ Round 2: <span className="text-cyan-400">2</span> false statements</p>
                  <p>✅ Round 3: <span className="text-cyan-400">3</span> static threats</p>
                  <p>✅ Round 4: <span className="text-cyan-400">2</span> logical states</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <XCircle className="w-16 h-16 text-red-400 mx-auto animate-pulse" />
                <p className="text-red-300 text-3xl">ELIMINATED</p>
                <p className="text-xl text-gray-300">
                  Your code: <span className="text-red-400 tabular-nums">{code.join('')}</span>
                </p>
                <p className="text-xl text-gray-300">
                  Correct code: <span className="text-green-400 tabular-nums">{correctCode}</span>
                </p>
                <p className="text-gray-400 text-sm">
                  You failed to extract the hidden truths from the deception.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Your collected digits */}
        {codeDigits.length > 0 && !revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
          >
            <p className="text-cyan-300 text-sm text-center mb-2">
              Digits you&apos;ve unlocked so far:
            </p>
            <div className="flex items-center justify-center gap-3">
              {codeDigits.map((digit, idx) => (
                <div key={idx} className="bg-cyan-500/20 border border-cyan-500 rounded-lg px-4 py-2">
                  <span className="text-cyan-400 text-2xl tabular-nums">{digit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
