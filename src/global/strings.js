export const SocketText = {
  operations: {
    create: 'create',
    delete: 'delete',
    update: 'update'
  },
  events: {
    driverLocation: 'driver_gps',
    obstructions: 'obstructions',
    driverRoutes: 'driver_routes',
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
    noAccount: 'Phone number is not registered yet',
    noNetwork: 'Please check your internet connection',
    phonePassError: 'Phone number and Password does not match'
  }
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
  button: 'Log Out',
  accountType: {
    driver: 'Driver Account',
    traffic: 'Traffic Account'
  }
};
