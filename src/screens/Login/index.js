import React from 'react';
import { Text, View, Button } from 'react-native';

// global
import Routes from './../../global/routes';

function Login({ navigation }) {
  console.log('Login');

  return (
    <View>
      <Text>Login</Text>

      <Button
        title='MapScreen'
        onPress={() => navigation.navigate(Routes.map)}
      />
    </View>
  );
}

export default Login;
