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
import MapboxGL from '@react-native-mapbox-gl/maps';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// navigator
import Navigator from 'navigator';

// api
// import tokenCheck from 'api/tokenCheck';

// utils
import UserInfo from 'utils/userInfo';

// global
import Fonts from 'global/fonts';
import Colors from 'global/colors';

// env
import { MAPBOX_API_KEY } from '@env';

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

MapboxGL.setAccessToken(MAPBOX_API_KEY);

function App() {
  const [isReady, setIsReady] = useState(false);

  // Check UserInfo
  useEffect(() => {
    (async function () {
      await UserInfo.init();

      // const userToken = UserInfo.getToken();

      // try {
      //   if (userToken) {
      //     tokenCheck(userToken)
      //       .then(async response => {
      //         console.log('Token check response:', response);

      //         const newToken = response.data;

      //         await UserInfo.setNewToken(newToken);
      //       })
      //       .catch(async err => {
      //         console.log('Token check error:', error);

      //         await UserInfo.delete();
      //       });
      //   }
      // } catch {
      //   console.log('Token check catch');
      // }

      setIsReady(true);
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
