import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGameLoop } from '../hooks/useGameLoop';
import { useGameStore } from '../store/GameStore';
import { Level1 } from '../levels/Level1';
import { Level2 } from '../levels/Level2';
import { Level3 } from '../levels/Level3';
import {
  GameState,
  LevelData,
  PlayerState,
  createInitialPlayer,
} from '../engine/GameEngine';
import { applyGravity, applyMovement, updateEnemyAI, updateMovingPlatform } from '../engine/Physics';
import { updateCamera } from '../engine/Camera';
import {
  resolvePlayerPlatformCollision,
  checkPlayerEnemyCollision,
  checkPlayerCoinCollision,
  checkAABB,
} from '../engine/CollisionDetection';
import { Background } from '../components/Background';
import { Platform as PlatformComponent } from '../components/Platform';
import { Coin as CoinComponent } from '../components/Coin';
import { Enemy as EnemyComponent } from '../components/Enemy';
import { Flag } from '../components/Flag';
import { Player } from '../components/Player';
import { HUD } from '../components/HUD';
import {
  WALK_SPEED,
  JUMP_FORCE,
  SCORE_KILL_ENEMY,
  SCORE_COIN,
  SCORE_LEVEL_COMPLETE,
  SCORE_BOSS_KILL,
  GROUND_Y,
} from '../constants/GameConstants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

interface InputState {
  left: boolean;
  right: boolean;
  jump: boolean;
  jumpPressed: boolean;
}

function getLevelData(level: number): LevelData {
  switch (level) {
    case 2: return Level2;
    case 3: return Level3;
    default: return Level1;
  }
}

function initGameState(levelData: LevelData, lives: number): GameState {
  const player = createInitialPlayer(80, GROUND_Y - 60);
  player.lives = lives;
  return {
    player,
    enemies: levelData.enemies.map((e) => ({ ...e })),
    platforms: levelData.platforms.map((p) => ({ ...p })),
    coins: levelData.coins.map((c) => ({ ...c })),
    flag: { ...levelData.flag },
    camera: { x: 0, y: 0 },
    isRunning: true,
    isGameOver: false,
    isLevelComplete: false,
  };
}

export const GameScreen: React.FC<Props> = ({ navigation, route }) => {
  const level = route.params?.level ?? 1;
  const { lives, score, coins, addScore, addCoin, loseLife, isStarActive } = useGameStore();

  const levelData = getLevelData(level);

  const inputRef = useRef<InputState>({ left: false, right: false, jump: false, jumpPressed: false });
  const gameStateRef = useRef<GameState>(initGameState(levelData, lives));
  const scoreRef = useRef(score);
  const coinsRef = useRef(coins);
  const [renderState, setRenderState] = useState<GameState>(gameStateRef.current);
  const [isRunning, setIsRunning] = useState(true);
  const invincibleRef = useRef(0);
  const deadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const livesRef = useRef(lives);
  const isStarActiveRef = useRef(isStarActive);

  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { coinsRef.current = coins; }, [coins]);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { isStarActiveRef.current = isStarActive; }, [isStarActive]);

  const gameLoop = useCallback(() => {
    const gs = gameStateRef.current;
    if (!gs.isRunning || gs.isGameOver || gs.isLevelComplete) return;

    const input = inputRef.current;
    let player: PlayerState = { ...gs.player };
    let enemies = gs.enemies.map((e) => ({ ...e }));
    let platforms = gs.platforms.map((p) => ({ ...p }));
    let gameCoins = gs.coins.map((c) => ({ ...c }));

    // Update invincibility timer
    if (invincibleRef.current > 0) {
      invincibleRef.current = Math.max(0, invincibleRef.current - 1);
      player.invincibleTimer = invincibleRef.current;
    }

    // Apply input
    if (input.left) {
      player.velocityX = -WALK_SPEED;
      player.isFacingRight = false;
    } else if (input.right) {
      player.velocityX = WALK_SPEED;
      player.isFacingRight = true;
    } else {
      player.velocityX = 0;
    }

    if (input.jump && player.isOnGround && !input.jumpPressed) {
      player.velocityY = JUMP_FORCE;
      player.isOnGround = false;
      player.isJumping = true;
      player.animation = 'jump';
      input.jumpPressed = true;
    }
    if (!input.jump) {
      input.jumpPressed = false;
    }

    // Apply physics
    player = applyGravity(player) as PlayerState;
    player = applyMovement(player) as PlayerState;

    // Level bounds
    player.x = Math.max(0, Math.min(player.x, levelData.levelWidth - player.width));

    // Fell into pit
    if (player.y + player.height > GROUND_Y + 200) {
      player.isAlive = false;
    }

    // Update moving platforms
    platforms = platforms.map(updateMovingPlatform);

    // Update enemies
    enemies = enemies.map((enemy) => {
      if (!enemy.isAlive) return enemy;
      return updateEnemyAI(enemy, platforms, levelData.levelWidth);
    });

    // Resolve platform collisions
    player = resolvePlayerPlatformCollision(player, platforms);

    // Check enemy collisions
    if (player.isAlive && invincibleRef.current === 0) {
      const collision = checkPlayerEnemyCollision(player, enemies);
      if (collision.killedEnemy) {
        enemies[collision.enemyIndex] = { ...enemies[collision.enemyIndex], isAlive: false };
        const enemy = enemies[collision.enemyIndex];
        const pts = enemy.type === 'boss' ? SCORE_BOSS_KILL : SCORE_KILL_ENEMY;
        addScore(pts);
        player.velocityY = JUMP_FORCE * 0.6;
      } else if (collision.playerDied) {
        if (!isStarActiveRef.current) {
          invincibleRef.current = 60;
          player.invincibleTimer = 60;
          loseLife();
          if (livesRef.current - 1 <= 0) {
            player.isAlive = false;
            player.animation = 'dead';
          } else {
            player.x = Math.max(gs.camera.x, 80);
            player.y = GROUND_Y - 60;
            player.velocityX = 0;
            player.velocityY = 0;
          }
        }
      }
    }

    // Check coin collisions
    const coinResult = checkPlayerCoinCollision(player, gameCoins);
    gameCoins = coinResult.coins;
    for (let i = 0; i < coinResult.collected; i++) {
      addCoin();
      addScore(SCORE_COIN);
    }

    // Check flag
    const flagBox = { x: gs.flag.x, y: gs.flag.y, width: 40, height: 80 };
    if (checkAABB(player, flagBox)) {
      addScore(SCORE_LEVEL_COMPLETE);
      const newGs: GameState = {
        ...gs, player, enemies, platforms, coins: gameCoins,
        isLevelComplete: true, isRunning: false,
      };
      gameStateRef.current = newGs;
      setRenderState({ ...newGs });
      setIsRunning(false);
      navigation.replace('LevelComplete', {
        score: scoreRef.current + SCORE_LEVEL_COMPLETE,
        coins: coinsRef.current,
        level,
      });
      return;
    }

    // Check game over
    if (!player.isAlive) {
      player.animation = 'dead';
      const newGs: GameState = {
        ...gs, player, enemies, platforms, coins: gameCoins,
        isGameOver: true, isRunning: false,
      };
      gameStateRef.current = newGs;
      setRenderState({ ...newGs });
      setIsRunning(false);
      deadTimerRef.current = setTimeout(() => {
        navigation.replace('GameOver', { score: scoreRef.current });
      }, 1000);
      return;
    }

    // Update animation
    if (player.isOnGround) {
      player.animation = Math.abs(player.velocityX) > 0 ? 'run' : 'idle';
    } else {
      player.animation = 'jump';
    }

    // Update camera
    const newCamera = updateCamera(gs.camera, player.x, SCREEN_WIDTH, levelData.levelWidth);

    const newGs: GameState = {
      ...gs,
      player,
      enemies,
      platforms,
      coins: gameCoins,
      camera: newCamera,
      isRunning: true,
    };
    gameStateRef.current = newGs;
    setRenderState({ ...newGs });
  }, [level, levelData, navigation, addScore, addCoin, loseLife]);

  useGameLoop(gameLoop, isRunning);

  useEffect(() => {
    return () => {
      if (deadTimerRef.current) clearTimeout(deadTimerRef.current);
    };
  }, []);

  const gs = renderState;
  const cameraX = gs.camera.x;

  return (
    <View style={styles.container}>
      <Background theme={levelData.background} cameraX={cameraX} />

      {gs.platforms.map((platform, i) => (
        <PlatformComponent key={i} platform={platform} cameraX={cameraX} />
      ))}

      {gs.coins.map((coin, i) => (
        <CoinComponent key={i} coin={coin} cameraX={cameraX} />
      ))}

      {gs.enemies.map((enemy, i) => (
        <EnemyComponent key={i} enemy={enemy} cameraX={cameraX} />
      ))}

      <Flag flag={gs.flag} cameraX={cameraX} />

      <Player
        x={gs.player.x}
        y={gs.player.y}
        cameraX={cameraX}
        isFacingRight={gs.player.isFacingRight}
        animation={gs.player.animation}
        isBig={gs.player.isBig}
        isStar={gs.player.isStar || isStarActive}
      />

      <HUD
        lives={lives}
        score={score}
        coins={coins}
        level={level}
        isStarActive={isStarActive}
      />

      <View style={styles.controls}>
        <View style={styles.leftControls}>
          <Pressable
            style={styles.controlButton}
            onPressIn={() => { inputRef.current.left = true; }}
            onPressOut={() => { inputRef.current.left = false; }}
          >
            <Text style={styles.controlText}>◀</Text>
          </Pressable>
          <Pressable
            style={styles.controlButton}
            onPressIn={() => { inputRef.current.right = true; }}
            onPressOut={() => { inputRef.current.right = false; }}
          >
            <Text style={styles.controlText}>▶</Text>
          </Pressable>
        </View>
        <Pressable
          style={[styles.controlButton, styles.jumpButton]}
          onPressIn={() => { inputRef.current.jump = true; }}
          onPressOut={() => { inputRef.current.jump = false; }}
        >
          <Text style={styles.controlText}>▲</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    overflow: 'hidden',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 200,
  },
  leftControls: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  jumpButton: {
    backgroundColor: 'rgba(255,100,100,0.4)',
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  controlText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
