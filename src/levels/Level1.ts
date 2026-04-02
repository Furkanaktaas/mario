import { LevelData, PlatformState, EnemyState, CoinState } from '../engine/GameEngine';

const GROUND_Y = 480;
const LEVEL_WIDTH = 390 * 6;

function mkPlatform(x: number, y: number, width: number, type: PlatformState['type'] = 'static', extras: Partial<PlatformState> = {}): PlatformState {
  return {
    x, y, width, height: 20,
    type,
    isBroken: false,
    moveRangeX: 0, moveRangeY: 0, moveSpeed: 2, moveDir: 1,
    originalX: x, originalY: y,
    hasItem: null, breakTimer: 0,
    ...extras,
  };
}

function mkEnemy(x: number, y: number, type: EnemyState['type'] = 'goomba'): EnemyState {
  return {
    x, y, width: 40, height: 40,
    velocityX: -2, velocityY: 0,
    isAlive: true,
    type,
    isShell: false, shellMoving: false, shellDirection: 1,
    hitCount: 0, moveDir: -1,
  };
}

function mkCoin(x: number, y: number): CoinState {
  return { x, y, isCollected: false };
}

export const Level1: LevelData = {
  background: 'forest',
  levelWidth: LEVEL_WIDTH,
  levelHeight: 600,
  flag: { x: LEVEL_WIDTH - 80, y: GROUND_Y - 120 },
  platforms: [
    // Ground - split with gaps
    mkPlatform(0, GROUND_Y, 500),
    mkPlatform(540, GROUND_Y, 400),
    mkPlatform(980, GROUND_Y, 350),
    mkPlatform(1360, GROUND_Y, 400),
    mkPlatform(1800, GROUND_Y, 300),
    mkPlatform(2140, GROUND_Y, LEVEL_WIDTH - 2140),

    // Elevated platforms - first section
    mkPlatform(200, GROUND_Y - 100, 120),
    mkPlatform(380, GROUND_Y - 160, 100),
    mkPlatform(540, GROUND_Y - 120, 100),

    // Question blocks
    mkPlatform(300, GROUND_Y - 180, 40, 'question', { hasItem: 'coin' }),
    mkPlatform(620, GROUND_Y - 200, 40, 'question', { hasItem: 'mushroom' }),

    // Middle section platforms
    mkPlatform(700, GROUND_Y - 130, 120),
    mkPlatform(860, GROUND_Y - 200, 100),
    mkPlatform(1000, GROUND_Y - 150, 80),
    mkPlatform(1100, GROUND_Y - 220, 120),

    // Moving platform
    mkPlatform(1250, GROUND_Y - 170, 100, 'moving', { moveRangeX: 80, moveSpeed: 2 }),

    // Breakable platforms
    mkPlatform(1400, GROUND_Y - 140, 80, 'breakable'),
    mkPlatform(1520, GROUND_Y - 140, 80, 'breakable'),

    // Late section
    mkPlatform(1600, GROUND_Y - 120, 120),
    mkPlatform(1750, GROUND_Y - 180, 100),
    mkPlatform(1900, GROUND_Y - 130, 80),
    mkPlatform(2000, GROUND_Y - 200, 120),
    mkPlatform(2150, GROUND_Y - 150, 100),
    mkPlatform(2250, GROUND_Y - 100, 120),
  ],
  enemies: [
    mkEnemy(300, GROUND_Y - 40),
    mkEnemy(560, GROUND_Y - 40),
    mkEnemy(750, GROUND_Y - 130 - 40),
    mkEnemy(1020, GROUND_Y - 40),
    mkEnemy(1380, GROUND_Y - 40),
    mkEnemy(1820, GROUND_Y - 40),
    mkEnemy(2000, GROUND_Y - 200 - 40),
  ],
  coins: [
    mkCoin(220, GROUND_Y - 140), mkCoin(260, GROUND_Y - 140), mkCoin(300, GROUND_Y - 140),
    mkCoin(400, GROUND_Y - 200), mkCoin(440, GROUND_Y - 200),
    mkCoin(560, GROUND_Y - 160), mkCoin(600, GROUND_Y - 160),
    mkCoin(720, GROUND_Y - 170), mkCoin(760, GROUND_Y - 170), mkCoin(800, GROUND_Y - 170),
    mkCoin(880, GROUND_Y - 240), mkCoin(920, GROUND_Y - 240),
    mkCoin(1020, GROUND_Y - 190), mkCoin(1060, GROUND_Y - 190),
    mkCoin(1120, GROUND_Y - 260), mkCoin(1160, GROUND_Y - 260), mkCoin(1200, GROUND_Y - 260),
    mkCoin(1620, GROUND_Y - 160), mkCoin(1660, GROUND_Y - 160),
    mkCoin(1770, GROUND_Y - 220), mkCoin(1810, GROUND_Y - 220),
    mkCoin(1920, GROUND_Y - 170), mkCoin(1960, GROUND_Y - 170),
    mkCoin(2020, GROUND_Y - 240), mkCoin(2060, GROUND_Y - 240),
    mkCoin(2170, GROUND_Y - 190),
  ],
};
