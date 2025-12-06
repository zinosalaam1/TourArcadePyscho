import { motion } from 'motion/react';
import { Trophy, Crown, Clock, Brain, RotateCcw, Zap } from 'lucide-react';

interface GameResultsProps {
  username: string;
  completionTimes: number[];
  onRestart: () => void;
}

export function GameResults({ username, completionTimes, onRestart }: GameResultsProps) {
  const totalTime = completionTimes.reduce((a, b) => a + b, 0);
  const avgTimePerRound = Math.floor(totalTime / completionTimes.length);

  const getRank = () => {
    if (totalTime < 180) return { 
      title: 'LEGENDARY MASTERMIND', 
      color: 'text-yellow-400', 
      icon: '👑',
      desc: 'Perfect speed + perfect logic. You are among the elite.'
    };
    if (totalTime < 300) return { 
      title: 'MASTER DETECTIVE', 
      color: 'text-purple-400', 
      icon: '🎯',
      desc: 'Exceptional performance. You decoded the grand deception.'
    };
    if (totalTime < 420) return { 
      title: 'TRUTH SEEKER', 
      color: 'text-blue-400', 
      icon: '🧠',
      desc: 'Solid logic and reasoning. You survived all trials.'
    };
    return { 
      title: 'DECEPTION SURVIVOR', 
      color: 'text-green-400', 
      icon: '✓',
      desc: 'You made it through, but barely. Improve your speed.'
    };
  };

  const rank = getRank();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const roomNames = [
    'The Misdirected Pattern',
    'The Double-Lie Object',
    'The Crowd Paradox',
    'The Confidence Collapse',
    'The Final Intel Trap',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full space-y-8"
      >
        {/* Trophy celebration */}
        <motion.div
          initial={{ y: -50, opacity: 0, rotate: -10 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400">
            VICTORY
          </h1>
          <div className={`text-5xl ${rank.color} tracking-wider mb-3`}>
            {rank.icon} {rank.title}
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {rank.desc}
          </p>
        </motion.div>

        {/* Stats card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-black/60 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 space-y-6"
        >
          {/* Overall performance */}
          <div className="grid grid-cols-3 gap-6 pb-6 border-b border-gray-700">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-1">Success Rate</p>
              <p className="text-5xl text-green-400">100%</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-1">Total Time</p>
              <p className="text-5xl text-blue-400 tabular-nums">{formatTime(totalTime)}</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-1">Avg/Round</p>
              <p className="text-5xl text-purple-400 tabular-nums">{formatTime(avgTimePerRound)}</p>
            </div>
          </div>

          {/* Individual round times */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Brain className="w-5 h-5" />
              <span className="text-sm">Round Performance Breakdown</span>
            </div>
            
            {completionTimes.map((time, idx) => {
              const isFast = time < 60;
              const isSlow = time > 120;
              return (
                <motion.div
                  key={idx}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isFast 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : isSlow
                      ? 'bg-orange-500/10 border-orange-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl ${
                      isFast ? 'text-green-400' : isSlow ? 'text-orange-400' : 'text-blue-400'
                    }`}>
                      {isFast ? '⚡' : isSlow ? '⏱️' : '✓'}
                    </span>
                    <div>
                      <p className="text-gray-200">Round {idx + 1}</p>
                      <p className="text-xs text-gray-500">{roomNames[idx]}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl tabular-nums ${
                      isFast ? 'text-green-400' : isSlow ? 'text-orange-400' : 'text-blue-400'
                    }`}>
                      {formatTime(time)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isFast ? 'Lightning fast' : isSlow ? 'Careful thinking' : 'Good pace'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievement unlock */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-6 text-center"
        >
          <p className="text-purple-300 text-lg mb-3">🏆 Achievement Unlocked</p>
          <p className="text-3xl mb-2">DECEPTION MASTER</p>
          <p className="text-gray-400 text-sm">
            You survived all 5 brutal rounds without elimination. You are among the top 1% of players.
          </p>
        </motion.div>

        {/* Stats insights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center space-y-3"
        >
          <p className="text-gray-400">
            {totalTime < 300 && "Exceptional speed and accuracy. Your mind cuts through deception like a knife."}
            {totalTime >= 300 && totalTime < 420 && "Solid performance. You balanced speed with careful analysis."}
            {totalTime >= 420 && "You survived, but there's room for improvement. Trust your logic faster."}
          </p>
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-gray-500 text-xs">Fastest Possible</p>
              <p className="text-gray-600 text-lg tabular-nums">2:30</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-xs">Your Time</p>
              <p className={`text-2xl tabular-nums ${rank.color}`}>{formatTime(totalTime)}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-xs">Global Average</p>
              <p className="text-gray-600 text-lg tabular-nums">8:45</p>
            </div>
          </div>
        </motion.div>

        {/* Restart button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-12 py-5 rounded-full text-xl transition-all shadow-lg shadow-purple-500/50 flex items-center gap-3 mx-auto"
          >
            <RotateCcw className="w-6 h-6" />
            CHALLENGE AGAIN
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Can you beat your time? The deception awaits.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}