import { StyleSheet } from 'react-native';

// global
import Colors from 'global/colors';
import { ObstructionInfoIndex } from 'global/zIndex';

export const containerHeight = 120;

export default StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 5,
    right: 5,
    height: containerHeight,
    zIndex: ObstructionInfoIndex.base,

    backgroundColor: Colors.normalBG,

    borderRadius: 5,

    padding: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  loading: {
    fontSize: 25
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3
  },
  placeName: {
    flex: 1,
    fontSize: 23,
    lineHeight: 23,
    fontWeight: '500',
    marginRight: 15
  },
  cross: {
    width: 20,
    height: 20
  },
  placeLocation: {
    fontSize: 13,
    lineHeight: 13,
    marginBottom: 5,
    color: Colors.secondaryText
  },
  divider: {
    width: '100%',
    height: 2,
    marginVertical: 2
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  description: {
    flex: 1,

    fontSize: 18,

    paddingHorizontal: 0,
    backgroundColor: 'transparent',

    marginTop: -10,
    marginBottom: 5
  },
  useButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: '100%',
    borderRadius: 50,
    paddingHorizontal: 17.5,

    marginLeft: 10,

    backgroundColor: Colors.useButtonBackground
  },
  useIcon: {
    width: 18.5,
    height: 18.5,
    marginRight: 10
  },
  useText: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.useButtonText,

    margin: 0,
    padding: 0
  }
});
