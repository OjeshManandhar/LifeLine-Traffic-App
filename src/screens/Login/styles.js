import { StyleSheet } from 'react-native';

// global
import Colors from 'global/colors';
import { LoginIndex } from 'global/zIndex';

export default StyleSheet.create({
  container: {
    position: 'relative',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    zIndex: LoginIndex.base
  },
  topCurve: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    zIndex: LoginIndex.curve
  },
  formContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',

    zIndex: LoginIndex.formContainer
  },
  logo: {
    marginBottom: 15
  },
  textBox: {
    width: 275,
    fontSize: 18
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.errorText,
    marginTop: 10
  },
  loginButton: {
    width: 275,
    height: 45,
    borderRadius: 10,
    marginBottom: 10
  },
  loginButtonContent: {
    fontSize: 18,
    width: '100%',
    height: '100%'
  },
  signUpContainer: {
    flexDirection: 'row'
  },
  signUpLink: {
    color: Colors.link
  },
  bottomCurve: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: LoginIndex.curve
  }
});
