import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// assets
import cross from 'assets/images/cross.png';

// styles
import styles, { containerHeight } from './styles';

function ObstructionInfo({ show, onClose, selectedObstruction }) {
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
      {selectedObstruction ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.placeName} numberOfLines={1}>
              {selectedObstruction.properties.name}
            </Text>
            <TouchableWithoutFeedback onPress={onClose}>
              <Image source={cross} style={styles.cross} />
            </TouchableWithoutFeedback>
          </View>

          <Text style={styles.placeLocation} numberOfLines={1}>
            {selectedObstruction.properties.location}
          </Text>

          <ScrollView
            horizontal={true}
            style={styles.descriptionContainer}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.description} numberOfLines={1}>
              {selectedObstruction.properties.description}
            </Text>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.placeName} numberOfLines={1}>
            Select an obstruction
          </Text>
        </View>
      )}
    </AnimatedView>
  );
}

ObstructionInfo.propTypes = {
  show: PropTypes.bool.isRequired
};

export default ObstructionInfo;
