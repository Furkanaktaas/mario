import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlayerProps {
  x: number;
  y: number;
  cameraX: number;
  isFacingRight: boolean;
  animation: 'idle' | 'run' | 'jump' | 'dead';
  isBig: boolean;
  isStar: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  x, y, cameraX, isFacingRight, animation, isBig, isStar,
}) => {
  const screenX = x - cameraX;
  const emoji = animation === 'dead' ? '💀' : isStar ? '🌟' : '🧑';
  const size = isBig ? 60 : 40;

  return (
    <View
      style={[
        styles.container,
        {
          left: screenX,
          top: y,
          width: size,
          height: size + 10,
          transform: [{ scaleX: isFacingRight ? 1 : -1 }],
          opacity: animation === 'dead' ? 0.5 : 1,
        },
      ]}
    >
      <Text style={[styles.emoji, { fontSize: size - 4 }]}>{emoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    textAlign: 'center',
  },
});
