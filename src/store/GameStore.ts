import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGH_SCORE_KEY = '@mario_high_score';
const UNLOCKED_LEVELS_KEY = '@mario_unlocked_levels';

interface GameStoreState {
  lives: number;
  score: number;
  coins: number;
  currentLevel: number;
  highScore: number;
  isStarActive: boolean;
  starTimer: number | null;
  unlockedLevels: number[];
  addScore: (points: number) => void;
  addCoin: () => void;
  loseLife: () => void;
  resetGame: () => void;
  setLevel: (level: number) => void;
  activateStar: () => void;
  deactivateStar: () => void;
  loadHighScore: () => Promise<void>;
  saveHighScore: () => Promise<void>;
  unlockLevel: (level: number) => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  lives: 3,
  score: 0,
  coins: 0,
  currentLevel: 1,
  highScore: 0,
  isStarActive: false,
  starTimer: null,
  unlockedLevels: [1],

  addScore: (points: number) => {
    set((state) => {
      const newScore = state.score + points;
      const newHighScore = newScore > state.highScore ? newScore : state.highScore;
      if (newScore > state.highScore) {
        AsyncStorage.setItem(HIGH_SCORE_KEY, String(newHighScore)).catch(() => {});
      }
      return { score: newScore, highScore: newHighScore };
    });
  },

  addCoin: () => {
    set((state) => {
      const newCoins = state.coins + 1;
      if (newCoins >= 100) {
        return { coins: newCoins - 100, lives: state.lives + 1, score: state.score + 10 };
      }
      return { coins: newCoins, score: state.score + 10 };
    });
  },

  loseLife: () => {
    set((state) => ({ lives: state.lives - 1 }));
  },

  resetGame: () => {
    const { starTimer } = get();
    if (starTimer !== null) {
      clearTimeout(starTimer);
    }
    set({ lives: 3, score: 0, coins: 0, currentLevel: 1, isStarActive: false, starTimer: null });
  },

  setLevel: (level: number) => {
    set({ currentLevel: level });
  },

  activateStar: () => {
    const { starTimer } = get();
    if (starTimer !== null) {
      clearTimeout(starTimer);
    }
    const timer = setTimeout(() => {
      set({ isStarActive: false, starTimer: null });
    }, 10000) as unknown as number;
    set({ isStarActive: true, starTimer: timer });
  },

  deactivateStar: () => {
    const { starTimer } = get();
    if (starTimer !== null) {
      clearTimeout(starTimer);
    }
    set({ isStarActive: false, starTimer: null });
  },

  loadHighScore: async () => {
    try {
      const [hsVal, ulVal] = await Promise.all([
        AsyncStorage.getItem(HIGH_SCORE_KEY),
        AsyncStorage.getItem(UNLOCKED_LEVELS_KEY),
      ]);
      const highScore = hsVal ? parseInt(hsVal, 10) : 0;
      const unlockedLevels = ulVal ? JSON.parse(ulVal) : [1];
      set({ highScore, unlockedLevels });
    } catch {
      set({ highScore: 0, unlockedLevels: [1] });
    }
  },

  saveHighScore: async () => {
    try {
      const { highScore, unlockedLevels } = get();
      await Promise.all([
        AsyncStorage.setItem(HIGH_SCORE_KEY, String(highScore)),
        AsyncStorage.setItem(UNLOCKED_LEVELS_KEY, JSON.stringify(unlockedLevels)),
      ]);
    } catch {}
  },

  unlockLevel: (level: number) => {
    set((state) => {
      if (state.unlockedLevels.includes(level)) return state;
      const newUnlocked = [...state.unlockedLevels, level];
      AsyncStorage.setItem(UNLOCKED_LEVELS_KEY, JSON.stringify(newUnlocked)).catch(() => {});
      return { unlockedLevels: newUnlocked };
    });
  },
}));
