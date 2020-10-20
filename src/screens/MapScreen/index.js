import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, BackHandler } from 'react-native';

// components
import MapView from 'components/MapView';
import AccountView from 'components/AccountView';

// utils
import UserToken from 'utils/userToken';

// styles
import styles from './styles';

// global
import Routes from 'global/routes';
import { EMapScreenStatus } from 'global/enum';
import { MapScreenText } from 'global/strings';

function MapScreen({ navigation }) {
  const [accountId, setAccountId] = useState(null);

  // To flag whether MapView can handle BackButton or not
  const [mapViewBackHandler, setMapViewBackHandler] = useState();

  const [mapScreenStatus, setMapScreenStatus] = useState(
    EMapScreenStatus.mapView
  );

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
              await UserToken.delete();
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

  return (
    <View style={styles.container}>
      <MapView
        setBackHandler={setMapViewBackHandler}
        toAccount={id => {
          setAccountId(id);
          setMapScreenStatus(EMapScreenStatus.accountView);
        }}
      />

      <AccountView
        in={mapScreenStatus === EMapScreenStatus.accountView}
        accountId={accountId}
        logout={() => navigation.navigate(Routes.login)}
        mapView={() => {
          setMapScreenStatus(EMapScreenStatus.mapView);
          setAccountId(null);
        }}
      />
    </View>
  );
}

export default MapScreen;
