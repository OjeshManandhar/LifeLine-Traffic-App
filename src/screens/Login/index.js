import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Alert,
  Animated,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

// packages
import SplashScreen from 'react-native-splash-screen';
import { Button, TextInput } from 'react-native-paper';

// components
import Text from 'components/Text';

// dummy_api
import login from 'api/login';

// utils
import UserInfo from 'utils/userInfo';

// assets
import logo from 'assets/images/logo.png';
import topCurve from 'assets/images/login/top_curve.png';
import bottomCurve from 'assets/images/login/bottom_curve.png';

// global
import Routes from 'global/routes';
import Colors from 'global/colors';
import { LoginText } from 'global/strings';

// styles
import styles from './styles';

function Login({ navigation }) {
  const LOGO_SIZE = 120;
  const TRANSLATATION_VALUE = 120;
  const ANIMATION_DURATION = 0.5 * 1000;

  const [password, setPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [errorText, setErrorText] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const flexValue = useRef(new Animated.Value(0)).current;
  const curveOpacityValue = useRef(new Animated.Value(1)).current;
  const topTranslateYValue = useRef(new Animated.Value(0)).current;
  const bottomTranslateYValue = useRef(new Animated.Value(0)).current;
  const logoSizeValue = useRef(new Animated.Value(LOGO_SIZE)).current;

  const clearFields = useCallback(() => {
    setPassword(null);
    setPhoneNumber(null);
    setShowPassword(false);
  }, [setPassword, setPhoneNumber, setShowPassword]);

  const handleLogin = useCallback(async () => {
    setIsLoggingIn(true);

    login(phoneNumber, password)
      .then(async function (response) {
        const info = response.data;
        await UserInfo.set(info);

        clearFields();
        setErrorText(null);
        setIsLoggingIn(false);

        navigation.navigate(Routes.map);
      })
      .catch(function (error) {
        console.log('Login err:', error, error.message);
        console.dir(error);

        // clearFields();
        setIsLoggingIn(false);

        if (error.message && !error.response) {
          setErrorText(error.message);
        } else if (error.response.status && error.response.status === 500) {
          setErrorText(LoginText.errorText.serverErr);
        } else if (error.response) {
          setErrorText(error.response.data);
        } else {
          setErrorText(LoginText.errorText.noNetwork);
        }
      });
  }, [password, phoneNumber, clearFields, setErrorText, setIsLoggingIn]);

  function showKeyboardAnim() {
    Animated.timing(flexValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false
    }).start();

    Animated.timing(logoSizeValue, {
      toValue: 0.75 * LOGO_SIZE,
      duration: ANIMATION_DURATION,
      useNativeDriver: false
    }).start();

    Animated.timing(curveOpacityValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(topTranslateYValue, {
      toValue: -TRANSLATATION_VALUE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(bottomTranslateYValue, {
      toValue: TRANSLATATION_VALUE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();
  }

  function hideKeyboardAnim() {
    Animated.timing(flexValue, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false
    }).start();

    Animated.timing(logoSizeValue, {
      toValue: LOGO_SIZE,
      duration: ANIMATION_DURATION,
      useNativeDriver: false
    }).start();

    Animated.timing(curveOpacityValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(topTranslateYValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(bottomTranslateYValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();
  }

  // Keyboard Animations
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', showKeyboardAnim);
    Keyboard.addListener('keyboardDidHide', hideKeyboardAnim);

    return () => {
      Keyboard.removeListener('keyboardDidShow', showKeyboardAnim);
      Keyboard.removeListener('keyboardDidHide', hideKeyboardAnim);
    };
  }, []);

  useEffect(() => {
    if (UserInfo.getToken()) {
      navigation.navigate(Routes.map);
    } else {
      SplashScreen.hide();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={topCurve}
        style={[
          styles.topCurve,
          {
            opacity: curveOpacityValue,
            transform: [
              {
                translateY: topTranslateYValue
              }
            ]
          }
        ]}
      />

      <Animated.View
        style={[
          styles.formContainer,
          {
            flex: flexValue
          }
        ]}
      >
        <Animated.Image
          source={logo}
          style={[
            styles.logo,
            {
              width: logoSizeValue,
              height: logoSizeValue
            }
          ]}
        />

        <TextInput
          dense={true}
          mode='outlined'
          label={LoginText.form.phoneNumber}
          style={styles.textBox}
          multiline={false}
          numberOfLines={1}
          keyboardType='phone-pad'
          placeholder={LoginText.form.phoneNumber}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          dense={true}
          mode='outlined'
          label={LoginText.form.password}
          style={styles.textBox}
          multiline={false}
          numberOfLines={1}
          autoCapitalize='none'
          placeholder={LoginText.form.password}
          secureTextEntry={!showPassword}
          keyboardType={showPassword ? 'visible-password' : 'default'}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              name={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

        <Button
          icon='login'
          mode='contained'
          color={Colors.primary}
          loading={isLoggingIn}
          disabled={
            phoneNumber &&
            phoneNumber.length === 10 &&
            password &&
            password.length >= 8
              ? false
              : true
          }
          style={[styles.loginButton, { marginTop: errorText ? 10 : 20 }]}
          contentStyle={styles.loginButtonContent}
          onPress={() => !isLoggingIn && handleLogin()}
        >
          <Text style={styles.loginButtonContent}>{LoginText.button}</Text>
        </Button>

        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              Alert.alert(LoginText.signUp.title, LoginText.signUp.detail)
            }
          >
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>

      <Animated.Image
        source={bottomCurve}
        style={[
          styles.bottomCurve,
          {
            opacity: curveOpacityValue,
            transform: [
              {
                translateY: bottomTranslateYValue
              }
            ]
          }
        ]}
      />
    </View>
  );
}

export default Login;
