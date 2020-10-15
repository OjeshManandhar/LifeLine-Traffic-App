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
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// navigator
import Navigator from 'navigator';

// dummy_api
import { checkToken } from 'dummy_api';

// utils
import UserToken from 'utils/userToken';
import UserLocation from 'utils/userLocation';

// global
import Fonts from 'global/fonts';
import Colors from 'global/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: Fonts.regular }
  }
};

// UserLocation.init();

function App() {
  const [isReady, setIsReady] = useState(false);

  // Check userToken
  useEffect(() => {
    (async function () {
      await UserToken.init();

      const userToken = UserToken.get();

      if (userToken) {
        const { valid } = await checkToken(userToken, true);
        if (!valid) {
          await UserToken.delete();
        }
      }

      setIsReady(true);

      SplashScreen.hide();
    })();
  }, [setIsReady]);

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle='dark-content' />

      {isReady && <Navigator />}
    </PaperProvider>
  );
}

export default App;
