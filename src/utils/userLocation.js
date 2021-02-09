// packages
import Geolocation from '@react-native-community/geolocation';

// utils
import socket from 'utils/socket';
import UserInfo from 'utils/userInfo';

// global
import { SocketText } from 'global/strings';

function emitLocation(location, operation) {
  const info = UserInfo.getInfo();

  socket.emit(SocketText.events.trafficLocation, {
    operation,
    traffic_gps: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: location
      },
      properties: {
        role: info.role,
        contact: info.contact
      }
    }
  });
}

class UserLocation {
  #sendLocation = true;
  #alreadyInit = false;
  #userLocation = null;
  #watchId = null;

  init() {
    if (this.#alreadyInit) {
      return;
    }

    console.log('UserLocation.init()');

    Geolocation.getCurrentPosition(
      sucess => {
        this.#userLocation = [sucess.coords.longitude, sucess.coords.latitude];

        emitLocation(this.#userLocation, SocketText.operations.update);
      },
      error => {
        console.log('getCurrentPosition error:', error);
      },
      {
        enableHighAccuracy: true
      }
    );

    this.#watchId = Geolocation.watchPosition(
      sucess => {
        // console.log('Geolocation.watchPosition() sucess:', sucess);
        this.#userLocation = [sucess.coords.longitude, sucess.coords.latitude];

        this.#sendLocation &&
          emitLocation(this.#userLocation, SocketText.operations.update);
      },
      error => {
        console.log('watchPosition error:', error);
      },
      {
        distanceFilter: 5, // 5 meters
        timeout: 2.5 * 60 * 1000, // 2.5 mins
        maximumAge: 5 * 60 * 1000, // 5 mins
        enableHighAccuracy: true
      }
    );
  }

  startSendLocation() {
    this.#sendLocation = true;
    emitLocation(this.#userLocation, SocketText.operations.update);
  }

  stopSendLocation() {
    this.#sendLocation = false;
    emitLocation(this.#userLocation, SocketText.operations.delete);
  }

  get currentLocation() {
    return this.#userLocation;
  }

  clearWatch() {
    console.log('watchId:', this.#watchId);
    Geolocation.clearWatch(this.#watchId);
    Geolocation.stopObserving();

    emitLocation(this.#userLocation, SocketText.operations.delete);
  }
}

export default new UserLocation();
