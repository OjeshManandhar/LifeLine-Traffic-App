/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
// Note: If you skip this step, your app may crash in production even if it works fine in development.

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

// packages
import SplashScreen from 'react-native-splash-screen';

// navigator
import Navigator from 'navigator';

// dummy_api
import { checkToken } from 'dummy_api';

// utils
import UserToken from 'utils/userToken';
import UserLocation from 'utils/userLocation';

// UserLocation.init();

function App() {
  const [isReady, setIsReady] = useState(false);

  async function loadResources() {
    await UserToken.init();

    const userToken = await UserToken.get();

    console.log('userToken:', userToken);

    if (userToken) {
      const { valid } = await checkToken(userToken);
      if (!valid) {
        await UserToken.delete();
      }
    }
  }

  // Prevent Auto hide of Splash Screen
  useEffect(() => {
    (async function () {
      await loadResources();

      setIsReady(true);

      SplashScreen.hide();
    })();
  }, [setIsReady]);

  // if (!isReady) return <></>;

  return (
    <React.Fragment>
      <StatusBar barStyle='dark-content' />

      <Navigator />
    </React.Fragment>
  );
}

export default App;
