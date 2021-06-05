import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';

import {addNote} from '../api';
import {ErrorAlert, Spinner} from '../components';
import {NOTES_SCREEN} from '../constants';
import {SPACING, FONT_SIZE} from '../theme';

export default function AddNote({navigation}) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = () => {
    if (!title || !content) {
      return;
    }

    setIsLoading(true);
    addNote(title, content)
      .then(() => navigation.navigate(NOTES_SCREEN))
      .catch(ErrorAlert)
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Add Note</Text>
        <TextInput
          style={styles.titleInput}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
        />
        <TextInput
          style={styles.contentInput}
          onChangeText={setContent}
          value={content}
          placeholder="Content"
          multiline
        />
      </View>
      <View>
        <Button title="Add" onPress={handleAddNote} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: SPACING.MEDIUM,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    fontWeight: 'bold',
  },
  titleInput: {
    fontFamily: 'Avenir',
    fontSize: FONT_SIZE.EXTRA_EXTRA_LARGE,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginTop: SPACING.MEDIUM,
  },
  contentInput: {
    fontSize: FONT_SIZE.MEDIUM,
    fontStyle: 'italic',
    marginTop: SPACING.SMALL,
  },
});
