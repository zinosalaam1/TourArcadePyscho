import { useState } from 'react';
import { motion } from 'motion/react';
import { User, ArrowRight, Eye, AlertTriangle } from 'lucide-react';

interface UsernameEntryProps {
  onUsernameSubmit: (username: string) => void;
}

export function UsernameEntry({ onUsernameSubmit }: UsernameEntryProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = username.trim();
    
    if (!trimmed) {
      setError('Username is required');
      return;
    }
    
    if (trimmed.length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }
    
    if (trimmed.length > 20) {
      setError('Username must be 20 characters or less');
      return;
    }
    
    onUsernameSubmit(trimmed);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center space-y-8">
          {/* Icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className="w-20 h-20 text-purple-400" />
              </motion.div>
            </div>
            <h1 className="text-6xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              🎭 THE GRAND DECEPTION
            </h1>
            <p className="text-purple-300 text-xl tracking-widest">
              IDENTIFY YOURSELF
            </p>
          </motion.div>

          {/* Username Input Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 space-y-6"
          >
            <div className="flex items-center justify-center gap-3 text-purple-400 mb-6">
              <User className="w-6 h-6" />
              <p className="text-lg">Enter your name to begin</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="Your username..."
                maxLength={20}
                className="w-full bg-black/60 border-2 border-purple-500/50 rounded-lg px-6 py-4 text-white text-xl text-center placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-purple-500/10 transition-all"
                autoFocus
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 text-red-400 text-sm"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              <div className="text-gray-500 text-xs text-center">
                2-20 characters
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!username.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-8 py-4 rounded-full text-xl transition-all shadow-lg flex items-center justify-center gap-3"
            >
              CONTINUE
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4"
          >
            <p className="text-orange-300 text-sm">
              ⚠️ Warning: Only the brilliant survive. Any wrong answer results in instant elimination.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-500 text-sm italic"
          >
            Your name will be recorded in the halls of victory... or elimination.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}