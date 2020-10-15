import React, { useEffect } from 'react';
import { Text, View, Alert, Button } from 'react-native';

// global
import Routes from 'global/routes';

function MapScreen({ route, navigation }) {
  /**
   * Use route.params to get passed props
   * const { userId } = route.params;
   */

  // Logout alert
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      Alert.alert('Log out', 'Are you sure you want log out ?', [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {}
        },
        {
          text: 'Log out',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: async () => {
            navigation.dispatch(e.data.action);
          }
        }
      ]);
    });
  }, [navigation]);

  return (
    <View>
      <Text>MapScreen</Text>

      <Button
        title='Log Out'
        onPress={() => navigation.navigate(Routes.login)}
      />
    </View>
  );
}

export default MapScreen;
