import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { knowledgeModules } from '../data/modules';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Home, BookOpen, CheckCircle } from 'lucide-react';

export default function MindMap() {
  const navigate = useNavigate();
  const { userProgress } = useGameStore();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const getModuleProgress = (moduleId: string) => {
    const module = knowledgeModules.find(m => m.id === moduleId);
    if (!module) return 0;
    const totalQuizzes = module.children.reduce((sum, child) => sum + child.quizzes.length, 0);
    const completedQuizzes = userProgress.completedModules.includes(moduleId) ? totalQuizzes : 0;
    return totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-green-200/50 to-transparent" />
      
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
            <BookOpen className="w-6 h-6" />
            知识导图
          </h1>

          <div className="w-24" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-2">
            📚 一年级下语文1-4单元复习
          </h2>
          <p className="text-green-600">点击模块查看详情，开始学习吧！</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {knowledgeModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer border-4 ${
                  expandedModule === module.id 
                    ? 'border-green-400 shadow-green-200' 
                    : 'border-transparent hover:border-green-300'
                }`}
              >
                <div className={`bg-gradient-to-r ${module.color} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{module.icon}</span>
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{module.title}</h3>
                    </div>
                    {userProgress.completedModules.includes(module.id) && (
                      <CheckCircle className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {module.children.length} 个知识点
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {getModuleProgress(module.id)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getModuleProgress(module.id)}%` }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className={`h-full rounded-full ${
                        getModuleProgress(module.id) === 100 
                          ? 'bg-green-500' 
                          : 'bg-gradient-to-r from-green-400 to-emerald-500'
                      }`}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {module.children.slice(0, 3).map(child => (
                      <span
                        key={child.id}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {child.title}
                      </span>
                    ))}
                    {module.children.length > 3 && (
                      <span className="text-xs text-gray-400 px-2 py-1">
                        +{module.children.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>

              {expandedModule === module.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 border-2 border-green-200"
                >
                  <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    选择要学习的内容
                  </h4>
                  <div className="grid gap-2">
                    {module.children.map(child => (
                      <motion.button
                        key={child.id}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/learn/${module.id}`)}
                        className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl text-left border border-green-100 hover:border-green-300 transition-colors"
                      >
                        <span className="text-2xl">{module.icon}</span>
                        <div className="flex-1">
                          <p className="font-bold text-green-800">{child.title}</p>
                          <p className="text-xs text-gray-500">{child.quizzes.length} 道练习题</p>
                        </div>
                        <span className="text-green-500">→</span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/learn/${module.id}`)}
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    开始学习 {module.title}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-green-600 text-sm">
            💡 完成所有模块学习，解锁彩虹花和更多奖励！
          </p>
        </motion.div>
      </div>
    </div>
  );
}
