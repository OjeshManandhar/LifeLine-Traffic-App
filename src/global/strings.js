export const SocketText = {
  operations: {
    create: 'create',
    delete: 'delete',
    update: 'update'
  },
  events: {
    message: 'message',
    driverLocation: 'driver_gps',
    obstructions: 'obstruction',
    driverRoutes: 'driver_route',
    trafficLocation: 'traffic_gps'
  }
};

export const LoginText = {
  button: 'Log In',
  form: {
    phoneNumber: 'Phone Number',
    password: 'Password'
  },
  signUp: {
    title: 'Sign Up',
    detail: 'Please contact the admin to register you to the App. \nThank You!'
  },
  errorText: {
    serverErr: 'There was a problem with the server',
    noNetwork: 'Please check your internet connection'
  }
};

export const GPSPermission = {
  title: 'App GPS Permission',
  message:
    'App needs access to your location (GPS & Internet) so we can pin-point your exact location.',
  buttonNegative: 'No, thanks',
  buttonPosition: 'OK'
};

export const MapScreenText = {
  logoutAlert: {
    title: 'Log Out',
    description: 'Are you sure you want to Log out?',
    negative: 'Cancel',
    positive: 'Log out'
  }
};

export const MapViewText = {
  pickLocation: 'Tap to pick a location'
};

export const ObstructionInfoText = {
  loading: 'Loading ...',
  description: 'Obstruction information'
};

export const RouteInfoText = {
  description: "Patient's Condition",
  emergency: 'Emergency'
};

export const AccountViewText = {
  label: {
    name: 'Username',
    contact: 'Contact Number',
    role: 'Account Type'
  },
  button: 'Log Out',
  accountType: {
    driver: 'Driver Account',
    traffic: 'Traffic Account'
  }
};
