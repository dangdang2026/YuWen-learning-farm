import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore, plants } from '../store/gameStore';
import { ArrowLeft, Home, Droplets, Sun, Sparkles } from 'lucide-react';

export default function FarmGame() {
  const navigate = useNavigate();
  const { userProgress } = useGameStore();

  const unlockedPlants = plants.filter(p => userProgress.unlockedPlants.includes(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-amber-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>☀️</div>
        <div className="absolute top-20 right-20 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>☁️</div>
        <div className="absolute top-40 left-1/4 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🦋</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <Home className="w-5 h-5 text-green-600" />
            <span className="text-green-700">首页</span>
          </motion.button>

          <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <span className="text-3xl">🌻</span>
            我的小农场
          </h1>

          <div className="w-24" />
        </div>

        <div className="text-center mb-6">
          <p className="text-green-600">完成学习任务，解锁更多可爱的植物！</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            农场统计
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{unlockedPlants.length}</p>
              <p className="text-sm text-gray-500">已解锁</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-amber-600">{plants.length - unlockedPlants.length}</p>
              <p className="text-sm text-gray-500">待解锁</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{userProgress.completedModules.length}</p>
              <p className="text-sm text-gray-500">完成模块</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-green-200 to-amber-200 rounded-3xl shadow-xl p-6 mb-6 border-4 border-amber-300">
          <div className="grid grid-cols-4 gap-4">
            {plants.map((plant, index) => {
              const isUnlocked = userProgress.unlockedPlants.includes(plant.id);
              
              return (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${isUnlocked ? '' : 'grayscale opacity-50'}`}
                >
                  <div className={`bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-4 text-center border-2 ${
                    isUnlocked ? 'border-green-400' : 'border-gray-300'
                  }`}>
                    {isUnlocked ? (
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          delay: index * 0.2
                        }}
                        className="text-5xl mb-2"
                      >
                        {plant.emoji}
                      </motion.div>
                    ) : (
                      <div className="text-5xl mb-2 opacity-50">
                        🔒
                      </div>
                    )}
                    
                    <p className={`font-bold text-sm ${isUnlocked ? 'text-green-700' : 'text-gray-500'}`}>
                      {plant.name}
                    </p>
                    
                    {isUnlocked && (
                      <div className="flex justify-center gap-1 mt-2">
                        {[1, 2, 3].map((stage) => (
                          <div
                            key={stage}
                            className={`w-2 h-2 rounded-full ${
                              stage <= plant.growthStage 
                                ? 'bg-green-500' 
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-xl px-2 py-1">
                        <p className="text-white text-xs">完成学习解锁</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            农场小贴士
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
              <span className="text-2xl">🥬</span>
              <div>
                <p className="font-bold text-green-700">小白菜</p>
                <p className="text-sm text-gray-600">完成任意一个模块即可解锁！</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
              <span className="text-2xl">🌻</span>
              <div>
                <p className="font-bold text-amber-700">向日葵</p>
                <p className="text-sm text-gray-600">完成"同音字"模块解锁！</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
              <span className="text-2xl">🌈</span>
              <div>
                <p className="font-bold text-purple-700">彩虹花</p>
                <p className="text-sm text-gray-600">完成所有模块解锁！</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/mindmap')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg inline-flex items-center gap-2"
          >
            <Droplets className="w-5 h-5" />
            去学习解锁更多植物
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
