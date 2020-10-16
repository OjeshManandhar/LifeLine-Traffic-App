import { StyleSheet } from 'react-native';

// global
import Colors from 'global/colors';
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
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
  descriptionContainer: {
    flex: 1
  },
  description: {
    fontSize: 18,
    lineHeight: 20,
    color: Colors.mainText

    // borderWidth: 2,
    // borderColor: 'red'
  }
});
