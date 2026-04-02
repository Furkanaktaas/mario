import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';

interface BackgroundProps {
  theme: 'forest' | 'cave' | 'castle';
  cameraX: number;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Background: React.FC<BackgroundProps> = ({ theme, cameraX }) => {
  const colors = Colors[theme];
  const parallaxOffset = cameraX * 0.3;

  const clouds = [
    { x: 80, y: 60, size: 60 },
    { x: 220, y: 40, size: 80 },
    { x: 380, y: 70, size: 50 },
    { x: 520, y: 50, size: 70 },
    { x: 700, y: 60, size: 60 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.sky }]}>
      {clouds.map((cloud, i) => {
        const cloudX = ((cloud.x - parallaxOffset % SCREEN_WIDTH) + SCREEN_WIDTH * 2) % (SCREEN_WIDTH + 100) - 50;
        return (
          <View
            key={i}
            style={[
              styles.cloud,
              {
                left: cloudX,
                top: cloud.y,
                width: cloud.size,
                height: cloud.size * 0.6,
                backgroundColor: colors.cloud,
                opacity: theme === 'cave' ? 0.3 : 0.9,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  cloud: {
    position: 'absolute',
    borderRadius: 20,
  },
});
