import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Colors } from '../constants/Colors';
import { useGameStore } from '../store/GameStore';

type Props = NativeStackScreenProps<RootStackParamList, 'LevelComplete'>;

export const LevelCompleteScreen: React.FC<Props> = ({ navigation, route }) => {
  const { score, coins, currentLevel, setLevel, unlockLevel } = useGameStore();
  const finalScore = route.params?.score ?? score;
  const finalCoins = route.params?.coins ?? coins;
  const level = route.params?.level ?? currentLevel;

  const stars = finalScore >= 2000 ? 3 : finalScore >= 1000 ? 2 : 1;
  const nextLevel = level + 1;
  const hasNextLevel = nextLevel <= 3;

  const handleNext = () => {
    if (hasNextLevel) {
      unlockLevel(nextLevel);
      setLevel(nextLevel);
      navigation.replace('Game', { level: nextLevel });
    } else {
      navigation.navigate('Home');
    }
  };

  const handleHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BÖLÜM TAMAMLANDI!</Text>
      <Text style={styles.level}>Bölüm {level}</Text>
      <View style={styles.starsRow}>
        {[1, 2, 3].map((s) => (
          <Text key={s} style={[styles.star, s <= stars && styles.starActive]}>⭐</Text>
        ))}
      </View>
      <Text style={styles.info}>Skor: {finalScore}</Text>
      <Text style={styles.info}>🪙 {finalCoins}</Text>

      {hasNextLevel && (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Sonraki Bölüm ▶</Text>
        </TouchableOpacity>
      )}
      {!hasNextLevel && (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Oyun Bitti! 🏆</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleHome}>
        <Text style={styles.buttonText}>Ana Menü</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.ui.accent,
    marginBottom: 8,
    textAlign: 'center',
  },
  level: {
    fontSize: 22,
    color: Colors.ui.text,
    marginBottom: 20,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  star: {
    fontSize: 40,
    opacity: 0.3,
    marginHorizontal: 8,
  },
  starActive: {
    opacity: 1,
  },
  info: {
    fontSize: 22,
    color: Colors.ui.text,
    marginBottom: 8,
  },
  button: {
    backgroundColor: Colors.ui.button,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    minWidth: 220,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: Colors.ui.buttonText,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
