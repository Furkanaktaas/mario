import { LevelData, PlatformState, EnemyState, CoinState } from '../engine/GameEngine';

const GROUND_Y = 480;
const LEVEL_WIDTH = 390 * 10;

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

function mkEnemy(x: number, y: number, type: EnemyState['type'] = 'goomba', extras: Partial<EnemyState> = {}): EnemyState {
  return {
    x, y,
    width: type === 'boss' ? 80 : 40,
    height: type === 'boss' ? 80 : 40,
    velocityX: -2, velocityY: 0,
    isAlive: true, type,
    isShell: false, shellMoving: false, shellDirection: 1,
    hitCount: 0, moveDir: -1,
    ...extras,
  };
}

function mkCoin(x: number, y: number): CoinState {
  return { x, y, isCollected: false };
}

export const Level3: LevelData = {
  background: 'castle',
  levelWidth: LEVEL_WIDTH,
  levelHeight: 600,
  flag: { x: LEVEL_WIDTH - 100, y: GROUND_Y - 120 },
  platforms: [
    // Ground with challenging gaps
    mkPlatform(0, GROUND_Y, 350),
    mkPlatform(470, GROUND_Y, 300),
    mkPlatform(830, GROUND_Y, 200),
    mkPlatform(1090, GROUND_Y, 250),
    mkPlatform(1400, GROUND_Y, 200),
    mkPlatform(1660, GROUND_Y, 250),
    mkPlatform(1970, GROUND_Y, 200),
    mkPlatform(2230, GROUND_Y, 250),
    mkPlatform(2540, GROUND_Y, 200),
    mkPlatform(2800, GROUND_Y, 250),
    mkPlatform(3110, GROUND_Y, 200),
    mkPlatform(3370, GROUND_Y, LEVEL_WIDTH - 3370),

    // Elevated platforms - early castle
    mkPlatform(100, GROUND_Y - 100, 100),
    mkPlatform(260, GROUND_Y - 160, 80),
    mkPlatform(490, GROUND_Y - 130, 100),
    mkPlatform(660, GROUND_Y - 200, 80),

    // Moving platforms - more challenging
    mkPlatform(850, GROUND_Y - 160, 80, 'moving', { moveRangeX: 120, moveSpeed: 3 }),
    mkPlatform(1050, GROUND_Y - 220, 80, 'moving', { moveRangeY: 100, moveSpeed: 2.5 }),
    mkPlatform(1250, GROUND_Y - 160, 80, 'moving', { moveRangeX: 100, moveSpeed: 2.5 }),

    // Question blocks
    mkPlatform(500, GROUND_Y - 250, 40, 'question', { hasItem: 'star' }),
    mkPlatform(1100, GROUND_Y - 300, 40, 'question', { hasItem: 'mushroom' }),
    mkPlatform(2000, GROUND_Y - 250, 40, 'question', { hasItem: 'star' }),

    // Piranha plant platforms (static, piranha spawns from top)
    mkPlatform(700, GROUND_Y - 140, 40),
    mkPlatform(1500, GROUND_Y - 140, 40),
    mkPlatform(2300, GROUND_Y - 140, 40),

    // Breakable sections
    mkPlatform(1460, GROUND_Y - 150, 80, 'breakable'),
    mkPlatform(1560, GROUND_Y - 200, 80, 'breakable'),
    mkPlatform(2600, GROUND_Y - 150, 80, 'breakable'),
    mkPlatform(2700, GROUND_Y - 200, 80, 'breakable'),

    // Mid castle section
    mkPlatform(1700, GROUND_Y - 130, 120),
    mkPlatform(1880, GROUND_Y - 200, 100),
    mkPlatform(2050, GROUND_Y - 150, 80),
    mkPlatform(2250, GROUND_Y - 200, 100),

    // Moving platforms (harder)
    mkPlatform(2400, GROUND_Y - 170, 80, 'moving', { moveRangeX: 150, moveSpeed: 3.5 }),
    mkPlatform(2650, GROUND_Y - 230, 80, 'moving', { moveRangeY: 120, moveSpeed: 3 }),

    // Late castle
    mkPlatform(2850, GROUND_Y - 130, 100),
    mkPlatform(3020, GROUND_Y - 200, 80),
    mkPlatform(3160, GROUND_Y - 150, 100),
    mkPlatform(3300, GROUND_Y - 200, 100),
    mkPlatform(3450, GROUND_Y - 150, 120),

    // Boss arena
    mkPlatform(3550, GROUND_Y - 120, 80, 'moving', { moveRangeX: 60, moveSpeed: 2 }),
    mkPlatform(3700, GROUND_Y - 180, 80),
  ],
  enemies: [
    // Early section
    mkEnemy(200, GROUND_Y - 40),
    mkEnemy(490, GROUND_Y - 40),
    mkEnemy(270, GROUND_Y - 160 - 40, 'koopa'),
    mkEnemy(670, GROUND_Y - 200 - 40, 'goomba'),

    // Piranhas on their platforms
    mkEnemy(700, GROUND_Y - 140 - 40, 'piranha'),
    mkEnemy(1500, GROUND_Y - 140 - 40, 'piranha'),
    mkEnemy(2300, GROUND_Y - 140 - 40, 'piranha'),

    // Mid section
    mkEnemy(850, GROUND_Y - 40),
    mkEnemy(1110, GROUND_Y - 40, 'koopa'),
    mkEnemy(1420, GROUND_Y - 40),
    mkEnemy(1680, GROUND_Y - 130 - 40, 'goomba'),
    mkEnemy(1900, GROUND_Y - 200 - 40, 'koopa'),
    mkEnemy(1980, GROUND_Y - 40),

    // Late section
    mkEnemy(2240, GROUND_Y - 40, 'koopa'),
    mkEnemy(2560, GROUND_Y - 40),
    mkEnemy(2820, GROUND_Y - 40, 'koopa'),
    mkEnemy(3130, GROUND_Y - 40),

    // Boss at end
    mkEnemy(LEVEL_WIDTH - 250, GROUND_Y - 80, 'boss', { width: 80, height: 80, hitCount: 0 }),
  ],
  coins: [
    mkCoin(120, GROUND_Y - 140), mkCoin(160, GROUND_Y - 140),
    mkCoin(280, GROUND_Y - 200), mkCoin(320, GROUND_Y - 200),
    mkCoin(500, GROUND_Y - 40), mkCoin(540, GROUND_Y - 40), mkCoin(580, GROUND_Y - 40),
    mkCoin(680, GROUND_Y - 240), mkCoin(720, GROUND_Y - 240),
    mkCoin(870, GROUND_Y - 200), mkCoin(910, GROUND_Y - 200),
    mkCoin(1060, GROUND_Y - 40), mkCoin(1100, GROUND_Y - 40),
    mkCoin(1120, GROUND_Y - 340), mkCoin(1160, GROUND_Y - 340),
    mkCoin(1420, GROUND_Y - 40), mkCoin(1460, GROUND_Y - 190),
    mkCoin(1580, GROUND_Y - 240), mkCoin(1620, GROUND_Y - 240),
    mkCoin(1720, GROUND_Y - 170), mkCoin(1760, GROUND_Y - 170),
    mkCoin(1900, GROUND_Y - 240), mkCoin(1940, GROUND_Y - 240),
    mkCoin(2010, GROUND_Y - 290), mkCoin(2050, GROUND_Y - 290),
    mkCoin(2020, GROUND_Y - 190), mkCoin(2060, GROUND_Y - 190),
    mkCoin(2270, GROUND_Y - 240), mkCoin(2310, GROUND_Y - 240),
    mkCoin(2430, GROUND_Y - 210), mkCoin(2470, GROUND_Y - 210),
    mkCoin(2560, GROUND_Y - 40), mkCoin(2600, GROUND_Y - 190),
    mkCoin(2720, GROUND_Y - 270), mkCoin(2760, GROUND_Y - 270),
    mkCoin(2870, GROUND_Y - 170), mkCoin(2910, GROUND_Y - 170),
    mkCoin(3040, GROUND_Y - 240), mkCoin(3080, GROUND_Y - 240),
    mkCoin(3180, GROUND_Y - 190), mkCoin(3220, GROUND_Y - 190),
    mkCoin(3470, GROUND_Y - 190), mkCoin(3510, GROUND_Y - 190),
  ],
};
