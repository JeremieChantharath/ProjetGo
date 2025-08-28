import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const canContinue = playerName.trim().length > 0;

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Bienvenue sur Go</Text>
      <Text style={styles.subtitle}>Entrez votre nom pour commencer</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre nom"
        value={playerName}
        onChangeText={setPlayerName}
        autoCapitalize="words"
        returnKeyType="go"
        onSubmitEditing={() => {
          if (canContinue) {
            navigation.navigate('Game', { playerName });
          }
        }}
      />
      <TouchableOpacity
        style={[styles.button, !canContinue && styles.buttonDisabled]}
        disabled={!canContinue}
        onPress={() => navigation.navigate('Game', { playerName })}
      >
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A7C7FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
