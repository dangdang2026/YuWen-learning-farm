import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProgress {
  totalScore: number;
  completedModules: string[];
  unlockedPlants: string[];
  collectedFish: string[];
  earnedBadges: string[];
  currentStreak: number;
  totalCorrect: number;
  totalAnswered: number;
  fishingChances: number;
}

export interface Plant {
  id: string;
  name: string;
  emoji: string;
  isGrown: boolean;
  growthStage: number;
}

export interface Fish {
  id: string;
  name: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'legendary';
}

interface GameState {
  userProgress: UserProgress;
  
  addScore: (score: number) => void;
  completeModule: (moduleId: string) => void;
  updateStreak: (correct: boolean) => void;
  unlockPlant: (plantId: string) => void;
  growPlant: (plantId: string) => void;
  collectFish: (fishId: string) => void;
  earnBadge: (badgeId: string) => void;
  resetProgress: () => void;
  useFishingChance: () => boolean;
  addFishingChance: () => void;
}

const initialProgress: UserProgress = {
  totalScore: 0,
  completedModules: [],
  unlockedPlants: [],
  collectedFish: [],
  earnedBadges: [],
  currentStreak: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  fishingChances: 0
};

export const plants: Plant[] = [
  { id: 'cabbage', name: '小白菜', emoji: '🥬', isGrown: true, growthStage: 3 },
  { id: 'carrot', name: '胡萝卜', emoji: '🥕', isGrown: false, growthStage: 0 },
  { id: 'tomato', name: '番茄', emoji: '🍅', isGrown: false, growthStage: 0 },
  { id: 'corn', name: '玉米', emoji: '🌽', isGrown: false, growthStage: 0 },
  { id: 'sunflower', name: '向日葵', emoji: '🌻', isGrown: false, growthStage: 0 },
  { id: 'flower', name: '小花', emoji: '🌸', isGrown: false, growthStage: 0 },
  { id: 'watermelon', name: '西瓜', emoji: '🍉', isGrown: false, growthStage: 0 },
  { id: 'rainbow', name: '彩虹花', emoji: '🌈', isGrown: false, growthStage: 0 },
];

export const fishes: Fish[] = [
  { id: 'goldfish', name: '小金鱼', emoji: '🐠', rarity: 'common' },
  { id: 'tropical-fish', name: '热带鱼', emoji: '🐟', rarity: 'common' },
  { id: 'blowfish', name: '河豚', emoji: '🐡', rarity: 'common' },
  { id: 'crab', name: '小螃蟹', emoji: '🦀', rarity: 'common' },
  { id: 'shrimp', name: '小虾', emoji: '🦐', rarity: 'common' },
  { id: 'seahorse', name: '小海马', emoji: '🐴', rarity: 'common' },
  { id: 'clownfish', name: '小丑鱼', emoji: '🎏', rarity: 'common' },
  { id: 'anchovy', name: '飞鱼', emoji: '🐦', rarity: 'common' },
  { id: 'octopus', name: '小章鱼', emoji: '🐙', rarity: 'rare' },
  { id: 'shell', name: '海螺', emoji: '🐚', rarity: 'rare' },
  { id: 'turtle', name: '小海龟', emoji: '🐢', rarity: 'rare' },
  { id: 'dolphin', name: '小海豚', emoji: '🐬', rarity: 'rare' },
  { id: 'shark', name: '小鲨鱼', emoji: '🦈', rarity: 'rare' },
  { id: 'whale', name: '小蓝鲸', emoji: '🐋', rarity: 'rare' },
  { id: 'mermaid', name: '小美人鱼', emoji: '🧜‍♀️', rarity: 'legendary' },
  { id: 'seal', name: '小海豹', emoji: '🦭', rarity: 'legendary' },
  { id: 'penguin', name: '小企鹅', emoji: '🐧', rarity: 'legendary' },
  { id: 'lobster', name: '大龙虾', emoji: '🦞', rarity: 'legendary' },
  { id: 'squid', name: '巨型乌贼', emoji: '🦑', rarity: 'legendary' },
  { id: 'jellyfish', name: '梦幻水母', emoji: '🪼', rarity: 'legendary' },
  { id: 'starfish', name: '海星公主', emoji: '🌟', rarity: 'legendary' },
  { id: 'coral', name: '珊瑚精灵', emoji: '🪸', rarity: 'legendary' },
];

const badges = [
  { id: 'hanzi', name: '汉字小达人', emoji: '🏅', requirement: 'complete-hanzi' },
  { id: 'ciyu', name: '词语小专家', emoji: '🥇', requirement: 'complete-ciyu' },
  { id: 'gushi', name: '古诗小诗人', emoji: '📜', requirement: 'complete-gushi' },
  { id: 'jufang', name: '句子小作家', emoji: '✍️', requirement: 'complete-jufang' },
  { id: 'kewen', name: '课文背诵家', emoji: '📖', requirement: 'complete-kewen' },
  { id: 'xiaoke', name: '语文小百科', emoji: '🔡', requirement: 'complete-xiaoke' },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      userProgress: initialProgress,

      addScore: (score: number) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            totalScore: state.userProgress.totalScore + score
          }
        }));
      },

      completeModule: (moduleId: string) => {
        const { userProgress } = get();
        if (!userProgress.completedModules.includes(moduleId)) {
          const newCompleted = [...userProgress.completedModules, moduleId];
          const newBadges = [...userProgress.earnedBadges];
          badges.forEach(badge => {
            if (newCompleted.some(m => m === badge.requirement.replace('complete-', ''))) {
              if (!newBadges.includes(badge.id)) {
                newBadges.push(badge.id);
              }
            }
          });

          const plantUnlocks: Record<string, string> = {
            'hanzi': 'carrot',
            'ciyu': 'tomato',
            'gushi': 'flower',
            'jufang': 'watermelon',
            'kewen': 'corn',
            'xiaoke': 'sunflower'
          };

          if (plantUnlocks[moduleId] && !userProgress.unlockedPlants.includes(plantUnlocks[moduleId])) {
            set((state) => ({
              userProgress: {
                ...state.userProgress,
                completedModules: newCompleted,
                earnedBadges: newBadges,
                unlockedPlants: [...state.userProgress.unlockedPlants, plantUnlocks[moduleId]],
                totalScore: state.userProgress.totalScore + 50
              }
            }));
          } else {
            set((state) => ({
              userProgress: {
                ...state.userProgress,
                completedModules: newCompleted,
                earnedBadges: newBadges,
                totalScore: state.userProgress.totalScore + 50
              }
            }));
          }
        }
      },

      updateStreak: (correct: boolean) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            currentStreak: correct ? state.userProgress.currentStreak + 1 : 0,
            totalCorrect: correct ? state.userProgress.totalCorrect + 1 : state.userProgress.totalCorrect,
            totalAnswered: state.userProgress.totalAnswered + 1
          }
        }));
      },

      unlockPlant: (plantId: string) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            unlockedPlants: [...state.userProgress.unlockedPlants, plantId]
          }
        }));
      },

      growPlant: (plantId: string) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            unlockedPlants: state.userProgress.unlockedPlants.map(p => 
              p === plantId ? plantId : p
            )
          }
        }));
      },

      collectFish: (fishId: string) => {
        const { userProgress } = get();
        if (!userProgress.collectedFish.includes(fishId)) {
          set((state) => ({
            userProgress: {
              ...state.userProgress,
              collectedFish: [...state.userProgress.collectedFish, fishId]
            }
          }));
        }
      },

      earnBadge: (badgeId: string) => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            earnedBadges: [...state.userProgress.earnedBadges, badgeId]
          }
        }));
      },

      resetProgress: () => {
        set({ userProgress: initialProgress });
      },

      useFishingChance: () => {
        const { userProgress } = get();
        if (userProgress.fishingChances > 0) {
          set((state) => ({
            userProgress: {
              ...state.userProgress,
              fishingChances: state.userProgress.fishingChances - 1
            }
          }));
          return true;
        }
        return false;
      },

      addFishingChance: () => {
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            fishingChances: state.userProgress.fishingChances + 1
          }
        }));
      }
    }),
    {
      name: 'chinese-learning-farm'
    }
  )
);
