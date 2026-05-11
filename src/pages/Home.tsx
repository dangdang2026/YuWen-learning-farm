import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore, plants, fishes } from '../store/gameStore';
import { Flower, Fish, Trophy, Star, Sparkles, RotateCcw } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { userProgress, resetProgress } = useGameStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const unlockedPlants = plants.filter(p => userProgress.unlockedPlants.includes(p.id));
  const collectedFish = fishes.filter(f => userProgress.collectedFish.includes(f.id));

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-green-100" />
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-sky-300 to-transparent opacity-50" />
      
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-20 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 rounded-full opacity-60 animate-bounce" />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowResetConfirm(true)}
        className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg"
        title="清零记录"
      >
        <RotateCcw className="w-6 h-6 text-gray-600" />
      </motion.button>

      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm mx-4"
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">确认清零？</h3>
                <p className="text-gray-600 text-sm">
                  即将清除所有学习记录，包括：
                </p>
                <ul className="text-left text-sm text-gray-600 mt-2 space-y-1">
                  <li>• {userProgress.totalScore} 金币</li>
                  <li>• {unlockedPlants.length} 个已解锁植物</li>
                  <li>• {collectedFish.length} 条已收集鱼类</li>
                  <li>• {userProgress.completedModules.length} 个已完成模块</li>
                </ul>
                <p className="text-red-600 text-sm mt-3 font-bold">
                  此操作不可恢复！
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                >
                  确认清零
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl mb-4"
            >
              🌻
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-4 drop-shadow-lg">
            一年级下《语文》复习小农场
          </h1>
          <p className="text-xl text-green-700 mb-2">欢迎来到开心的学习农场！</p>
          <p className="text-base text-green-600">在这里你可以学习知识、玩游戏、收集可爱的小植物和小鱼~</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-yellow-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-600">{userProgress.totalScore}</span>
            </div>
            <p className="text-sm text-gray-600">金币总数</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-green-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Flower className="w-6 h-6 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{unlockedPlants.length}</span>
            </div>
            <p className="text-sm text-gray-600">已解锁植物</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-blue-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Fish className="w-6 h-6 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{collectedFish.length}</span>
            </div>
            <p className="text-sm text-gray-600">已收集鱼类</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/mindmap')}
            className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold py-6 px-12 rounded-3xl shadow-xl"
          >
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6" />
            开始学习
          </motion.button>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/farm')}
              className="bg-gradient-to-br from-green-400 to-green-600 text-white font-bold py-4 px-4 rounded-2xl shadow-lg flex flex-col items-center gap-1"
            >
              <span className="text-2xl">🌱</span>
              <span className="text-sm">我的农场</span>
              <span className="text-xs opacity-80">已学{userProgress.completedModules.length}个任务</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/fishing')}
              className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold py-4 px-4 rounded-2xl shadow-lg flex flex-col items-center gap-1"
            >
              <span className="text-2xl">🎣</span>
              <span className="text-sm">钓鱼池塘</span>
              <span className="text-xs opacity-80">机会:{userProgress.fishingChances}</span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(147, 51, 234, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/collection')}
            className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-bold py-5 px-8 rounded-3xl shadow-xl flex items-center justify-center gap-3"
          >
            <Trophy className="w-6 h-6" />
            <span>成就展示</span>
            <span className="opacity-90 text-base">
              ({userProgress.totalAnswered > 0 
                ? Math.round((userProgress.totalCorrect / userProgress.totalAnswered) * 100) 
                : 0}% 正确率)
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>🎯 学习知识 → 答对题目 → 获得奖励 → 解锁更多内容</p>
        </motion.div>
      </div>
    </div>
  );
}
