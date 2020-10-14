/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
// Note: If you skip this step, your app may crash in production even if it works fine in development.

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

// packages
import SplashScreen from 'react-native-splash-screen';

// navigator
import Navigator from 'navigator';

function App() {
  // Hide Splash screen
  useEffect(SplashScreen.hide, []);

  return (
    <React.Fragment>
      <StatusBar barStyle='dark-content' />

      <Navigator />
    </React.Fragment>
  );
}

export default App;
