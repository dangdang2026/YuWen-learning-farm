import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore, fishes } from '../store/gameStore';
import { ArrowLeft, Home, Anchor, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FishingGame() {
  const navigate = useNavigate();
  const { userProgress, collectFish, useFishingChance } = useGameStore();
  const [fishingState, setFishingState] = useState<'idle' | 'casting' | 'waiting' | 'bite' | 'catch'>('idle');
  const [caughtFish, setCaughtFish] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [catchPosition, setCatchPosition] = useState({ x: 50, y: 50 });
  const [currentPage, setCurrentPage] = useState(1);
  const fishingStateRef = useRef(fishingState);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(fishes.length / itemsPerPage);

  useEffect(() => {
    fishingStateRef.current = fishingState;
  }, [fishingState]);

  useEffect(() => {
    let biteTimeout: NodeJS.Timeout;
    
    if (fishingState === 'waiting') {
      biteTimeout = setTimeout(() => {
        const success = Math.random() < 0.9;
        
        if (success) {
          const randomX = 20 + Math.random() * 60;
          const randomY = 30 + Math.random() * 40;
          setCatchPosition({ x: randomX, y: randomY });
          setFishingState('bite');
          
          setTimeout(() => {
            if (fishingStateRef.current === 'bite') {
              setFishingState('idle');
              setShowMessage('下次继续努力！');
              setTimeout(() => setShowMessage(null), 2000);
            }
          }, 3000);
        } else {
          setFishingState('waiting');
          setShowMessage('这次没钓到鱼，再试试吧！');
          useFishingChance();
          setTimeout(() => setShowMessage(null), 2000);
        }
      }, 2000 + Math.random() * 2000);
    }

    return () => {
      if (biteTimeout) clearTimeout(biteTimeout);
    };
  }, [fishingState, useFishingChance]);

  const handleCastLine = () => {
    if (userProgress.fishingChances <= 0) {
      setShowMessage('先去答题获得钓鱼机会吧！');
      setTimeout(() => setShowMessage(null), 2000);
      return;
    }
    
    const used = useFishingChance();
    if (!used) {
      setShowMessage('没有钓鱼机会了！先去答题吧！');
      setTimeout(() => setShowMessage(null), 2000);
      return;
    }
    
    setFishingState('casting');
    setCaughtFish(null);
    
    setTimeout(() => {
      setFishingState('waiting');
    }, 500);
  };

  const handleCatch = () => {
    const availableFish = fishes.filter(f => !userProgress.collectedFish.includes(f.id));
    
    if (availableFish.length === 0) {
      setShowMessage('太棒了！你已经收集了所有鱼！');
      setFishingState('idle');
      setTimeout(() => setShowMessage(null), 3000);
      return;
    }

    const weights = availableFish.map(f => {
      switch (f.rarity) {
        case 'common': return 60;
        case 'rare': return 30;
        case 'legendary': return 10;
        default: return 50;
      }
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = Math.random() * totalWeight;
    let selectedFish = availableFish[0];

    for (let i = 0; i < availableFish.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedFish = availableFish[i];
        break;
      }
    }

    setCaughtFish(selectedFish.id);
    collectFish(selectedFish.id);
    setFishingState('catch');

    setTimeout(() => {
      setShowMessage(`恭喜钓到了 ${selectedFish.emoji} ${selectedFish.name}！`);
      setTimeout(() => {
        setShowMessage(null);
        setFishingState('idle');
        setCaughtFish(null);
      }, 3000);
    }, 1000);
  };

  const collectedFishData = fishes.filter(f => userProgress.collectedFish.includes(f.id));
  const maxFishPerTank = 20;
  const maxTanks = 10;
  const totalFishInAllTanks = collectedFishData.length;
  const fullTanks = Math.floor(totalFishInAllTanks / maxFishPerTank);
  const fishInCurrentTank = totalFishInAllTanks % maxFishPerTank;

  const paginatedFishes = fishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-100 to-cyan-100 relative overflow-hidden">
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-300 to-transparent"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      <div className="absolute top-20 left-10 text-4xl opacity-50">
        ☀️
      </div>
      <div className="absolute top-32 right-20 text-3xl opacity-50">
        ☁️
      </div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-blue-300 rounded-full opacity-30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${60 + Math.random() * 20}%`
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 2,
            delay: i * 0.5
          }}
        >
          🐟
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <Home className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700">首页</span>
          </motion.button>

          <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            <span className="text-3xl">🎣</span>
            钓鱼池塘
          </h1>

          <div className="w-24" />
        </div>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl"
          >
            <p className="text-lg font-bold text-blue-600">{showMessage}</p>
          </motion.div>
        )}

        <div className="max-w-lg mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">已收集鱼类</p>
                <p className="text-2xl font-bold text-blue-600">
                  {collectedFishData.length} 条
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">钓鱼机会</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {userProgress.fishingChances}
                </p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((collectedFishData.length / 200) * 100, 100)}%` }}
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
              />
            </div>

            <p className="text-xs text-gray-500 text-center">
              💡 每答对3道题获得1次钓鱼机会 | 已收集 {collectedFishData.length}/200 条鱼
            </p>
          </div>

          <div className="relative bg-gradient-to-b from-sky-200 to-blue-300 rounded-3xl shadow-xl overflow-hidden h-80 mb-6">
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{
                  rotate: fishingState === 'casting' ? 45 : 0,
                }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="relative"
              >
                <div className="w-2 h-60 bg-gradient-to-b from-amber-600 to-amber-400 rounded-full" />
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"
                  animate={{
                    y: fishingState === 'waiting' ? Math.sin(Date.now() / 500) * 2 : 0,
                  }}
                />
              </motion.div>
            </div>

            {fishingState === 'idle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-6xl mb-4"
                  >
                    🎣
                  </motion.div>
                  <p className="text-white font-bold">点击按钮开始钓鱼！</p>
                </div>
              </motion.div>
            )}

            {fishingState === 'waiting' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-white font-bold"
                >
                  静静等待中...
                </motion.div>
              </motion.div>
            )}

            {fishingState === 'bite' && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${catchPosition.x}%`,
                  top: `${catchPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={handleCatch}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="relative"
                >
                  <div className="text-7xl animate-bounce">🐟</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-2 px-4 rounded-full shadow-lg whitespace-nowrap"
                  >
                    快！点击抓鱼！3秒后跑掉！
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {fishingState === 'catch' && caughtFish && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-8xl mb-4">
                    {fishes.find(f => f.id === caughtFish)?.emoji}
                  </div>
                  <p className="text-white font-bold text-xl">
                    钓到了！
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCastLine}
            disabled={fishingState !== 'idle'}
            className={`w-full font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 ${
              fishingState === 'idle'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Anchor className="w-5 h-5" />
            {fishingState === 'idle' ? '甩竿钓鱼' : '钓鱼中...'}
          </motion.button>

          <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
            <h2 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
              🐠 鱼类图鉴 ({collectedFishData.length}条)
            </h2>
            
            <div className="grid grid-cols-5 gap-2">
              {paginatedFishes.map((fish) => {
                const isCollected = userProgress.collectedFish.includes(fish.id);
                
                return (
                  <motion.div
                    key={fish.id}
                    whileHover={{ scale: 1.05 }}
                    className={`p-2 rounded-xl text-center border-2 ${
                      isCollected
                        ? fish.rarity === 'legendary'
                          ? 'bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-400'
                          : fish.rarity === 'rare'
                            ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-400'
                            : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300'
                        : 'bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className={`text-2xl mb-1 ${isCollected ? '' : 'grayscale opacity-50'}`}>
                      {isCollected ? fish.emoji : '❓'}
                    </div>
                    <p className={`text-xs font-bold ${isCollected ? 'text-blue-700' : 'text-gray-400'}`}>
                      {isCollected ? fish.name : '???'}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <span className="text-sm text-gray-600 font-medium">
                  {currentPage} / {totalPages}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-600 mb-3">🏠 鱼缸收藏（每20条点亮一个）</h3>
              <div className="flex gap-2 flex-wrap">
                {[...Array(maxTanks)].map((_, i) => {
                  const isActive = i < fullTanks || (i === fullTanks && fishInCurrentTank > 0);
                  const tankFishCount = i < fullTanks ? maxFishPerTank : fishInCurrentTank;
                  
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-400 to-cyan-500 border-blue-300 shadow-lg'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      {isActive ? (
                        <div className="text-center">
                          <span className="text-xl">🏠</span>
                          <p className="text-xs text-white font-bold">{tankFishCount}</p>
                        </div>
                      ) : (
                        <span className="text-gray-300">🏠</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {fullTanks}个满缸（每缸{maxFishPerTank}条）
                {fishInCurrentTank > 0 && fullTanks < maxTanks && ` + ${fishInCurrentTank}条（进行中）`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
