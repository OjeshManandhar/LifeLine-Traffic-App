import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';

// components
import Map from 'components/Map';
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';
import AnimatedImageButton from 'components/AnimatedImageButton';

// assets
import back from 'assets/images/back.png';
import account from 'assets/images/dead.png';
import addButton from 'assets/images/addButton.png';

// global
import { EMapViewStatus } from 'global/enum';

// styles
import styles, { topContainerHeight } from './styles';

function MapView({ toAccount, setBackHandler }) {
  const [mapViewStatus, setMapViewStatus] = useState(EMapViewStatus.clear);

  return (
    <View style={styles.container}>
      <Map />

      {/* Account Button */}
      <AnimatedImageButton
        in={mapViewStatus === EMapViewStatus.clear}
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

      {/* Top Container */}
      <AnimatedView
        in={mapViewStatus === EMapViewStatus.picking}
        timeout={0.25 * 1000}
        viewStyles={styles.topAnimatedContainer}
        animationStyles={{
          enter: {
            opacity: [0, 1],
            top: [-topContainerHeight, 5]
          },
          exit: {
            opacity: [1, 0],
            top: [5, -topContainerHeight]
          }
        }}
      >
        <Pressable
          style={styles.backIconContainer}
          onPress={() => {
            setMapViewStatus(EMapViewStatus.clear);
          }}
        >
          <Image source={back} style={styles.backIcon} />
        </Pressable>

        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>Tap to pick a location</Text>
        </View>
      </AnimatedView>

      {/* Add Button */}
      <AnimatedImageButton
        in={mapViewStatus === EMapViewStatus.clear}
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
        onPress={() => {
          setMapViewStatus(EMapViewStatus.picking);
        }}
      />
    </View>
  );
}

export default MapView;
