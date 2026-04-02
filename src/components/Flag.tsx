import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlagState } from '../engine/GameEngine';

interface FlagProps {
  flag: FlagState;
  cameraX: number;
}

export const Flag: React.FC<FlagProps> = ({ flag, cameraX }) => {
  const screenX = flag.x - cameraX;

  return (
    <View style={[styles.container, { left: screenX, top: flag.y }]}>
      <Text style={styles.emoji}>🚩</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 40,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
  },
});
