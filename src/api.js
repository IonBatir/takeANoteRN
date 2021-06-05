import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNotes = () =>
  AsyncStorage.getAllKeys().then(notesKeys =>
    Promise.all(notesKeys.map(noteKey => AsyncStorage.getItem(noteKey))),
  );

export const addNote = (title, content) => {
  const key = Date.now();
  return AsyncStorage.setItem(key, JSON.stringify({title, content}));
};

export const deleteNote = key => AsyncStorage.removeItem(key);
