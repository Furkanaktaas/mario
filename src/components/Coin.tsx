import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CoinState } from '../engine/GameEngine';

interface CoinProps {
  coin: CoinState;
  cameraX: number;
}

export const Coin: React.FC<CoinProps> = ({ coin, cameraX }) => {
  if (coin.isCollected) return null;

  const screenX = coin.x - cameraX;
  if (screenX < -30 || screenX > 500) return null;

  return (
    <View style={[styles.container, { left: screenX, top: coin.y }]}>
      <Text style={styles.emoji}>🪙</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 16,
  },
});
