import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore, plants, fishes } from '../store/gameStore';
import { ArrowLeft, Home, Trophy, Medal, Crown, Star, Sparkles } from 'lucide-react';

const badges = [
  { id: 'hanzi', name: '汉字小达人', emoji: '🏅' },
  { id: 'ciyu', name: '词语小专家', emoji: '🥇' },
  { id: 'gushi', name: '古诗小诗人', emoji: '📜' },
  { id: 'jufang', name: '句子小作家', emoji: '✍️' },
  { id: 'kewen', name: '课文背诵家', emoji: '📖' },
  { id: 'xiaoke', name: '语文小百科', emoji: '🔡' },
];

export default function Collection() {
  const navigate = useNavigate();
  const { userProgress } = useGameStore();

  const unlockedPlants = plants.filter(p => userProgress.unlockedPlants.includes(p.id));
  const collectedFish = fishes.filter(f => userProgress.collectedFish.includes(f.id));
  const earnedBadges = badges.filter(b => userProgress.earnedBadges.includes(b.id));

  const completionRate = Math.round(
    ((unlockedPlants.length + collectedFish.length + earnedBadges.length) / 
    (plants.length + fishes.length + badges.length)) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-40 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-40 animate-bounce" />
      <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-40" />

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <Home className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700">首页</span>
          </motion.button>

          <h1 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            成就展示
          </h1>

          <div className="w-24" />
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-5 text-center"
          >
            <div className="inline-block mb-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl"
              >
                {completionRate === 100 ? '👑' : completionRate >= 50 ? '🏆' : '⭐'}
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
              {completionRate === 100 ? '全收集达成！' : 
               completionRate >= 50 ? '继续加油！' : '刚刚开始'}
            </h2>
            <p className="text-gray-600 mb-3 text-sm">
              总体完成度
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 1 }}
                className={`h-full rounded-full ${
                  completionRate === 100 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                  'bg-gradient-to-r from-purple-400 to-pink-500'
                }`}
              />
            </div>
            <p className="text-xl font-bold text-purple-600">{completionRate}%</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <h3 className="font-bold text-green-700 text-base">植物收藏</h3>
                  <p className="text-xs text-gray-500">{unlockedPlants.length}/{plants.length}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="relative w-full h-32 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl overflow-hidden border-2 border-green-200">
                  {unlockedPlants.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      还没有解锁任何植物
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      {unlockedPlants.map((plant) => {
                        const randomX = useMemo(() => Math.random() * 70 + 5, []);
                        const randomY = useMemo(() => Math.random() * 60 + 10, []);
                        const randomRotate = useMemo(() => Math.random() * 40 - 20, []);
                        
                        return (
                          <motion.div
                            key={plant.id}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: randomRotate }}
                            whileHover={{ scale: 1.3, zIndex: 10 }}
                            className="absolute"
                            style={{ left: `${randomX}%`, top: `${randomY}%` }}
                          >
                            <span className="text-3xl drop-shadow-lg">{plant.emoji}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                {unlockedPlants.map(plant => (
                  <div key={plant.id} className="flex items-center gap-2 text-xs">
                    <span>{plant.emoji}</span>
                    <span className="text-gray-700">{plant.name}</span>
                  </div>
                ))}
                {unlockedPlants.length === 0 && (
                  <p className="text-xs text-gray-400 italic">还没有解锁任何植物</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🐟</span>
                </div>
                <div>
                  <h3 className="font-bold text-blue-700 text-base">鱼类收藏</h3>
                  <p className="text-xs text-gray-500">{collectedFish.length}/{fishes.length}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="relative w-full h-32 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl overflow-hidden border-2 border-blue-200">
                  {collectedFish.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      还没有收集任何鱼
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      {collectedFish.map((fish) => {
                        const randomX = useMemo(() => Math.random() * 70 + 5, []);
                        const randomY = useMemo(() => Math.random() * 60 + 10, []);
                        const randomRotate = useMemo(() => Math.random() * 40 - 20, []);
                        
                        return (
                          <motion.div
                            key={fish.id}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: randomRotate }}
                            whileHover={{ scale: 1.3, zIndex: 10 }}
                            className="absolute"
                            style={{ left: `${randomX}%`, top: `${randomY}%` }}
                          >
                            <span className="text-3xl drop-shadow-lg">{fish.emoji}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                {collectedFish.map(fish => (
                  <div key={fish.id} className="flex items-center gap-1.5 text-xs">
                    <span>{fish.emoji}</span>
                    <span className="text-gray-700">{fish.name}</span>
                    <span className={`text-[10px] px-1 rounded ${
                      fish.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' :
                      fish.rarity === 'rare' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {fish.rarity === 'legendary' ? '传说' : fish.rarity === 'rare' ? '稀有' : '普通'}
                    </span>
                  </div>
                ))}
                {collectedFish.length === 0 && (
                  <p className="text-xs text-gray-400 italic">还没有收集任何鱼</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Medal className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-700 text-base">学习徽章</h3>
                  <p className="text-xs text-gray-500">{earnedBadges.length}/{badges.length}</p>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                {badges.map(badge => {
                  const isEarned = userProgress.earnedBadges.includes(badge.id);
                  
                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-2.5 rounded-lg flex items-center gap-2 ${
                        isEarned
                          ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300'
                          : 'bg-gray-50 border-2 border-gray-200'
                      }`}
                    >
                      <span className={`text-3xl ${!isEarned ? 'grayscale opacity-50' : ''}`}>
                        {isEarned ? badge.emoji : '🔒'}
                      </span>
                      <div>
                        <p className={`font-bold text-sm ${isEarned ? 'text-amber-700' : 'text-gray-400'}`}>
                          {badge.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {isEarned ? '已获得' : '完成对应模块解锁'}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5"
          >
            <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4" />
              学习统计
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{userProgress.totalScore}</p>
                <p className="text-xs text-gray-500">总金币</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">{userProgress.completedModules.length}</p>
                <p className="text-xs text-gray-500">完成模块</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">{userProgress.totalCorrect}</p>
                <p className="text-xs text-gray-500">答对题数</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {userProgress.totalAnswered > 0 
                    ? Math.round((userProgress.totalCorrect / userProgress.totalAnswered) * 100)
                    : 0}%
                </p>
                <p className="text-xs text-gray-500">正确率</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-5 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/mindmap')}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg inline-flex items-center gap-2 text-base"
            >
              <Star className="w-4 h-4" />
              继续学习
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
