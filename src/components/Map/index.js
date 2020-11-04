import React, { useEffect, useCallback } from 'react';
import { PermissionsAndroid } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// assets
import startMarker from 'assets/images/map/startMarker.png';
import trafficMarker from 'assets/images/map/trafficMarker.png';
import ambulanceMarker from 'assets/images/map/ambulanceMarker.png';
import destinationMarker from 'assets/images/map/destinationMarker.png';
import obstructionMarker from 'assets/images/map/obstructionMarker.png';

// global

import { MapLayerIndex } from 'global/zIndex';

// styles
import styles, { layerStyles } from './styles';

function Map({
  isPicking,
  toAccount,
  driverRoutes,
  driverLocation,
  obstructionList,
  trafficLocation,
  pickedCoordinate,
  setPickedCoordintate,
  toggleObstructionInfo,
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

  const renderObstruction = useCallback(() => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: obstructionList
    };

    return (
      <MapboxGL.ShapeSource
        id='createdObstructionMarkers-Source'
        shape={featureCollection}
        onPress={data =>
          setSelectedObstruction(currentObstruction => {
            if (!currentObstruction) {
              toggleObstructionInfo(data.features[0]);
            } else {
              if (
                currentObstruction.properties.id ===
                  data.features[0].properties.id &&
                currentObstruction.properties.createdBy ===
                  data.features[0].properties.createdBy
              ) {
                toggleObstructionInfo(data.features[0]);
              } else {
                toggleObstructionInfo(data.features[0], true);
              }
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
  }, [toggleObstructionInfo, obstructionList, setSelectedObstruction]);

  const renderDriverMarker = useCallback(() => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: driverLocation
    };

    return (
      <MapboxGL.ShapeSource
        id='driverMarkers-Source'
        shape={featureCollection}
        onPress={data => toAccount(data.features[0].properties.id)}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.driverMarker}
          id='driverMarker-Layer'
          sourceID='driverMarkers-Source'
          layerIndex={MapLayerIndex.driverMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [driverLocation]);

  const renderTrafficMarker = useCallback(() => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: trafficLocation
    };

    return (
      <MapboxGL.ShapeSource
        id='trafficMarkers-Source'
        shape={featureCollection}
        onPress={data => toAccount(data.features[0].properties.id)}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.trafficMarker}
          id='trafficMarker-Layer'
          sourceID='trafficMarkers-Source'
          layerIndex={MapLayerIndex.trafficMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [trafficLocation]);

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
          driverMarker: ambulanceMarker,
          destinationMarker: destinationMarker,
          obstructionMarker: obstructionMarker
        }}
      />

      {isPicking && pickedCoordinate && renderPickedCoordinate()}

      {obstructionList.length > 0 && renderObstruction()}

      {driverLocation && renderDriverMarker()}

      {trafficLocation && renderTrafficMarker()}
    </MapboxGL.MapView>
  );
}

export default Map;
