import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import {COLOR, FONT_SIZE, LIST_ITEM_HEIGHT, SPACING} from '../theme';

export default function Note({title, content, handlePress}) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.content} numberOfLines={2}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: LIST_ITEM_HEIGHT,
    marginLeft: SPACING.MEDIUM,
    marginVertical: SPACING.SMALL,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.GREY,
  },
  title: {
    fontFamily: 'Futura',
    fontSize: FONT_SIZE.MEDIUM,
    marginBottom: SPACING.SMALL,
  },
  content: {fontStyle: 'italic'},
});
