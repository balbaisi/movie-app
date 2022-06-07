import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Listing from './Listing';
import Movie from './Movie';

export type Props = {};

const Stack = createNativeStackNavigator();

const App: React.FC<Props> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'List'}
          component={Listing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Movie'}
          component={Movie}
          options={{
            title: '',
            headerTintColor: 'black',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
