import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

// packages
import Slider from '@react-native-community/slider';
import { Divider } from 'react-native-paper';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// assets
import cross from 'assets/images/cross.png';

// global
import Colors from 'global/colors';
import { RouteInfoText } from 'global/strings';

// styles
import styles, { ContainerHeight } from './styles';

function RouteInfo({ show, route, onClose }) {
  function distanceToString(distance) {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)} km`;
    } else {
      return `${parseInt(distance, 10)} m`;
    }
  }

  function timeToString(time) {
    const hours = parseInt(time / 3600, 10);
    const minutes = parseInt(time / 60 - hours * 60, 10);
    const seconds = parseInt(time - minutes * 60 - hours * 60 * 60, 10);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes} mins`;
    } else {
      return `${seconds} sec`;
    }
  }

  if (!route) return <></>;
  const destination = route.properties.destination;

  return (
    <AnimatedView
      in={show}
      timeout={0.5 * 1000}
      viewStyles={styles.mainContainer}
      animationStyles={{
        appear: {
          opacity: [0, 1],
          bottom: [-ContainerHeight, 5]
        },
        enter: {
          opacity: [0, 1],
          bottom: [-ContainerHeight, 5]
        },
        exit: {
          opacity: [1, 0],
          bottom: [5, -ContainerHeight]
        }
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.placeName} numberOfLines={1}>
            {destination.properties.name}
          </Text>
          <TouchableWithoutFeedback onPress={onClose}>
            <Image source={cross} style={styles.cross} />
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.placeLocation} numberOfLines={1}>
          {destination.properties.location}
        </Text>

        <Text style={styles.routeText}>
          {timeToString(route.properties.duration)} (
          {distanceToString(route.properties.distance)})
        </Text>

        <Divider style={styles.divider} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeading}>
            {RouteInfoText.description}
          </Text>

          <ScrollView
            horizontal={true}
            style={styles.descriptionTextContainer}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.descriptionText} numberOfLines={1}>
              {route.properties.description}
            </Text>
          </ScrollView>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>{RouteInfoText.emergency}</Text>

          <Slider
            style={styles.slider}
            disabled={true}
            step={1}
            minimumValue={1}
            maximumValue={3}
            value={route.properties.emergency}
            thumbTintColor={Colors[`emergency_${route.properties.emergency}`]}
            maximumTrackTintColor={Colors.maxTint}
            minimumTrackTintColor={
              Colors[`emergency_${route.properties.emergency}`]
            }
          />
        </View>
      </View>
    </AnimatedView>
  );
}

RouteInfo.propTypes = {
  show: PropTypes.bool.isRequired
};

export default RouteInfo;
