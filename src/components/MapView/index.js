import React from 'react';
import { View, Image, Button, Pressable } from 'react-native';

// components
import Map from 'components/Map';
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';
import AnimatedImageButton from 'components/AnimatedImageButton';

// assets
import account from 'assets/images/dead.png';
import addButton from 'assets/images/addButton.png';

// styles
import styles from './styles';
import { add } from 'react-native-reanimated';

function MapView({ toAccount, setBackHandler }) {
  return (
    <View style={styles.container}>
      <Map />

      {/* Account Button */}
      <AnimatedImageButton
        in={true}
        image={account}
        timeout={0.25 * 1000}
        useViewContainer={true}
        imageStyles={styles.avatar}
        viewProps={{ pointerEvents: 'auto' }}
        viewStyles={styles.avatarContainer}
        animationStyles={{
          enter: {
            opacity: [0, 1]
          },
          exit: {
            opacity: [1, 0]
          }
        }}
        onPress={() => toAccount(123)}
      />

      {/* Add Button */}
      <AnimatedImageButton
        in={true}
        image={addButton}
        timeout={0.25 * 1000}
        useViewContainer={true}
        imageStyles={styles.addIconImage}
        viewProps={{ pointerEvents: 'auto' }}
        viewStyles={styles.addIconContainer}
        animationStyles={{
          enter: {
            opacity: [0, 1]
          },
          exit: {
            opacity: [1, 0]
          }
        }}
        onPress={() => console.log('Add obstruction')}
      />
    </View>
  );
}

export default MapView;
