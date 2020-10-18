import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

// packages
import { Divider, TextInput } from 'react-native-paper';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// utils
import reverseGeocoder from 'utils/reverseGeocoder';

// assets
import cross from 'assets/images/cross.png';

// global
import { ObstructionInfoText } from 'global/strings';

// styles
import styles, { containerHeight } from './styles';

function ObstructionInfo({
  show,
  onUse,
  onClose,
  description,
  descriptionRef,
  newObstruction,
  pickedCoordinate,
  selectedObstruction
}) {
  const [des, setDes] = description;

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
          <View style={styles.loadingContainer}>
            <Text style={styles.loading} numberOfLines={1}>
              {ObstructionInfoText.loading}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.placeName} numberOfLines={1}>
              {pickedLocation.properties.name}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                const des = descriptionRef.current;
                if (des && des.isFocused()) {
                  des.blur();
                  updateDestinationInfo && updateDestinationInfo();
                }
                onClose();
              }}
            >
              <Image source={cross} style={styles.cross} />
            </TouchableWithoutFeedback>
          </View>

          <Text style={styles.placeLocation} numberOfLines={1}>
            {pickedLocation.properties.location}
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.footer}>
            <TextInput
              ref={descriptionRef}
              mode='flat'
              dense={true}
              multiline={false}
              numberOfLine={1}
              returnKeyType='done'
              style={styles.description}
              label={ObstructionInfoText.description}
              placeholder={ObstructionInfoText.description}
              value={des}
              onChangeText={setDes}
              /**
               * Cannot do onBlur={updateDestinationInfo}
               * Because updateDestinationInfo will take the object argument from
               * onBlur and use it as emergency
               */
              onBlur={() => updateDestinationInfo && updateDestinationInfo()}
            />

            <View style={styles.useButton}>
              <Image source={cross} style={styles.useIcon} />
            </View>
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
