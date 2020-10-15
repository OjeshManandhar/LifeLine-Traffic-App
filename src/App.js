/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
// Note: If you skip this step, your app may crash in production even if it works fine in development.

import React from 'react';
import { StatusBar } from 'react-native';

// navigator
import Navigator from 'navigator';

// utils
import UserLocation from 'utils/userLocation';

// UserLocation.init();

function App() {
  return (
    <React.Fragment>
      <StatusBar barStyle='dark-content' />

      <Navigator />
    </React.Fragment>
  );
}

export default App;
