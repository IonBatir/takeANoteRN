import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

export default function Notes() {
  return (
    <SafeAreaView style={styles.centerContainer}>
      <Text>Notes</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
