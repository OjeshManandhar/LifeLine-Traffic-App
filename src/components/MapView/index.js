import React from 'react';
import { View, Text, Button } from 'react-native';

function MapView({ toAccount, setBackHandler }) {
  return (
    <View>
      <Text>MapView</Text>

      <Button title='Account' onPress={() => toAccount(123)} />
    </View>
  );
}

export default MapView;
