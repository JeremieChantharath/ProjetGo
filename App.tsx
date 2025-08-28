import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { GameScreen } from './src/screens/GameScreen';
import { RootStackParamList } from './src/types/game';

const Stack = createNativeStackNavigator<RootStackParamList>();

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

