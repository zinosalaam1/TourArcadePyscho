import { motion } from 'motion/react';
import { Skull, RotateCcw, AlertTriangle } from 'lucide-react';

interface EliminationScreenProps {
  onRestart: () => void;
  failedRoom: number;
  username: string;
}

export function EliminationScreen({ onRestart, failedRoom, username }: EliminationScreenProps) {
  const roomNames = [
    'Introduction',
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
        className="max-w-2xl w-full"
      >
        <div className="text-center space-y-8">
          {/* Skull animation */}
          <motion.div
            initial={{ y: -100, opacity: 0, rotate: -180 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <Skull className="w-32 h-32 text-red-500 mx-auto" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500">
              ELIMINATED
            </h1>
            <p className="text-red-400 text-2xl">
              The deception consumed you
            </p>
          </motion.div>

          {/* Failure details */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-black/60 backdrop-blur-sm border-2 border-red-500 rounded-lg p-8 space-y-6"
          >
            <div className="flex items-center justify-center gap-3 text-red-400">
              <AlertTriangle className="w-8 h-8" />
              <p className="text-xl">FAILURE ANALYSIS</p>
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Failed at:</p>
                <p className="text-red-300 text-2xl">
                  Round {failedRoom} — {roomNames[failedRoom]}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-gray-700 rounded-lg p-4">
                  <p className="text-gray-500 text-xs mb-1">Survival Rate</p>
                  <p className="text-red-400 text-3xl">0%</p>
                </div>
                <div className="bg-black/40 border border-gray-700 rounded-lg p-4">
                  <p className="text-gray-500 text-xs mb-1">Rank</p>
                  <p className="text-gray-400 text-3xl">Eliminated</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Harsh messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <p className="text-orange-400 text-lg">
              Speed without reasoning = instant failure
            </p>
            <p className="text-gray-500 italic">
              Only those who read between the ideas survive
            </p>
            <p className="text-gray-600 text-sm">
              You became another statistic in the grand deception
            </p>
          </motion.div>

          {/* Restart button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 px-12 py-5 rounded-full text-xl transition-all shadow-lg shadow-red-500/50 flex items-center gap-3 mx-auto"
          >
            <RotateCcw className="w-6 h-6" />
            TRY AGAIN
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-gray-600 text-sm"
          >
            Think deeper. Trust logic over instinct.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}