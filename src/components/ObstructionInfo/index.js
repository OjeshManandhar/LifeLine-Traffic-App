import React, { useState, useEffect } from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// utils
import reverseGeocoder from 'utils/reverseGeocoder';

// assets
import cross from 'assets/images/cross.png';

// styles
import styles, { containerHeight } from './styles';

function ObstructionInfo({
  show,
  onUse,
  onClose,
  newObstruction,
  pickedCoordinate,
  selectedObstruction
}) {
  const [findingInfo, setFindingInfo] = useState(true);
  const [pickedLocation, setPickedLocation] = useState(null);

  useEffect(() => {
    if (newObstruction) {
      setPickedLocation(null);
      setFindingInfo(true);

      //reverseGeocode
      pickedCoordinate &&
        reverseGeocoder(pickedCoordinate)
          .then(result => {
            setPickedLocation(result);
            setFindingInfo(false);
          })
          .catch(error => console.log('error:', error));
    } else {
      setFindingInfo(false);
      setPickedLocation(selectedObstruction);
    }
  }, [
    setFindingInfo,
    newObstruction,
    pickedCoordinate,
    setPickedLocation,
    selectedObstruction
  ]);

  if (newObstruction && !pickedCoordinate) return <></>;
  if (!newObstruction && !selectedObstruction) return <></>;

  return (
    <AnimatedView
      in={show}
      timeout={0.5 * 1000}
      viewStyles={styles.mainContainer}
      animationStyles={{
        appear: {
          opacity: [0, 1],
          bottom: [-containerHeight, 5]
        },
        enter: {
          opacity: [0, 1],
          bottom: [-containerHeight, 5]
        },
        exit: {
          opacity: [1, 0],
          bottom: [5, -containerHeight]
        }
      }}
    >
      {findingInfo && !pickedLocation ? (
        <View style={styles.container}>
          <Text style={styles.loading} numberOfLines={1}>
            loading
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeName} numberOfLines={1}>
              {pickedLocation.properties.name}
            </Text>
            <Text style={styles.placeLocation} numberOfLines={1}>
              {pickedLocation.properties.location}
            </Text>
          </View>
        </View>
      )}
    </AnimatedView>
  );
}

ObstructionInfo.propTypes = {
  show: PropTypes.bool.isRequired
};

export default ObstructionInfo;
