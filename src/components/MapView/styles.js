import { StyleSheet } from 'react-native';

// global
import Colors from 'global/colors';
import { MapViewIndex } from 'global/zIndex';

export const topContainerHeight = 50;

export default StyleSheet.create({
  container: {
    position: 'relative',

    flex: 1,
    flexDirection: 'column',

    zIndex: MapViewIndex.base
  },
  avatarContainer: {
    position: 'absolute',
    top: 5,
    right: 10,

    zIndex: MapViewIndex.topContainer,

    width: 50,
    height: 50,

    margin: 0,
    padding: 0,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',

    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.primary,

    backgroundColor: Colors.normalBG
  },
  avatar: {
    width: 48,
    height: 48,

    borderRadius: 50
  },
  topAnimatedContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: topContainerHeight,
    zIndex: MapViewIndex.topContainer,

    overflow: 'hidden',

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    paddingVertical: 5,
    paddingHorizontal: 20,

    borderRadius: 4,
    borderWidth: 0.25,
    borderColor: Colors.searchBorder,
    backgroundColor: Colors.normalBG,

    /**
     * For shadow in Android
     * Will be on top even though z-index of this component is lower
     * It will not handle touch i.e. the touch input will be passed to the
     * component below it like in z-index
     */
    elevation: 3
  },
  backIconContainer: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    marginRight: 20
  },
  backIcon: {
    width: '100%',
    height: '100%'
  },
  topTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  topText: {
    fontSize: 18
  },
  addIconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: MapViewIndex.bottomInfoBox,

    width: 55,
    height: 55
  },
  addIconImage: {
    width: '100%',
    height: '100%'
  }
});
