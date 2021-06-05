import React, {useState} from 'react';
import {SafeAreaView, View, Text, FlatList, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {Note, Spinner, ErrorAlert} from '../components';
import {FONT_SIZE, SPACING, LIST_ITEM_HEIGHT} from '../theme';
import {NOTE_SCREEN} from '../constants';
import {getNotes} from '../api';

export default function Notes({navigation}) {
  const [notes, setNotes] = useState({data: [], isLoading: true});

  useFocusEffect(
    React.useCallback(() => {
      getNotes()
        .then(data => setNotes({isLoading: false, data}))
        .catch(() => {
          setNotes({isLoading: false, data: []});
          ErrorAlert();
        });
    }, []),
  );

  const renderNote = ({item}) => (
    <Note
      title={item.title}
      content={item.content}
      handlePress={() => navigation.navigate(NOTE_SCREEN, {...item})}
    />
  );

  if (notes.isLoading) {
    return <Spinner />;
  }

  if (!notes.data.length) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text>No notes, yet!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <View style={styles.list}>
        <FlatList
          data={notes.data}
          renderItem={renderNote}
          keyExtractor={note => note.id}
          getItemLayout={(_, index) => ({
            length: LIST_ITEM_HEIGHT,
            offset: LIST_ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.MEDIUM,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
});
