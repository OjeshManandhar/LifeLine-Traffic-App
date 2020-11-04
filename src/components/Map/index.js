import React, { useEffect, useCallback } from 'react';
import { PermissionsAndroid } from 'react-native';

// packages
import { point } from '@turf/helpers';
import MapboxGL from '@react-native-mapbox-gl/maps';

// assets
import startMarker from 'assets/images/map/startMarker.png';
import trafficMarker from 'assets/images/map/trafficMarker.png';
import ambulanceMarker from 'assets/images/map/ambulanceMarker.png';
import destinationMarker from 'assets/images/map/destinationMarker.png';
import obstructionMarker from 'assets/images/map/obstructionMarker.png';

// global
import Colors from 'global/colors';
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

  const renderDriverRoute = useCallback((routes, emergency) => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: routes
    };

    return (
      <MapboxGL.ShapeSource
        id={`routeToDestinationEmergency${emergency}-Source`}
        shape={featureCollection}
        onPress={data => console.log('route:', data.features[0])}
      >
        <MapboxGL.LineLayer
          id={`routeToDestinationEmergency${emergency}-Layer`}
          sourceID={`routeToDestinationEmergency${emergency}-Source`}
          style={{
            ...layerStyles.routeToDestination,
            ...{
              lineColor: Colors[`emergency_${emergency}`]
            }
          }}
          layerIndex={MapLayerIndex.routeToDestination + emergency}
        />
      </MapboxGL.ShapeSource>
    );
  }, []);

  const renderDriverDestination = useCallback(destinations => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: destinations
    };

    return (
      <MapboxGL.ShapeSource
        id='destinationMarker-Source'
        shape={featureCollection}
        onPress={data => console.log('destination:', data.features[0])}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.destinationMarker}
          id='destinationMarker-Layer'
          sourceID='destinationMarker-Source'
          layerIndex={MapLayerIndex.destinationMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, []);

  const renderDriverStartLocation = useCallback(startLocations => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: startLocations
    };

    return (
      <MapboxGL.ShapeSource
        id='startLocationMarker-Source'
        shape={featureCollection}
        onPress={data => console.log('destination:', data.features[0])}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.startLocationMarker}
          id='startLocationMarker-Layer'
          sourceID='startLocationMarker-Source'
          layerIndex={MapLayerIndex.startLocationMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, []);

  const parseDriverRoutes = useCallback(() => {
    const routes = {
      1: [],
      2: [],
      3: []
    };
    const destinations = [];
    const startLocations = [];

    driverRoutes.forEach(route => {
      const destination = { ...route.properties.destination };
      const startLocation = point(route.properties.startLocation, {
        id: route.properties.id,
        createdBy: route.properties.createdBy
      });

      destination.properties.id = route.properties.id;
      destination.properties.createdBy = route.properties.createdBy;

      destinations.push(destination);
      startLocations.push(startLocation);

      return route;
    });

    driverRoutes.forEach(route => {
      if (route.properties.emergency === 1) {
        routes[1].push(route);
      } else if (route.properties.emergency === 2) {
        routes[2].push(route);
      } else if (route.properties.emergency === 3) {
        routes[3].push(route);
      }
    });

    return (
      <React.Fragment>
        {routes[1].length > 0 && renderDriverRoute(routes[1], 1)}
        {routes[2].length > 0 && renderDriverRoute(routes[2], 2)}
        {routes[3].length > 0 && renderDriverRoute(routes[3], 3)}
        {destinations.length > 0 && renderDriverDestination(destinations)}
        {startLocations.length > 0 && renderDriverStartLocation(startLocations)}
      </React.Fragment>
    );
  }, [
    driverRoutes,
    renderDriverRoute,
    renderDriverDestination,
    renderDriverStartLocation
  ]);

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

      {driverRoutes && parseDriverRoutes()}
    </MapboxGL.MapView>
  );
}

export default Map;
