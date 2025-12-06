import { motion } from 'motion/react';
import { Eye, AlertTriangle, Skull, Clock, Brain } from 'lucide-react';

interface GameIntroProps {
  username: string;
  onStart: () => void;
}

export function GameIntro({ username, onStart }: GameIntroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center space-y-8">
          {/* Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <Eye className="w-20 h-20 text-purple-400 animate-pulse" />
            </div>
            <h1 className="text-7xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              🎭 THE GRAND DECEPTION
            </h1>
            <p className="text-purple-300 text-2xl tracking-widest">
              SATURDAY SOLVE THE PUZZLE
            </p>
            <p className="text-red-400 text-sm tracking-widest animate-pulse">
              ADVANCED DIFFICULTY — MASTER EDITION
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <p className="text-cyan-400 text-xl">
                Welcome, <span className="text-cyan-300 font-semibold">{username}</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Your fate will be recorded
              </p>
            </motion.div>
          </motion.div>

          {/* Core Rules */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 backdrop-blur-sm border-2 border-red-500/50 rounded-lg p-8 space-y-6"
          >
            <div className="flex items-center justify-center gap-3 text-red-400">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
              <p className="text-2xl">CORE RULES OF SURVIVAL</p>
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-purple-300">At least one VISIBLE clue</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-300">At least one HIDDEN clue</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="text-sm text-red-300">At least one MISDIRECTION</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6 space-y-3 text-left">
              <p className="text-yellow-300 text-lg">
                ⚡ Speed without reasoning = <span className="text-red-400">instant failure</span>
              </p>
              <p className="text-green-300 text-lg">
                🧠 Only those who <span className="text-purple-400">read between the ideas</span> will survive
              </p>
              <p className="text-orange-300 text-lg">
                🎯 Each round contains a <span className="text-cyan-400">hidden code digit</span> for the final lock
              </p>
            </div>
          </motion.div>

          {/* Brutal Win Conditions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-black/60 backdrop-blur-sm border-2 border-red-600/70 rounded-lg p-8 space-y-4"
          >
            <div className="flex items-center justify-center gap-3 text-red-500">
              <Skull className="w-8 h-8" />
              <p className="text-2xl tracking-wider">BRUTAL WIN CONDITIONS</p>
              <Skull className="w-8 h-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 text-left">
                <span className="text-red-400 text-xl">❌</span>
                <p className="text-gray-300">You MUST clear all 5 rounds consecutively</p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <span className="text-red-400 text-xl">❌</span>
                <p className="text-gray-300">Any wrong answer = auto-elimination</p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <span className="text-yellow-400 text-xl">⏱️</span>
                <p className="text-gray-300">Time pressure increases each round</p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <span className="text-purple-400 text-xl">🔐</span>
                <p className="text-gray-300">Final code requires perfect memory</p>
              </div>
            </div>
          </motion.div>

          {/* Rooms Preview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-5 gap-3"
          >
            {[
              { name: 'Misdirected Pattern', color: 'bg-red-500/20 border-red-500', icon: '🔴' },
              { name: 'Double-Lie Object', color: 'bg-yellow-500/20 border-yellow-500', icon: '🟡' },
              { name: 'Crowd Paradox', color: 'bg-green-500/20 border-green-500', icon: '🟢' },
              { name: 'Confidence Collapse', color: 'bg-blue-500/20 border-blue-500', icon: '🔵' },
              { name: 'Final Intel Trap', color: 'bg-purple-500/20 border-purple-500', icon: '🟣' },
            ].map((room, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + idx * 0.1, type: 'spring' }}
                className={`${room.color} border-2 rounded-lg p-4 text-center`}
              >
                <div className="text-3xl mb-2">{room.icon}</div>
                <div className="text-lg mb-1">{idx + 1}</div>
                <div className="text-xs text-gray-300">{room.name}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Start Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 hover:from-red-500 hover:via-purple-500 hover:to-pink-500 px-16 py-5 rounded-full text-2xl transition-all shadow-lg shadow-red-500/50"
          >
            ENTER THE DECEPTION
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-gray-500 text-sm italic"
          >
            Only the brilliant survive. The rest become statistics.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}