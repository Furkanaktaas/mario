export type RootStackParamList = {
  Home: undefined;
  Game: { level: number };
  GameOver: { score: number };
  LevelComplete: { score: number; coins: number; level: number };
};
