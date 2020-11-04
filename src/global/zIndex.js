export const LoginIndex = {
  base: 1,
  curve: 100,
  formContainer: 200
};

const MapScreenIndex = {
  map: 1,
  account: 101
};

export const AccountViewIndex = {
  base: MapScreenIndex.account
};

export const MapViewIndex = {
  base: MapScreenIndex.map,
  map: 100,
  bottomInfoBox: 101,
  topContainer: 201
};

export const ObstructionInfoIndex = {
  base: MapViewIndex.bottomInfoBox
};

export const RouteInfoIndex = {
  base: MapViewIndex.bottomInfoBox
};

export const MapLayerIndex = {
  // 125 => layerIndex of the users location indicator
  // so make other below 125

  routeToDestination: 105,
  startLocationMarker: 110,
  destinationMarker: 115,
  obstructionMarker: 120,
  trafficMarker: 124,
  driverMarker: 125
};
