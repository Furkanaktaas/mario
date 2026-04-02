import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width || 390;
export const SCREEN_HEIGHT = Dimensions.get('window').height || 844;

export const GRAVITY = 0.8;
export const JUMP_FORCE = -15;
export const MAX_FALL_SPEED = 20;
export const WALK_SPEED = 5;
export const SPRINT_SPEED = 8;
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 50;
export const ENEMY_WIDTH = 40;
export const ENEMY_HEIGHT = 40;
export const PLATFORM_HEIGHT = 20;
export const COIN_SIZE = 20;
export const TILE_SIZE = 40;
export const FPS = 60;
export const FRAME_TIME = 1000 / FPS;
export const COIN_LIVES_THRESHOLD = 100;
export const SCORE_KILL_ENEMY = 100;
export const SCORE_COIN = 10;
export const SCORE_LEVEL_COMPLETE = 500;
export const SCORE_BOSS_KILL = 1000;
export const STAR_DURATION = 10000;
export const BREAKABLE_PLATFORM_DELAY = 2000;

export const GROUND_Y = SCREEN_HEIGHT - 120;
