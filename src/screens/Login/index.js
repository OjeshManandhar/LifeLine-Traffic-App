import React from 'react';
import { Text, View, Button } from 'react-native';

// global
import Routes from './../../global/routes';

function Login({ navigation }) {
  return (
    <View>
      <Text>Login</Text>

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
