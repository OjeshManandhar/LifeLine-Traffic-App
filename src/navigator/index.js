import React from 'react';

// packages
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from './../screens/Login';
import MapScreen from './../screens/MapScreen';

// global
import Routes from './../global/routes';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.login} headerMode='none'>
        <Stack.Screen name={Routes.login} component={Login} />
        <Stack.Screen name={Routes.map} component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
