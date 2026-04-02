import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Colors } from '../constants/Colors';
import { useGameStore } from '../store/GameStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { highScore, unlockedLevels, loadHighScore, resetGame } = useGameStore();

  useEffect(() => {
    loadHighScore();
  }, [loadHighScore]);

  const handlePlay = () => {
    resetGame();
    navigation.navigate('Game', { level: 1 });
  };

  const handleLevelSelect = (level: number) => {
    resetGame();
    navigation.navigate('Game', { level });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 MARIO</Text>
      <Text style={styles.subtitle}>Platform Macerası</Text>

      <Text style={styles.highScore}>EN YÜKSEK SKOR: {highScore}</Text>

      <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
        <Text style={styles.playButtonText}>OYNA</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Bölüm Seç</Text>
      <View style={styles.levelsRow}>
        {[1, 2, 3].map((lvl) => {
          const unlocked = unlockedLevels.includes(lvl);
          return (
            <TouchableOpacity
              key={lvl}
              style={[styles.levelButton, !unlocked && styles.levelLocked]}
              onPress={() => unlocked && handleLevelSelect(lvl)}
              disabled={!unlocked}
            >
              <Text style={styles.levelText}>{unlocked ? `${lvl}` : '🔒'}</Text>
              <Text style={styles.levelLabel}>
                {lvl === 1 ? 'Orman' : lvl === 2 ? 'Mağara' : 'Kale'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>◀ ▶ Hareket Et | ▲ Zıpla</Text>
        <Text style={styles.instructionText}>Düşmanların üstüne zıpla!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: Colors.ui.accent,
    textShadowColor: Colors.ui.primary,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.ui.text,
    marginBottom: 30,
    opacity: 0.8,
  },
  highScore: {
    fontSize: 16,
    color: Colors.ui.accent,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  playButton: {
    backgroundColor: Colors.ui.primary,
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 40,
    shadowColor: Colors.ui.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.ui.text,
    marginBottom: 16,
    opacity: 0.7,
  },
  levelsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  levelButton: {
    backgroundColor: Colors.ui.secondary,
    width: (width - 80) / 3,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.ui.accent,
  },
  levelLocked: {
    borderColor: '#555',
    opacity: 0.5,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.ui.accent,
  },
  levelLabel: {
    fontSize: 12,
    color: Colors.ui.text,
    marginTop: 4,
  },
  instructions: {
    alignItems: 'center',
    opacity: 0.6,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.ui.text,
    marginBottom: 4,
  },
});
