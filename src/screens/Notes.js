import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {Note, Spinner, ErrorAlert} from '../components';
import {FONT_SIZE, SPACING, LIST_ITEM_HEIGHT} from '../theme';
import {NOTE_SCREEN} from '../constants';
import {deleteNote, getNotes} from '../api';

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

  const renderNote = ({item}) => {
    const renderRightActions = progress => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [64, 0],
      });

      const handleDeleteNote = () => {
        setNotes({isLoading: true, data: []});
        deleteNote(item.id)
          .then(() =>
            getNotes().then(data => setNotes({isLoading: false, data})),
          )
          .catch(() => {
            setNotes({isLoading: false, data: []});
            ErrorAlert();
          });
      };

      return (
        <View style={styles.swipeableView}>
          <Animated.View
            style={[styles.animatedView, {transform: [{translateX: trans}]}]}>
            <RectButton style={styles.rightAction} onPress={handleDeleteNote}>
              <Text style={styles.actionText}>Delete</Text>
            </RectButton>
          </Animated.View>
        </View>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <Note
          title={item.title}
          content={item.content}
          handlePress={() => navigation.navigate(NOTE_SCREEN, {...item})}
        />
      </Swipeable>
    );
  };

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
  swipeableView: {
    width: 75,
  },
  animatedView: {
    flex: 1,
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
