import { StyleSheet } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// global
import Colors from 'global/colors';
import { MapViewIndex } from 'global/zIndex';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: MapViewIndex.map
  }
});
