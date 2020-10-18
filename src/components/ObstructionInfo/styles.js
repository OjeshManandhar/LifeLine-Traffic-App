import { StyleSheet } from 'react-native';

// global
import { ObstructionInfoIndex } from 'global/zIndex';

export const containerHeight = 85;

export default StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 5,
    right: 5,
    height: containerHeight,
    zIndex: ObstructionInfoIndex.base,

    backgroundColor: '#ffffff',
    borderRadius: 5,

    padding: 10
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  loading: {
    alignSelf: 'center',

    fontSize: 20
  },
  placeInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginRight: 7.5
  },
  placeName: {
    fontSize: 23,
    lineHeight: 23,
    fontWeight: '500'
  },
  placeLocation: {
    fontSize: 13,
    lineHeight: 13,
    color: '#757575'
  },
  pickButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: '100%',
    borderRadius: 50,
    paddingHorizontal: 17.5,

    backgroundColor: '#1a73e8'
  },
  pickIcon: {
    width: 18.5,
    height: 18.5,
    marginRight: 10
  },
  pickText: {
    color: 'white',
    fontSize: 16
  }
});
