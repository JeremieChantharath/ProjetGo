import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface GameRulesProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GameRules: React.FC<GameRulesProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>Règles du Jeu de Go</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Objectif</Text>
            <Text style={styles.ruleText}>
              Entourer le plus de territoire possible avec vos pierres tout en capturant celles de l'adversaire.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚫ Placement des Pierres</Text>
            <Text style={styles.ruleText}>
              • Les joueurs placent alternativement une pierre sur une intersection vide
            </Text>
            <Text style={styles.ruleText}>
              • Noir commence toujours
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔗 Groupes et Libertés</Text>
            <Text style={styles.ruleText}>
              • Les pierres de même couleur connectées forment un groupe
            </Text>
            <Text style={styles.ruleText}>
              • Une liberté = intersection vide adjacente au groupe
            </Text>
            <Text style={styles.ruleText}>
              • Un groupe sans liberté est capturé et retiré du plateau
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Règles de Capture</Text>
            <Text style={styles.ruleText}>
              • Une pierre est capturée quand elle n'a plus de libertés
            </Text>
            <Text style={styles.ruleText}>
              • Un groupe entier peut être capturé d'un coup
            </Text>
            <Text style={styles.ruleText}>
              • La capture libère des libertés pour d'autres groupes
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Règle du Suicide</Text>
            <Text style={styles.ruleText}>
              • Un joueur ne peut pas se suicider (placer une pierre sans liberté)
            </Text>
            <Text style={styles.ruleText}>
              • Sauf si ce placement capture des pierres adverses
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏁 Fin de Partie</Text>
            <Text style={styles.ruleText}>
              • Quand les deux joueurs passent consécutivement
            </Text>
            <Text style={styles.ruleText}>
              • Le territoire est compté + les pierres capturées
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Conseils</Text>
            <Text style={styles.ruleText}>
              • Surveillez les libertés de vos groupes
            </Text>
            <Text style={styles.ruleText}>
              • Créez des formes qui ne peuvent pas être facilement capturées
            </Text>
            <Text style={styles.ruleText}>
              • Utilisez la capture pour créer de l'espace
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 0,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
});

