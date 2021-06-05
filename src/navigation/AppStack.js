import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NotesScreen from '../screens/Notes';
import NoteScreen from '../screens/Note';
import AddNoteScreen from '../screens/AddNote';
import {NOTES_SCREEN, NOTE_SCREEN, ADD_NOTE_SCREEN} from '../constants';

const Stack = createStackNavigator();

const AddNoteButton = ({navigation}) => (
  <Button
    onPress={() => navigation.navigate(ADD_NOTE_SCREEN)}
    title="Add Note"
  />
);

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NOTES_SCREEN}>
        <Stack.Screen
          name={NOTES_SCREEN}
          component={NotesScreen}
          options={({navigation}) => ({
            headerRight: () => <AddNoteButton navigation={navigation} />,
            title: 'Take A Note',
          })}
        />
        <Stack.Screen
          name={NOTE_SCREEN}
          component={NoteScreen}
          options={{
            title: 'Note',
          }}
        />
        <Stack.Screen
          name={ADD_NOTE_SCREEN}
          component={AddNoteScreen}
          options={{
            title: 'Add Note',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
