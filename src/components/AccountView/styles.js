import { StyleSheet } from 'react-native';

// global
import { AccountViewIndex } from 'global/zIndex';
import Colors from 'global/colors';

export default StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    width: '100%',
    height: '100%',

    zIndex: AccountViewIndex.base,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalBG
  },
  container: {
    position: 'relative',
    width: '95%',
    height: '80%',

    borderRadius: 10,
    backgroundColor: 'white',

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    position: 'absolute',

    top: 10,
    right: 10
  },
  avatar: {
    marginTop: 70,
    marginBottom: 8,

    borderWidth: 1,
    borderColor: Colors.greyBorder,

    backgroundColor: 'white',

    zIndex: 1
  },
  divider: {
    width: '100%',
    height: 1,
    margin: 6
  },
  userInfoContainer: {
    width: '95%',

    padding: 10,
    marginTop: 5,

    fontSize: 16,

    borderWidth: 0,
    borderRadius: 8
  },
  rowContainer: {
    height: 30,
    width: '100%',

    marginLeft: 15,

    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    width: '48%',

    // textAlign: 'right',
    fontSize: 14,

    marginRight: 12,
    color: Colors.primary
  },
  buttonContainer: {
    width: '70%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 'auto',
    marginBottom: 38
  },
  callButton: {
    marginTop: 'auto',
    marginLeft: 'auto',

    backgroundColor: Colors.callButtonBG
  },
  logOutButton: {
    width: 150,
    height: 38,

    borderWidth: 0.3,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 1.12,
    shadowRadius: 2.22,

    elevation: 1
  },
  logOutButtonContent: {
    fontSize: 16,

    width: '100%',
    height: '100%'
  }
});
