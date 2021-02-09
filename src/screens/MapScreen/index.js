import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, AppState, BackHandler } from 'react-native';

// components
import MapView from 'components/MapView';
import AccountView from 'components/AccountView';

// utils
import UserInfo from 'utils/userInfo';
import UserLocation from 'utils/userLocation';

// styles
import styles from './styles';

// global
import Routes from 'global/routes';
import { EMapScreenStatus } from 'global/enum';
import { MapScreenText } from 'global/strings';

function MapScreen({ navigation }) {
  const [accountInfo, setAccountInfo] = useState(null);

  // To flag whether MapView can handle BackButton or not
  const [mapViewBackHandler, setMapViewBackHandler] = useState();

  const [mapScreenStatus, setMapScreenStatus] = useState(
    EMapScreenStatus.mapView
  );

  const handleAppStateChange = useCallback(appState => {
    if (appState === 'active') {
      UserLocation.startSendLocation();
    } else {
      UserLocation.stopSendLocation();
    }
  }, []);

  // init and clear Userlocation
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  // Logout alert
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      Alert.alert(
        MapScreenText.logoutAlert.title,
        MapScreenText.logoutAlert.description,
        [
          {
            text: MapScreenText.logoutAlert.negative,
            style: 'cancel',
            onPress: () => {}
          },
          {
            text: MapScreenText.logoutAlert.positive,
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: async () => {
              await UserInfo.delete();
              navigation.dispatch(e.data.action);
            }
          }
        ]
      );
    });
  }, [navigation]);

  const handleBackButton = useCallback(() => {
    switch (mapScreenStatus) {
      case EMapScreenStatus.mapView:
        mapViewBackHandler();
        break;
      case EMapScreenStatus.accountView:
        setMapScreenStatus(EMapScreenStatus.mapView);
        break;
    }
    return true;
  }, [mapScreenStatus, setMapScreenStatus, mapViewBackHandler]);

  // Handling the Hardware Back button
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  UserLocation.init();

  return (
    <View style={styles.container}>
      <MapView
        setBackHandler={setMapViewBackHandler}
        toAccount={info => {
          setAccountInfo(info);
          setMapScreenStatus(EMapScreenStatus.accountView);
        }}
      />

      <AccountView
        in={mapScreenStatus === EMapScreenStatus.accountView}
        accountInfo={accountInfo}
        logout={() => navigation.navigate(Routes.login)}
        mapView={() => {
          setMapScreenStatus(EMapScreenStatus.mapView);
          setAccountInfo(null);
        }}
      />
    </View>
  );
}

export default MapScreen;
