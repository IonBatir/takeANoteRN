import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {SPACING, FONT_SIZE} from '../theme';

export default function Note({route}) {
  const {title, content} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.MEDIUM,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginTop: SPACING.MEDIUM,
  },
  content: {
    fontSize: FONT_SIZE.MEDIUM,
    fontStyle: 'italic',
    marginTop: SPACING.SMALL,
  },
});
