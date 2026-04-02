import { LevelData, PlatformState, EnemyState, CoinState } from '../engine/GameEngine';

const GROUND_Y = 480;
const LEVEL_WIDTH = 390 * 8;

function mkPlatform(x: number, y: number, width: number, type: PlatformState['type'] = 'static', extras: Partial<PlatformState> = {}): PlatformState {
  return {
    x, y, width, height: 20,
    type, isBroken: false,
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
    isAlive: true, type,
    isShell: false, shellMoving: false, shellDirection: 1,
    hitCount: 0, moveDir: -1,
  };
}

function mkCoin(x: number, y: number): CoinState {
  return { x, y, isCollected: false };
}

export const Level2: LevelData = {
  background: 'cave',
  levelWidth: LEVEL_WIDTH,
  levelHeight: 600,
  flag: { x: LEVEL_WIDTH - 80, y: GROUND_Y - 120 },
  platforms: [
    // Ground with more gaps
    mkPlatform(0, GROUND_Y, 400),
    mkPlatform(500, GROUND_Y, 300),
    mkPlatform(860, GROUND_Y, 250),
    mkPlatform(1160, GROUND_Y, 300),
    mkPlatform(1510, GROUND_Y, 250),
    mkPlatform(1820, GROUND_Y, 300),
    mkPlatform(2180, GROUND_Y, 250),
    mkPlatform(2490, GROUND_Y, 300),
    mkPlatform(2850, GROUND_Y, LEVEL_WIDTH - 2850),

    // Elevated - early
    mkPlatform(150, GROUND_Y - 100, 100),
    mkPlatform(300, GROUND_Y - 170, 100),
    mkPlatform(450, GROUND_Y - 130, 80),
    mkPlatform(600, GROUND_Y - 200, 80),

    // Moving platforms (cave section)
    mkPlatform(750, GROUND_Y - 150, 100, 'moving', { moveRangeX: 100, moveSpeed: 2 }),
    mkPlatform(950, GROUND_Y - 200, 100, 'moving', { moveRangeX: 80, moveSpeed: 1.5 }),
    mkPlatform(1100, GROUND_Y - 150, 80, 'moving', { moveRangeY: 80, moveSpeed: 1.5 }),

    // Mid section
    mkPlatform(1200, GROUND_Y - 120, 120),
    mkPlatform(1380, GROUND_Y - 180, 100),
    mkPlatform(1540, GROUND_Y - 130, 80),
    mkPlatform(1680, GROUND_Y - 200, 100),

    // Question blocks
    mkPlatform(820, GROUND_Y - 220, 40, 'question', { hasItem: 'star' }),
    mkPlatform(1600, GROUND_Y - 280, 40, 'question', { hasItem: 'mushroom' }),

    // Breakable
    mkPlatform(1800, GROUND_Y - 150, 80, 'breakable'),
    mkPlatform(1900, GROUND_Y - 200, 80, 'breakable'),

    // Late section
    mkPlatform(2000, GROUND_Y - 130, 120),
    mkPlatform(2180, GROUND_Y - 180, 100),
    mkPlatform(2350, GROUND_Y - 130, 80),
    mkPlatform(2500, GROUND_Y - 200, 120),
    mkPlatform(2680, GROUND_Y - 150, 100),
    mkPlatform(2850, GROUND_Y - 120, 120),
    mkPlatform(3000, GROUND_Y - 160, 100),

    // Moving platforms - late
    mkPlatform(2200, GROUND_Y - 250, 100, 'moving', { moveRangeX: 120, moveSpeed: 2.5 }),
    mkPlatform(2700, GROUND_Y - 220, 100, 'moving', { moveRangeX: 80, moveSpeed: 2 }),
  ],
  enemies: [
    mkEnemy(200, GROUND_Y - 40),
    mkEnemy(520, GROUND_Y - 40),
    mkEnemy(880, GROUND_Y - 40),
    mkEnemy(1180, GROUND_Y - 40),
    mkEnemy(300, GROUND_Y - 170 - 40, 'koopa'),
    mkEnemy(620, GROUND_Y - 200 - 40, 'koopa'),
    mkEnemy(1400, GROUND_Y - 180 - 40, 'goomba'),
    mkEnemy(1700, GROUND_Y - 200 - 40, 'koopa'),
    mkEnemy(1840, GROUND_Y - 40),
    mkEnemy(2200, GROUND_Y - 40),
    mkEnemy(2510, GROUND_Y - 40, 'koopa'),
    mkEnemy(2870, GROUND_Y - 40),
  ],
  coins: [
    mkCoin(170, GROUND_Y - 140), mkCoin(210, GROUND_Y - 140),
    mkCoin(320, GROUND_Y - 210), mkCoin(360, GROUND_Y - 210),
    mkCoin(520, GROUND_Y - 40), mkCoin(560, GROUND_Y - 40),
    mkCoin(880, GROUND_Y - 40), mkCoin(920, GROUND_Y - 40),
    mkCoin(780, GROUND_Y - 190), mkCoin(820, GROUND_Y - 260),
    mkCoin(1220, GROUND_Y - 160), mkCoin(1260, GROUND_Y - 160),
    mkCoin(1400, GROUND_Y - 220), mkCoin(1440, GROUND_Y - 220),
    mkCoin(1560, GROUND_Y - 170), mkCoin(1600, GROUND_Y - 320),
    mkCoin(1700, GROUND_Y - 240), mkCoin(1740, GROUND_Y - 240),
    mkCoin(2020, GROUND_Y - 170), mkCoin(2060, GROUND_Y - 170),
    mkCoin(2200, GROUND_Y - 220), mkCoin(2240, GROUND_Y - 290),
    mkCoin(2370, GROUND_Y - 170), mkCoin(2410, GROUND_Y - 170),
    mkCoin(2520, GROUND_Y - 240), mkCoin(2560, GROUND_Y - 240),
    mkCoin(2700, GROUND_Y - 190), mkCoin(2740, GROUND_Y - 190),
    mkCoin(2870, GROUND_Y - 160), mkCoin(2910, GROUND_Y - 160),
    mkCoin(3020, GROUND_Y - 200), mkCoin(3060, GROUND_Y - 200),
  ],
};
