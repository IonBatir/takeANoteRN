import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNotes = () =>
  AsyncStorage.getAllKeys()
    .then(notesKeys => AsyncStorage.multiGet(notesKeys))
    .then(notes =>
      Promise.resolve(
        notes
          .map(note => ({id: note[0], ...JSON.parse(note[1])}))
          .sort((a, b) => a.id < b.id),
      ),
    );

export const addNote = (title, content) =>
  AsyncStorage.setItem('@' + Date.now(), JSON.stringify({title, content}));

export const deleteNote = key => AsyncStorage.removeItem('@' + key);
