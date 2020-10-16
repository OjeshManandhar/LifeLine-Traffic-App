import React from 'react';
import { View, Image, Button, Pressable } from 'react-native';

// components
import Map from 'components/Map';
import Text from 'components/Text';

// assets
import account from 'assets/images/dead.png';

// styles
import styles from './styles';

function MapView({ toAccount, setBackHandler }) {
  return (
    <View style={styles.container}>
      <Map />

      <Pressable style={styles.avatarContainer} onPress={() => toAccount(123)}>
        <Image source={account} style={styles.avatar} />
      </Pressable>
    </View>
  );
}

export default MapView;
