import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface HUDProps {
  lives: number;
  score: number;
  coins: number;
  level: number;
  isStarActive: boolean;
}

export const HUD: React.FC<HUDProps> = ({ lives, score, coins, level, isStarActive }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>❤️×{lives}</Text>
      <Text style={[styles.text, isStarActive && styles.starText]}>
        {isStarActive ? '⭐' : '🏆'} {score}
      </Text>
      <Text style={styles.text}>🪙 {coins}</Text>
      <Text style={styles.text}>Lv {level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.ui.hud,
    paddingVertical: 8,
    paddingTop: 40,
    zIndex: 100,
  },
  text: {
    color: Colors.ui.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  starText: {
    color: Colors.ui.accent,
  },
});
