import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Colors } from '../constants/Colors';
import { useGameStore } from '../store/GameStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GameOver'>;

export const GameOverScreen: React.FC<Props> = ({ navigation, route }) => {
  const { score, resetGame } = useGameStore();
  const finalScore = route.params?.score ?? score;

  const handleRetry = () => {
    resetGame();
    navigation.replace('Game', { level: 1 });
  };

  const handleHome = () => {
    resetGame();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME OVER</Text>
      <Text style={styles.score}>Skor: {finalScore}</Text>
      <TouchableOpacity style={styles.button} onPress={handleRetry}>
        <Text style={styles.buttonText}>Tekrar Dene</Text>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.ui.primary,
    marginBottom: 20,
  },
  score: {
    fontSize: 28,
    color: Colors.ui.text,
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.ui.button,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    minWidth: 200,
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
