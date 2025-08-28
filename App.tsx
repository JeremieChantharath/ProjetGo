import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Game: { playerName: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function LoginScreen({ navigation }: { navigation: any }) {
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
}

function GameScreen({ route }: { route: any }) {
  const name = route?.params?.playerName ?? 'Joueur';

  const size = 9;
  const [board, setBoard] = useState<number[][]>(
    () => Array.from({ length: size }, () => Array.from({ length: size }, () => 0))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [lastAction, setLastAction] = useState<string>('Aucune action');
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Créer les intersections (81 points sur un plateau 9x9)
  const intersections = useMemo(() => {
    const points = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        points.push({ row, col });
      }
    }
    return points;
  }, [size]);

  const handlePlaceStone = (row: number, col: number) => {
    const logMessage = `🎯 Click sur (${row}, ${col}) - Joueur: ${currentPlayer === 1 ? 'Noir' : 'Blanc'}`;
    setDebugLogs(prev => [...prev.slice(-4), logMessage]);
    
    console.log(`🎯 Click sur intersection (${row}, ${col})`);
    console.log(`📊 État actuel: ${board[row][col] === 0 ? 'Vide' : 'Occupé'}`);
    console.log(`🎮 Joueur actuel: ${currentPlayer === 1 ? 'Noir' : 'Blanc'}`);
    
    if (board[row][col] !== 0) {
      const errorLog = `❌ Intersection (${row}, ${col}) déjà occupée`;
      setDebugLogs(prev => [...prev.slice(-4), errorLog]);
      console.log(`❌ Intersection déjà occupée, placement impossible`);
      return;
    }
    
    const successLog = `✅ Pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} placée en (${row}, ${col})`;
    setDebugLogs(prev => [...prev.slice(-4), successLog]);
    console.log(`✅ Placement de la pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} en (${row}, ${col})`);
    
    setLastAction(`Pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} placée en (${row}, ${col})`);
    
    setBoard((prev) => {
      const next = prev.map((r) => r.slice());
      next[row][col] = currentPlayer;
      console.log(`🔄 Nouveau plateau:`, next);
      return next;
    });
    
    setCurrentPlayer((p) => {
      const newPlayer = p === 1 ? 2 : 1;
      const turnLog = `🔄 Tour: ${p === 1 ? 'Noir' : 'Blanc'} → ${newPlayer === 1 ? 'Noir' : 'Blanc'}`;
      setDebugLogs(prev => [...prev.slice(-4), turnLog]);
      console.log(`🔄 Changement de joueur: ${p === 1 ? 'Noir' : 'Blanc'} → ${newPlayer === 1 ? 'Noir' : 'Blanc'}`);
      return newPlayer;
    });
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Plateau 9x9</Text>
      <Text style={styles.subtitle}>Bon jeu, {name} !</Text>
      <Text style={styles.turnText}>Tour: {currentPlayer === 1 ? 'Noir' : 'Blanc'}</Text>
      
      {/* Debug info */}
      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>Debug: Cliquez sur une intersection</Text>
        <Text style={styles.debugText}>Pierres placées: {board.flat().filter(cell => cell !== 0).length}</Text>
        <Text style={styles.debugText}>Dernière action: {lastAction}</Text>
        
        {/* Logs visuels */}
        <View style={styles.logsContainer}>
          <Text style={styles.logsTitle}>Logs en temps réel:</Text>
          {debugLogs.map((log, index) => (
            <Text key={index} style={styles.logText}>{log}</Text>
          ))}
        </View>
      </View>
      
      <View style={[styles.board, { aspectRatio: 1 }]}> 
        {/* Grid layer - Lignes de la grille */}
        <View pointerEvents="none" style={styles.gridLayer}>
          {/* Lignes horizontales */}
          {Array.from({ length: size }, (_, i) => (
            <View 
              key={`h-${i}`} 
              style={[
                styles.gridLineHorizontal, 
                { top: `${(i / (size - 1)) * 100}%` }
              ]} 
            />
          ))}
          {/* Lignes verticales */}
          {Array.from({ length: size }, (_, i) => (
            <View 
              key={`v-${i}`} 
              style={[
                styles.gridLineVertical, 
                { left: `${(i / (size - 1)) * 100}%` }
              ]} 
            />
          ))}
          {/* Points étoiles (hoshi) pour 9x9: (2,2) (2,6) (6,2) (6,6) (4,4) */}
          {[{ r: 2, c: 2 }, { r: 2, c: 6 }, { r: 6, c: 2 }, { r: 6, c: 6 }, { r: 4, c: 4 }].map(({ r, c }, idx) => (
            <View
              key={`s-${idx}`}
              style={[
                styles.starPoint,
                { top: `${(r / (size - 1)) * 100}%`, left: `${(c / (size - 1)) * 100}%` },
              ]}
            />
          ))}
        </View>

        {/* Couche des intersections cliquables et des pierres */}
        {intersections.map(({ row, col }) => {
          const cellValue = board[row][col];
          return (
            <TouchableOpacity 
              key={`${row}-${col}`} 
              activeOpacity={0.7} 
              onPress={() => handlePlaceStone(row, col)}
              style={[
                styles.intersection,
                { 
                  top: `${(row / (size - 1)) * 100}%`, 
                  left: `${(col / (size - 1)) * 100}%` 
                }
              ]}
            >
              {cellValue !== 0 && (
                <View
                  style={[
                    styles.stone,
                    cellValue === 1 ? styles.stoneBlack : styles.stoneWhite,
                  ]}
                />
              )}
              {/* Debug: afficher les coordonnées pour vérifier l'alignement */}
              <Text style={styles.intersectionDebug}>{row},{col}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Partie' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
  turnText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  debugInfo: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  logsContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e8f4fd',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  logsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  logText: {
    fontSize: 11,
    color: '#333',
    marginBottom: 2,
  },
  board: {
    backgroundColor: '#E5C485',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
  },
  intersection: {
    position: 'absolute',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    marginTop: -10,
  },
  intersectionDebug: {
    position: 'absolute',
    fontSize: 8,
    color: '#999',
    top: -8,
    left: -8,
  },
  gridLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: '#7C5A24',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1.5,
    backgroundColor: '#7C5A24',
  },
  starPoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    marginLeft: -3,
    marginTop: -3,
    borderRadius: 3,
    backgroundColor: '#5a3a0a',
    opacity: 0.8,
  },
  stone: {
    width: '95%',
    aspectRatio: 1,
    borderRadius: 999,
    alignSelf: 'center',
    elevation: 2,
  },
  stoneBlack: {
    backgroundColor: '#111',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  stoneWhite: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

