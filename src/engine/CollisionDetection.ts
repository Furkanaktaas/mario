import { GameEntity, PlayerState, EnemyState, PlatformState, CoinState } from './GameEngine';

export function checkAABB(
  a: GameEntity | { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function resolvePlayerPlatformCollision(
  player: PlayerState,
  platforms: PlatformState[]
): PlayerState {
  let resolvedPlayer = { ...player, isOnGround: false };

  for (const platform of platforms) {
    if (platform.isBroken) continue;

    const plat = { x: platform.x, y: platform.y, width: platform.width, height: platform.height };

    if (!checkAABB(resolvedPlayer, plat)) continue;

    const playerBottom = resolvedPlayer.y + resolvedPlayer.height;
    const playerTop = resolvedPlayer.y;
    const playerRight = resolvedPlayer.x + resolvedPlayer.width;
    const playerLeft = resolvedPlayer.x;
    const platBottom = platform.y + platform.height;
    const platTop = platform.y;
    const platRight = platform.x + platform.width;
    const platLeft = platform.x;

    const overlapTop = playerBottom - platTop;
    const overlapBottom = platBottom - playerTop;
    const overlapLeft = playerRight - platLeft;
    const overlapRight = platRight - playerLeft;

    const verticalOverlap = Math.min(overlapTop, overlapBottom);
    const horizontalOverlap = Math.min(overlapLeft, overlapRight);

    if (verticalOverlap < horizontalOverlap) {
      if (overlapTop < overlapBottom && resolvedPlayer.velocityY >= 0) {
        resolvedPlayer = {
          ...resolvedPlayer,
          y: platTop - resolvedPlayer.height,
          velocityY: 0,
          isOnGround: true,
          isJumping: false,
          animation: resolvedPlayer.velocityX !== 0 ? 'run' : 'idle',
        };
      } else if (overlapBottom <= overlapTop && resolvedPlayer.velocityY < 0) {
        resolvedPlayer = {
          ...resolvedPlayer,
          y: platBottom,
          velocityY: 0,
        };
      }
    } else {
      if (overlapLeft < overlapRight) {
        resolvedPlayer = {
          ...resolvedPlayer,
          x: platLeft - resolvedPlayer.width,
          velocityX: 0,
        };
      } else {
        resolvedPlayer = {
          ...resolvedPlayer,
          x: platRight,
          velocityX: 0,
        };
      }
    }
  }

  return resolvedPlayer;
}

export interface EnemyCollisionResult {
  killedEnemy: boolean;
  playerDied: boolean;
  enemyIndex: number;
}

export function checkPlayerEnemyCollision(
  player: PlayerState,
  enemies: EnemyState[]
): EnemyCollisionResult {
  if (player.invincibleTimer > 0) {
    return { killedEnemy: false, playerDied: false, enemyIndex: -1 };
  }

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    if (!enemy.isAlive) continue;

    const enemyBox = { x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height };
    if (!checkAABB(player, enemyBox)) continue;

    const playerBottom = player.y + player.height;
    const enemyTop = enemy.y;

    if (player.velocityY > 0 && playerBottom < enemyTop + 20) {
      return { killedEnemy: true, playerDied: false, enemyIndex: i };
    }

    if (!player.isStar) {
      return { killedEnemy: false, playerDied: true, enemyIndex: i };
    } else {
      return { killedEnemy: true, playerDied: false, enemyIndex: i };
    }
  }

  return { killedEnemy: false, playerDied: false, enemyIndex: -1 };
}

export function checkPlayerCoinCollision(
  player: PlayerState,
  coins: CoinState[]
): { coins: CoinState[]; collected: number } {
  let collected = 0;
  const newCoins = coins.map((coin) => {
    if (coin.isCollected) return coin;
    const coinBox = { x: coin.x, y: coin.y, width: 20, height: 20 };
    if (checkAABB(player, coinBox)) {
      collected++;
      return { ...coin, isCollected: true };
    }
    return coin;
  });
  return { coins: newCoins, collected };
}