import React, { useEffect, useCallback } from 'react';
import { Text, PermissionsAndroid } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// styles
import styles from './styles';

function Map({ isPicking, pickedCoordinate, setPickedCoordintate }) {
  async function askGPSPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App GPS Permission',
          message:
            'App needs access to your location (GPS & Internet) ' +
            'so we can pin-point your exact location.',
          buttonNegative: 'No, thanks',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('FINE LOCATION Access Granted');
      } else {
        console.log('FINE LOCATION Access Denied');
      }
    } catch (err) {
      console.warn('FINE ACCESS Permission error:', err);
    }
  }

  // For Permission
  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(result => {
      if (!result) {
        askGPSPermissions();
      }
    });
  }, []);

  const renderPickedCoordinate = useCallback(() => {
    return (
      <MapboxGL.PointAnnotation
        id='user-picked-location'
        title='Picked DEstination'
        coordinate={pickedCoordinate}
      />
    );
  }, [pickedCoordinate]);

  return (
    <MapboxGL.MapView
      style={styles.container}
      styleURL={MapboxGL.StyleURL.Outdoors}
      compassViewMargins={{ x: 10, y: 90 }}
      onPress={
        isPicking
          ? data => setPickedCoordintate(data.geometry.coordinates)
          : undefined
      }
    >
      <MapboxGL.UserLocation visible animated showsUserHeadingIndicator />

      <MapboxGL.Camera
        animationMode={'easeTo'}
        animationDuration={1.5 * 1000}
        followUserLocation={true}
        followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
        followZoomLevel={14}
      />

      {isPicking && pickedCoordinate && renderPickedCoordinate()}
    </MapboxGL.MapView>
  );
}

export default Map;
