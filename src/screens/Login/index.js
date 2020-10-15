import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';

// packages
import SplashScreen from 'react-native-splash-screen';

// global
import Routes from 'global/routes';

// env
import { USER_TOKEN_KEY } from '@env';

function Login({ navigation }) {
  // Hide Splash screen
  useEffect(SplashScreen.hide, []);

  return (
    <View>
      <Text>Login</Text>

      <Text>User token: {USER_TOKEN_KEY}</Text>

      <Button
        title='MapScreen'
        onPress={() =>
          navigation.navigate(Routes.map, {
            userId: 1234567890
          })
        }
      />
    </View>
  );
}

export default Login;
