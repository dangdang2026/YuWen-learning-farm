import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getModuleById } from '../data/modules';
import { getQuizzesByModule, QuizQuestion } from '../data/quizzes';
import { useGameStore } from '../store/gameStore';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { ArrowLeft, Home, Star, CheckCircle, XCircle, Sparkles, Trophy, Fish, RotateCcw, Mic, MicOff } from 'lucide-react';

type QuizState = 'learning' | 'quiz' | 'result' | 'complete';

export default function Learn() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { addScore, completeModule, updateStreak, userProgress, collectFish, addFishingChance } = useGameStore();
  
  const [state, setState] = useState<QuizState>('learning');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [fillAnswer, setFillAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [earnedReward, setEarnedReward] = useState(0);
  const [showFish, setShowFish] = useState(false);
  const [quizHistory, setQuizHistory] = useState<{ correct: boolean; question: string }[]>([]);
  const [correctInModule, setCorrectInModule] = useState(0);
  const [hasRetry, setHasRetry] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);

  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error: speechError
  } = useSpeechRecognition();

  const module = moduleId ? getModuleById(moduleId) : null;
  const quizzes = moduleId ? getQuizzesByModule(moduleId) : [];
  const currentQuiz = quizzes[currentQuizIndex];

  useEffect(() => {
    if (transcript && currentQuiz && currentQuiz.type === 'fill') {
      setFillAnswer(transcript);
    }
  }, [transcript, currentQuiz]);

  useEffect(() => {
    if (quizzes.length > 0) {
      const completedCount = quizHistory.length;
      if (completedCount >= quizzes.length) {
        setState('complete');
      }
    }
  }, [quizHistory, quizzes.length]);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">模块未找到</p>
      </div>
    );
  }

  const handleStartQuiz = () => {
    setState('quiz');
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setFillAnswer('');
    setIsCorrect(null);
    setQuizHistory([]);
    setCorrectInModule(0);
    setHasRetry(false);
  };

  const checkFillAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    const normalize = (s: string) => 
      s.replace(/[\s，。、？！""'']/g, '').toLowerCase();
    
    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(correctAnswer);
    
    if (normalizedUser === normalizedCorrect) return true;
    
    if (normalizedCorrect.length <= 2) {
      return normalizedUser === normalizedCorrect;
    }
    
    const distance = levenshteinDistance(normalizedUser, normalizedCorrect);
    return distance <= 1;
  };

  const levenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  };

  const handleFillSubmit = () => {
    if (!fillAnswer.trim() || selectedAnswer !== null) return;
    
    const correct = typeof currentQuiz.correctAnswer === 'string' && 
                    checkFillAnswer(fillAnswer, currentQuiz.correctAnswer);
    
    setSelectedAnswer(1);
    setIsCorrect(correct);

    if (!correct && !hasRetry) {
      setShowWrongAnswer(true);
      return;
    }

    updateStreak(correct);

    setTimeout(() => {
      if (correct) {
        const newCorrectInModule = correctInModule + 1;
        setCorrectInModule(newCorrectInModule);
        
        const streak = userProgress.currentStreak + 1;
        const reward = currentQuiz.reward + (Math.floor(streak / 3) * 5);
        setEarnedReward(reward);
        addScore(reward);
        setShowReward(true);
        
        if (newCorrectInModule > 0 && newCorrectInModule % 3 === 0) {
          addFishingChance();
          setShowFish(true);
        }
        
        setQuizHistory(prev => [...prev, { correct: true, question: currentQuiz.question }]);
      } else {
        setCorrectInModule(0);
        setQuizHistory(prev => [...prev, { correct: false, question: currentQuiz.question }]);
      }

      setTimeout(() => {
        setShowReward(false);
        setShowFish(false);
        
        if (currentQuizIndex < quizzes.length - 1) {
          setCurrentQuizIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setFillAnswer('');
          setIsCorrect(null);
          setHasRetry(false);
        } else {
          completeModule(moduleId!);
          setState('complete');
        }
      }, 1500);
    }, 1000);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuiz.correctAnswer;
    setIsCorrect(correct);

    if (!correct && !hasRetry) {
      setShowWrongAnswer(true);
      return;
    }

    updateStreak(correct);

    setTimeout(() => {
      if (correct) {
        const newCorrectInModule = correctInModule + 1;
        setCorrectInModule(newCorrectInModule);
        
        const streak = userProgress.currentStreak + 1;
        const reward = currentQuiz.reward + (Math.floor(streak / 3) * 5);
        setEarnedReward(reward);
        addScore(reward);
        setShowReward(true);
        
        if (newCorrectInModule > 0 && newCorrectInModule % 3 === 0) {
          addFishingChance();
          setShowFish(true);
        }
        
        setQuizHistory(prev => [...prev, { correct: true, question: currentQuiz.question }]);
      } else {
        setCorrectInModule(0);
        setQuizHistory(prev => [...prev, { correct: false, question: currentQuiz.question }]);
      }

      setTimeout(() => {
        setShowReward(false);
        setShowFish(false);
        
        if (currentQuizIndex < quizzes.length - 1) {
          setCurrentQuizIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setFillAnswer('');
          setIsCorrect(null);
          setHasRetry(false);
        } else {
          completeModule(moduleId!);
          setState('complete');
        }
      }, 1500);
    }, 1000);
  };

  const handleRetry = () => {
    setShowWrongAnswer(false);
    setSelectedAnswer(null);
    setFillAnswer('');
    setIsCorrect(null);
    setHasRetry(true);
    resetTranscript();
  };

  const handleFishClick = () => {
    const availableFish = ['goldfish', 'clownfish', 'octopus', 'shark', 'dolphin', 'mermaid'];
    const uncollected = availableFish.filter(f => !userProgress.collectedFish.includes(f));
    
    if (uncollected.length > 0) {
      const randomFish = uncollected[Math.floor(Math.random() * uncollected.length)];
      collectFish(randomFish);
      setShowFish(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 relative overflow-hidden">
      {showReward && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-center"
          >
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl font-bold text-green-600 mb-2">太棒了！</p>
            <p className="text-xl text-yellow-600 flex items-center justify-center gap-2">
              <Star className="w-6 h-6" />
              +{earnedReward} 金币
            </p>
          </motion.div>
        </motion.div>
      )}

      {showFish && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-center cursor-pointer"
            onClick={handleFishClick}
          >
            <div className="text-6xl mb-4 animate-bounce">🐟</div>
            <p className="text-xl font-bold text-blue-600 mb-2">有鱼上钩了！</p>
            <p className="text-sm text-gray-500">点击抓取！</p>
          </motion.div>
        </motion.div>
      )}

      {showWrongAnswer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-2xl max-w-md mx-4"
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">🤔</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">答错了！</h3>
              <p className="text-gray-600 text-sm mb-3">
                没关系，再给你一次机会！<br/>
                <span className="text-green-600 font-bold">还有1次重试机会</span>
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRetry}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              再试一次
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/mindmap')}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-green-600" />
            <span className="text-green-700">返回</span>
          </motion.button>

          <div className="flex items-center gap-2">
            <span className="text-3xl">{module.icon}</span>
            <h1 className="text-xl font-bold text-green-800">{module.title}</h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <Home className="w-5 h-5 text-green-600" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {state === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                  📖 {module.title} 知识点
                </h2>

                <div className="space-y-6">
                  {module.children.map((node, index) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100"
                    >
                      <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full" />
                        {node.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
                        {node.content}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-gray-500">💡 例句：</p>
                        {node.examples.map((example, i) => (
                          <p key={i} className="text-gray-600 italic bg-white/50 rounded-lg px-3 py-2">
                            {example}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartQuiz}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold py-6 rounded-3xl shadow-xl flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                开始答题练习 ({quizzes.length}道题)
              </motion.button>
            </motion.div>
          )}

          {state === 'quiz' && currentQuiz && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-700 font-bold">
                    第 {currentQuizIndex + 1} / {quizzes.length} 题
                    {hasRetry && <span className="ml-2 text-xs text-orange-500">(已重试)</span>}
                  </span>
                  <span className="text-yellow-600 flex items-center gap-1">
                    <Star className="w-5 h-5" />
                    +{currentQuiz.reward}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    currentQuiz.type === 'choice' ? 'bg-blue-100 text-blue-600' : 
                    currentQuiz.type === 'judgment' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {currentQuiz.type === 'choice' ? '选择题' : 
                     currentQuiz.type === 'judgment' ? '判断题' : '填空题'}
                  </span>
                  {!hasRetry && <span className="text-xs text-green-600">💡 答错可重试1次</span>}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                  {currentQuiz.question}
                </h3>

                {currentQuiz.type === 'fill' ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
                      <p className="text-sm text-purple-600 mb-3">💡 支持语音输入或手动输入</p>
                      
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={fillAnswer}
                          onChange={(e) => setFillAnswer(e.target.value)}
                          placeholder="请输入答案..."
                          disabled={selectedAnswer !== null}
                          className={`flex-1 px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                            selectedAnswer !== null
                              ? isCorrect
                                ? 'bg-green-100 border-2 border-green-500 text-green-700'
                                : 'bg-red-100 border-2 border-red-500 text-red-700'
                              : 'bg-white border-2 border-purple-300 focus:border-purple-500 text-gray-700'
                          }`}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && selectedAnswer === null) {
                              handleFillSubmit();
                            }
                          }}
                        />
                        
                        {isSupported && selectedAnswer === null && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={isListening ? stopListening : startListening}
                            className={`px-4 py-3 rounded-xl font-bold transition-all ${
                              isListening
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-purple-500 text-white'
                            }`}
                          >
                            {isListening ? (
                              <div className="flex items-center gap-2">
                                <MicOff className="w-5 h-5" />
                                <span>停止</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Mic className="w-5 h-5" />
                                <span>语音</span>
                              </div>
                            )}
                          </motion.button>
                        )}
                      </div>

                      {isListening && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-center gap-2 text-purple-600"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="w-3 h-3 bg-purple-500 rounded-full"
                          />
                          <span className="text-sm">正在聆听，请说出答案...</span>
                        </motion.div>
                      )}

                      {transcript && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-sm text-purple-600"
                        >
                          识别结果：{transcript}
                        </motion.p>
                      )}

                      {speechError && (
                        <p className="mt-2 text-sm text-red-500">{speechError}</p>
                      )}
                    </div>

                    {selectedAnswer !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl ${
                          isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                        }`}
                      >
                        <p className={`font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {isCorrect ? '✅ 回答正确！' : '❌ 回答错误'}
                        </p>
                        <p className="text-gray-600 text-sm">{currentQuiz.explanation}</p>
                        {!isCorrect && (
                          <p className="text-green-600 text-sm mt-2">
                            正确答案：{currentQuiz.correctAnswer}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {selectedAnswer === null && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFillSubmit}
                        disabled={!fillAnswer.trim()}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                          fillAnswer.trim()
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        提交答案
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentQuiz.options?.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center gap-3 ${
                          selectedAnswer === null
                            ? 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-emerald-50 border-2 border-transparent hover:border-green-300'
                            : selectedAnswer === index
                              ? isCorrect
                                ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                : 'bg-red-100 border-2 border-red-500 text-red-800'
                              : index === currentQuiz.correctAnswer
                                ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                : 'bg-gray-100 border-2 border-transparent opacity-50'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          selectedAnswer === index
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {selectedAnswer !== null && index === currentQuiz.correctAnswer ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : selectedAnswer === index && !isCorrect ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </span>
                        <span className="flex-1">{option}</span>
                      </motion.button>
                    ))}

                    {selectedAnswer !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-4 rounded-2xl ${
                          isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                        }`}
                      >
                        <p className={`font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {isCorrect ? '✅ 回答正确！' : '❌ 回答错误'}
                        </p>
                        <p className="text-gray-600 text-sm">{currentQuiz.explanation}</p>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {state === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-8xl mb-6"
                >
                  🏆
                </motion.div>

                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-4">
                  恭喜完成！
                </h2>
                
                <p className="text-xl text-gray-600 mb-6">
                  你已经完成了 {module.title} 的全部学习！
                </p>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-green-700 mb-4">📊 学习成果</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-3xl font-bold text-green-600">
                        {quizHistory.filter(q => q.correct).length}/{quizHistory.length}
                      </p>
                      <p className="text-sm text-gray-500">答对题目</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-3xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                        <Star className="w-6 h-6" />
                        {Math.round((quizHistory.filter(q => q.correct).length / Math.max(quizHistory.length, 1)) * 100)}%
                      </p>
                      <p className="text-sm text-gray-500">正确率</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/mindmap')}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg"
                  >
                    返回知识导图
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/')}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 rounded-2xl shadow-lg"
                  >
                    返回首页
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
