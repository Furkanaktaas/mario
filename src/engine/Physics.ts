import { GameEntity, EnemyState, PlatformState } from './GameEngine';
import { GRAVITY, MAX_FALL_SPEED } from '../constants/GameConstants';

export function applyGravity(entity: GameEntity): GameEntity {
  const newVelocityY = Math.min(entity.velocityY + GRAVITY, MAX_FALL_SPEED);
  return { ...entity, velocityY: newVelocityY };
}

export function applyMovement(entity: GameEntity): GameEntity {
  return {
    ...entity,
    x: entity.x + entity.velocityX,
    y: entity.y + entity.velocityY,
  };
}

export function updateEnemyAI(
  enemy: EnemyState,
  platforms: PlatformState[],
  levelWidth: number
): EnemyState {
  if (!enemy.isAlive) return enemy;

  if (enemy.type === 'piranha') {
    const newVelocityY = enemy.velocityY === 0 ? -2 : enemy.velocityY;
    let newY = enemy.y + newVelocityY;
    let dir = newVelocityY;
    const originalY = enemy.y;
    if (newY < originalY - 60) {
      dir = 2;
      newY = originalY - 60;
    } else if (newY > originalY + 10) {
      dir = -2;
      newY = originalY + 10;
    }
    return { ...enemy, y: newY, velocityY: dir };
  }

  if (enemy.isShell && !enemy.shellMoving) {
    return enemy;
  }

  const newVelocityX = enemy.isShell && enemy.shellMoving
    ? enemy.shellDirection * 8
    : enemy.moveDir * 2;

  let newX = enemy.x + newVelocityX;
  let newMoveDir = enemy.moveDir;

  if (newX <= 0) {
    newMoveDir = 1;
    newX = 0;
  } else if (newX + enemy.width >= levelWidth) {
    newMoveDir = -1;
    newX = levelWidth - enemy.width;
  }

  // Check if enemy is at edge of platform and turn around
  let onPlatformEdge = true;
  for (const platform of platforms) {
    if (!platform.isBroken) {
      const enemyBottom = newX + enemy.width / 2;
      if (
        enemyBottom >= platform.x &&
        enemyBottom <= platform.x + platform.width &&
        Math.abs((enemy.y + enemy.height) - platform.y) < 5
      ) {
        onPlatformEdge = false;
        break;
      }
    }
  }

  if (onPlatformEdge && !enemy.isShell) {
    newMoveDir = -newMoveDir;
    newX = enemy.x;
  }

  const newVelocityY = Math.min(enemy.velocityY + GRAVITY, MAX_FALL_SPEED);
  const newY = enemy.y + newVelocityY;

  let finalY = newY;
  let finalVelocityY = newVelocityY;
  for (const platform of platforms) {
    if (!platform.isBroken) {
      if (
        newX + enemy.width > platform.x &&
        newX < platform.x + platform.width &&
        newY + enemy.height >= platform.y &&
        enemy.y + enemy.height <= platform.y + 5
      ) {
        finalY = platform.y - enemy.height;
        finalVelocityY = 0;
        break;
      }
    }
  }

  return {
    ...enemy,
    x: newX,
    y: finalY,
    velocityX: newVelocityX,
    velocityY: finalVelocityY,
    moveDir: newMoveDir,
  };
}

export function updateMovingPlatform(platform: PlatformState): PlatformState {
  if (platform.type !== 'moving') return platform;

  let newX = platform.x + platform.moveSpeed * platform.moveDir;
  let newDir = platform.moveDir;

  if (platform.moveRangeX > 0) {
    if (newX > platform.originalX + platform.moveRangeX) {
      newDir = -1;
      newX = platform.originalX + platform.moveRangeX;
    } else if (newX < platform.originalX - platform.moveRangeX) {
      newDir = 1;
      newX = platform.originalX - platform.moveRangeX;
    }
  }

  let newY = platform.y;
  if (platform.moveRangeY > 0) {
    newY = platform.y + platform.moveSpeed * platform.moveDir;
    if (newY > platform.originalY + platform.moveRangeY) {
      newDir = -1;
      newY = platform.originalY + platform.moveRangeY;
    } else if (newY < platform.originalY - platform.moveRangeY) {
      newDir = 1;
      newY = platform.originalY - platform.moveRangeY;
    }
  }

  return { ...platform, x: newX, y: newY, moveDir: newDir };
}
