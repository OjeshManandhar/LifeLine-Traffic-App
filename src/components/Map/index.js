import React, { useEffect, useCallback } from 'react';
import { Text, PermissionsAndroid } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// assets
import startMarker from 'assets/images/map/startMarker.png';
import trafficMarker from 'assets/images/map/trafficMarker.png';
import destinationMarker from 'assets/images/map/destinationMarker.png';
import obstructionMarker from 'assets/images/map/obstructionMarker.png';
import pickedLocationMarker from 'assets/images/map/pickedLocationMarker.png';

// global

import { MapLayerIndex } from 'global/zIndex';

// styles
import styles, { layerStyles } from './styles';

function Map({
  isPicking,
  pickedCoordinate,
  setPickedCoordintate,
  toggleObstructionInfo,
  createdObstructionList,
  setSelectedObstruction
}) {
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

  const renderCreatedObstruction = useCallback(() => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: createdObstructionList
    };

    return (
      <MapboxGL.ShapeSource
        id='createdObstructionMarkers-Source'
        shape={featureCollection}
        onPress={data =>
          setSelectedObstruction(currentObstruction => {
            if (
              !currentObstruction ||
              currentObstruction.properties.id ===
                data.features[0].properties.id
            ) {
              toggleObstructionInfo(data.features[0]);
            }

            return data.features[0];
          })
        }
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.obstructionMarker}
          id='createdObstructionMarkers-Layer'
          sourceID='createdObstructionMarkers-Source'
          layerIndex={MapLayerIndex.obstructionMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [toggleObstructionInfo, createdObstructionList, setSelectedObstruction]);

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

      <MapboxGL.Images
        images={{
          startMarker: startMarker,
          trafficMarker: trafficMarker,
          destinationMarker: destinationMarker,
          obstructionMarker: obstructionMarker,
          pickedLocationMarker: pickedLocationMarker
        }}
      />

      {isPicking && pickedCoordinate && renderPickedCoordinate()}

      {createdObstructionList.length > 0 && renderCreatedObstruction()}
    </MapboxGL.MapView>
  );
}

export default Map;
