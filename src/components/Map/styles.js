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
