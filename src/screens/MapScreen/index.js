import React from 'react';
import { Text, View, Button } from 'react-native';

// global
import Routes from './../../global/routes';

function MapScreen({ navigation }) {
  console.log('MapScreen');

  return (
    <View>
      <Text>MapScreen</Text>

      <Button title='Login' onPress={() => navigation.navigate(Routes.login)} />
    </View>
  );
}

export default MapScreen;
