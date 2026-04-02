export interface GameEntity {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isAlive: boolean;
}

export interface PlayerState extends GameEntity {
  lives: number;
  isOnGround: boolean;
  isFacingRight: boolean;
  isJumping: boolean;
  isStar: boolean;
  animation: 'idle' | 'run' | 'jump' | 'dead';
  isBig: boolean;
  invincibleTimer: number;
}

export interface EnemyState extends GameEntity {
  type: 'goomba' | 'koopa' | 'piranha' | 'boss';
  isShell: boolean;
  shellMoving: boolean;
  shellDirection: number;
  hitCount: number;
  moveDir: number;
}

export interface PlatformState {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'static' | 'moving' | 'breakable' | 'question';
  isBroken: boolean;
  moveRangeX: number;
  moveRangeY: number;
  moveSpeed: number;
  moveDir: number;
  originalY: number;
  originalX: number;
  hasItem: 'coin' | 'mushroom' | 'star' | null;
  breakTimer: number;
}

export interface CoinState {
  x: number;
  y: number;
  isCollected: boolean;
}

export interface FlagState {
  x: number;
  y: number;
}

export interface LevelData {
  platforms: PlatformState[];
  enemies: EnemyState[];
  coins: CoinState[];
  flag: FlagState;
  levelWidth: number;
  levelHeight: number;
  background: 'forest' | 'cave' | 'castle';
}

export interface CameraState {
  x: number;
  y: number;
}

export interface GameState {
  player: PlayerState;
  enemies: EnemyState[];
  platforms: PlatformState[];
  coins: CoinState[];
  flag: FlagState;
  camera: CameraState;
  isRunning: boolean;
  isGameOver: boolean;
  isLevelComplete: boolean;
}

export function createInitialPlayer(startX: number, startY: number): PlayerState {
  return {
    x: startX,
    y: startY,
    width: 40,
    height: 50,
    velocityX: 0,
    velocityY: 0,
    isAlive: true,
    lives: 3,
    isOnGround: false,
    isFacingRight: true,
    isJumping: false,
    isStar: false,
    animation: 'idle',
    isBig: false,
    invincibleTimer: 0,
  };
}
