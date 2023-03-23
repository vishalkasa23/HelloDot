import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkInProgressScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work in Progress</Text>
      <Text style={styles.subtitle}>This feature is currently being developed.</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progress, { width: '25%' }]} />
        <View style={[styles.progress, { width: '50%' }]} />
        <View style={[styles.progress, { width: '75%' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#3b3b3b',
  },
});

export default WorkInProgressScreen;
