import React, { useState, useEffect } from 'react';
import {
  View,
  Linking,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import PropTypes from 'prop-types';

// packages
import Axios from 'axios';
import { Avatar, Button, Divider, IconButton } from 'react-native-paper';

// components
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';

// assets
import noImage from 'assets/images/noImage.jpg';

// utils
import UserInfo from 'utils/userInfo';

// global
import Colors from 'global/colors';
import { AccountViewText } from 'global/strings';

// styles
import styles from './styles';

// env
import {
  API_URL,
  DRIVER_INFO,
  TRAFFIC_INFO,
  DRIVER_IMAGE_ENDPOINT,
  TRAFFIC_IMAGE_ENDPOINT
} from '@env';

function AccountView(props) {
  const [error, setError] = useState(false);
  const [accInfo, setAccInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accImage, setAccImage] = useState(null);

  // Account Info
  useEffect(() => {
    async function getInfo() {
      if (props.accountInfo) {
        const driverAcc = props.accountInfo.role === 'driver';

        Axios.get(
          `${API_URL}${driverAcc ? DRIVER_INFO : TRAFFIC_INFO}/${
            props.accountInfo.contact
          }`
        )
          .then(response => {
            console.log('Account View res:', response);

            setAccInfo(response.data);

            setError(false);
            setLoading(false);
          })
          .catch(err => {
            console.log('Account View err:', err);

            setError(true);
            setLoading(false);
          });

        setAccImage(
          `${API_URL}${
            driverAcc ? DRIVER_IMAGE_ENDPOINT : TRAFFIC_IMAGE_ENDPOINT
          }/${props.accountInfo.contact}`
        );
      } else {
        const info = UserInfo.getInfo();

        setAccInfo(info);
        setAccImage(`${API_URL}${TRAFFIC_IMAGE_ENDPOINT}/${info.contact}`);

        setError(false);
        setLoading(false);
      }
    }

    setError(false);
    setLoading(true);

    getInfo();
  }, [setError, setAccInfo, setLoading, setAccImage, props.accountInfo]);

  return (
    <AnimatedView
      in={props.in}
      timeout={0.5 * 1000}
      viewStyles={styles.viewContainer}
      animationStyles={{
        // use the bottom here or the height in styles.container
        enter: {
          opacity: [0, 1],
          top: [useWindowDimensions().height, 0],
          bottom: [-useWindowDimensions().height, 0]
        },
        exit: {
          opacity: [1, 0],
          top: [0, useWindowDimensions().height],
          bottom: [0, -useWindowDimensions().height]
        }
      }}
    >
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.loading}>
          <TouchableWithoutFeedback onPress={props.mapView}>
            <Icon
              name='close'
              size={35}
              color={Colors.greyBorder}
              style={styles.backIcon}
            />
          </TouchableWithoutFeedback>

          <Text style={styles.errorText}>An error occured</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Avatar.Image
            style={styles.avatar}
            source={
              accImage
                ? {
                    uri: accImage
                  }
                : noImage
            }
            size={130}
          />

          <Divider style={styles.divider} />

          <IconButton
            icon='close'
            size={35}
            color={Colors.mainText}
            onPress={props.mapView}
            style={styles.backIcon}
          />

          <View style={styles.userInfoContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>{AccountViewText.label.name}</Text>
              <Text>{accInfo.name}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>{AccountViewText.label.contact}</Text>
              <Text>{accInfo.contact}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>{AccountViewText.label.role}</Text>
              <Text>{AccountViewText.accountType[accInfo.role]}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {props.accountInfo ? (
              <IconButton
                icon='phone'
                size={25}
                color={Colors.primary}
                onPress={() => {
                  let phoneNumber = '';

                  if (Platform.OS === 'android') {
                    phoneNumber = 'tel:${' + accInfo.contact + '}';
                  } else {
                    phoneNumber = 'telprompt:${' + accInfo.contact + '}';
                  }

                  Linking.openURL(phoneNumber);
                }}
                style={styles.callButton}
              />
            ) : (
              <Button
                icon='logout'
                mode='outlined'
                color={Colors.primary}
                style={styles.logOutButton}
                contentStyle={styles.logOutButtonContent}
                onPress={props.logout}
              >
                <Text style={styles.logOutButtonContent}>
                  {AccountViewText.button}
                </Text>
              </Button>
            )}
          </View>
        </View>
      )}
    </AnimatedView>
  );
}

AccountView.propTypes = {
  in: PropTypes.bool.isRequired
};

export default AccountView;
