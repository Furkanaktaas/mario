import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EnemyState } from '../engine/GameEngine';

interface EnemyProps {
  enemy: EnemyState;
  cameraX: number;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy, cameraX }) => {
  if (!enemy.isAlive) return null;

  const screenX = enemy.x - cameraX;
  if (screenX + enemy.width < -50 || screenX > 500) return null;

  let emoji = '🍄';
  let fontSize = 32;
  if (enemy.type === 'koopa') emoji = enemy.isShell ? '🥚' : '🐢';
  else if (enemy.type === 'piranha') emoji = '🌱';
  else if (enemy.type === 'boss') { emoji = '👾'; fontSize = 60; }

  return (
    <View
      style={[
        styles.container,
        {
          left: screenX,
          top: enemy.y,
          width: enemy.width,
          height: enemy.height,
        },
      ]}
    >
      <Text style={{ fontSize }}>{emoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
