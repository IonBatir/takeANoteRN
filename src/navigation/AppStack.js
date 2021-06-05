import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Notes, Note, AddNote} from '../screens';
import {NOTES_SCREEN, NOTE_SCREEN, ADD_NOTE_SCREEN} from '../constants';

const Stack = createStackNavigator();

const AddNoteButton = ({navigation}) => (
  <Button onPress={() => navigation.navigate(ADD_NOTE_SCREEN)} title="➕" />
);

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NOTES_SCREEN}>
        <Stack.Screen
          name={NOTES_SCREEN}
          component={Notes}
          options={({navigation}) => ({
            headerRight: () => <AddNoteButton navigation={navigation} />,
            title: 'Take A Note',
          })}
        />
        <Stack.Screen
          name={NOTE_SCREEN}
          component={Note}
          options={{
            headerBackTitle: 'Notes',
            title: 'Note',
          }}
        />
        <Stack.Screen
          name={ADD_NOTE_SCREEN}
          component={AddNote}
          options={{
            headerBackTitle: 'Notes',
            title: 'Add Note',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
