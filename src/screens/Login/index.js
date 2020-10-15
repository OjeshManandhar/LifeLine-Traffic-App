import React from 'react';
import { Text, View, Button } from 'react-native';

// global
import Fonts from 'global/fonts';
import Routes from 'global/routes';

// env
import { USER_TOKEN_KEY } from '@env';

function Login({ navigation }) {
  return (
    <View>
      <Text style={{ fontFamily: Fonts.regular }}>Login</Text>

      <Text style={{ fontFamily: Fonts.italic }}>
        User token: {USER_TOKEN_KEY}
      </Text>

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
