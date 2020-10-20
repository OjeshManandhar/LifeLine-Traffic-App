import { StyleSheet } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// global
import Colors from 'global/colors';
import { MapViewIndex } from 'global/zIndex';

export default StyleSheet.create({
  container: {
    flex: 1,
    zIndex: MapViewIndex.map
  }
});

export const layerStyles = {
  startLocationMarker: {
    iconSize: 0.04,
    iconAllowOverlap: true,
    iconImage: 'startMarker'
  },
  destinationMarker: {
    iconSize: 0.08,
    iconOffset: [0, -256],
    iconAllowOverlap: true,
    iconImage: 'destinationMarker'
  },
  pickedLocationMarker: {
    iconSize: 0.07,
    iconOffset: [0, -256],
    iconAllowOverlap: true,
    iconImage: 'pickedLocationMarker'
  },
  obstructionMarker: {
    iconSize: 0.08,
    iconOffset: [0, -256],
    iconAllowOverlap: true,
    iconImage: 'obstructionMarker'
  },
  trafficMarker: {
    iconSize: 0.08,
    iconOffset: [0, -256],
    iconAllowOverlap: true,
    iconImage: 'trafficMarker'
  },
  routeToDestination: {
    lineWidth: 6,
    lineOpacity: 1,
    lineCap: MapboxGL.LineCap.Round,
    lineJoin: MapboxGL.LineJoin.Round
  },
  routesToPickedLocation: {
    lineWidth: 5,
    lineOpacity: 1,
    lineCap: MapboxGL.LineCap.Round,
    lineJoin: MapboxGL.LineJoin.Round,
    lineColor: Colors.routesToPickedLocation
  },
  selectedRouteToPickedLocation: {
    lineWidth: 5,
    lineOpacity: 1,
    lineCap: MapboxGL.LineCap.Round,
    lineJoin: MapboxGL.LineJoin.Round,
    lineColor: Colors.selectedRouteToPickedLocation
  }
};
