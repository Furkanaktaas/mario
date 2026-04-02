import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlatformState } from '../engine/GameEngine';
import { Colors } from '../constants/Colors';

interface PlatformProps {
  platform: PlatformState;
  cameraX: number;
}

export const Platform: React.FC<PlatformProps> = ({ platform, cameraX }) => {
  if (platform.isBroken) return null;

  const screenX = platform.x - cameraX;
  if (screenX + platform.width < -50 || screenX > 500) return null;

  let bgColor = Colors.platform.static;
  let topColor = Colors.platform.staticTop;
  let label: string | null = null;

  if (platform.type === 'moving') {
    bgColor = Colors.platform.moving;
    topColor = Colors.platform.movingTop;
  } else if (platform.type === 'breakable') {
    bgColor = Colors.platform.breakable;
    topColor = Colors.platform.breakableTop;
  } else if (platform.type === 'question') {
    bgColor = platform.hasItem ? Colors.platform.question : Colors.platform.questionUsed;
    topColor = platform.hasItem ? Colors.platform.questionTop : Colors.platform.questionUsed;
    label = '?';
  }

  return (
    <View
      style={[
        styles.platform,
        {
          left: screenX,
          top: platform.y,
          width: platform.width,
          height: platform.height,
          backgroundColor: bgColor,
          borderTopColor: topColor,
        },
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  platform: {
    position: 'absolute',
    borderTopWidth: 4,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
