// packages
import Geolocation from '@react-native-community/geolocation';

// utils
import socket from 'utils/socket';

// global
import { SocketText } from 'global/strings';

class UserLocation {
  #userLocation = null;
  #watchId = null;

  init() {
    console.log('UserLocation.init()');

    Geolocation.getCurrentPosition(
      sucess => {
        this.#userLocation = [sucess.coords.longitude, sucess.coords.latitude];

        socket.emit(SocketText.events.trafficLocation, {
          gps: {
            userId: 'DeadSkull',
            location: this.#userLocation
          },
          operation: SocketText.operations.create
        });
      },
      error => {
        console.log('getCurrentPosition error:', error);
      },
      {
        timeout: 10 * 1000, // 10 secs
        maximumAge: 20 * 1000, // 20 secs
        enableHighAccuracy: true
      }
    );

    this.#watchId = Geolocation.watchPosition(
      sucess => {
        console.log('Geolocation.watchPosition() sucess:', sucess);
        this.#userLocation = [sucess.coords.longitude, sucess.coords.latitude];

        socket.emit(SocketText.events.trafficLocation, {
          gps: {
            userId: 'DeadSkull',
            location: this.#userLocation
          },
          operation: SocketText.operations.update
        });
      },
      error => {
        console.log('watchPosition error:', error);
      },
      {
        distanceFilter: 10, // 10 meters
        timeout: 10 * 60 * 1000, // 10 mins
        maximumAge: 20 * 60 * 1000, // 20 mins
        enableHighAccuracy: true
      }
    );
  }

  get currentLocation() {
    return this.#userLocation;
  }

  clearWatch() {
    console.log('watchId:', this.#watchId);
    Geolocation.clearWatch(this.#watchId);
    Geolocation.stopObserving();

    socket.emit(SocketText.events.trafficLocation, {
      gps: {
        userId: 'DeadSkull',
        location: this.#userLocation
      },
      operation: SocketText.operations.delete
    });
  }
}

export default new UserLocation();
