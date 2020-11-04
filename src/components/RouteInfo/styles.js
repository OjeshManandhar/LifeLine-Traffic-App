import { StyleSheet } from 'react-native';

// global
import Colors from 'global/colors';
import { RouteInfoIndex } from 'global/zIndex';

export const ContainerHeight = 175;

export default StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 5,
    right: 5,
    height: ContainerHeight,
    zIndex: RouteInfoIndex.base,

    borderRadius: 5,

    backgroundColor: Colors.normalBG,

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
  routeText: {
    fontSize: 18.5,
    lineHeight: 18.5
    // marginBottom: 5
  },
  divider: {
    width: '100%',
    height: 2,
    marginVertical: 2
  },
  descriptionHeading: {
    color: Colors.secondaryText,
    fontSize: 12
  },
  descriptionContainer: {
    padding: 2,

    marginBottom: 2,

    borderBottomWidth: 0.5,
    borderBottomColor: Colors.greyBorder,

    borderWidth: 2
  },
  unEditableDescription: {
    fontSize: 18,
    lineHeight: 20,
    color: Colors.mainText
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    marginRight: 10
  },
  sliderText: {
    fontSize: 12,

    margin: 0,
    padding: 0,

    color: Colors.secondaryText
  },
  slider: {
    maxWidth: 250
  }
});
