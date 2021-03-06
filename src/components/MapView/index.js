import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Image, Pressable, BackHandler } from 'react-native';

// packages
import Axios from 'axios';

// components
import Map from 'components/Map';
import Text from 'components/Text';
import RouteInfo from 'components/RouteInfo';
import AnimatedView from 'components/AnimatedView';
import ObstructionInfo from 'components/ObstructionInfo';
import AnimatedImageButton from 'components/AnimatedImageButton';

// assets
import back from 'assets/images/back.png';
import noImage from 'assets/images/noImage.jpg';
import addButton from 'assets/images/addButton.png';

// utils
import socket from 'utils/socket';
import UserInfo from 'utils/userInfo';

// global
import { EMapViewStatus } from 'global/enum';
import { SocketText, MapViewText } from 'global/strings';

// styles
import styles, { topContainerHeight } from './styles';

// env
import { API_URL, SMALL_IMAGE_ENDPOINT } from '@env';
import userInfo from 'utils/userInfo';

function MapView({ toAccount, setBackHandler }) {
  const descriptionRef = useRef(null);

  const [avatar, setAvatar] = useState(null);
  const [isPicking, setIsPicking] = useState(false);
  const [description, setDescription] = useState('');
  const [driverRoutes, setDriverRoutes] = useState([]);
  const [driverLocation, setDriverLocation] = useState([]);
  const [obstructionList, setObstructionList] = useState([]);
  const [trafficLocation, _setTrafficLocation] = useState([]);
  const [pickedCoordinate, setPickedCoordintate] = useState(null);
  const [selectedDriverRoute, setSelectedDriverRoute] = useState(null);
  const [selectedObstruction, setSelectedObstruction] = useState(null);

  const [mapViewStatus, setMapViewStatus] = useState(EMapViewStatus.clear);

  const setTrafficLocation = useCallback(
    data => {
      if (!data || data.length === 0) {
        return _setTrafficLocation([]);
      }

      _setTrafficLocation(
        data.filter(item => item.properties.contact !== UserInfo.getContact())
      );
    },
    [_setTrafficLocation]
  );

  // Socket
  useEffect(() => {
    // initial data [some times it doesnot work don't know why]
    socket.on(SocketText.events.message, data => {
      console.log('socketData:', data);

      setDriverLocation(data['driver_gps']);
      setDriverRoutes(data['driver_routes']);
      setTrafficLocation(data['traffic_gps']);
      setObstructionList(data['obstructions']);
    });

    // Request initial data
    // socket.send(null, data => {
    //   console.log('socketData:', data);

    //   setDriverLocation(data['driver_gps']);
    //   setDriverRoutes(data['driver_routes']);
    //   setTrafficLocation(data['traffic_gps']);
    //   setObstructionList(data['obstructions']);
    // });

    socket.on(SocketText.events.driverRoutes, data => setDriverRoutes(data));
    socket.on(SocketText.events.obstructions, data => setObstructionList(data));
    socket.on(SocketText.events.driverLocation, data =>
      setDriverLocation(data)
    );
    socket.on(SocketText.events.trafficLocation, data =>
      setTrafficLocation(data)
    );
  }, [
    setDriverRoutes,
    setDriverLocation,
    setObstructionList,
    setTrafficLocation
  ]);

  // avatar
  useEffect(() => {
    async function getImage() {
      Axios.get(`${API_URL}${SMALL_IMAGE_ENDPOINT}/${UserInfo.getContact()}`)
        .then(res => setAvatar(res.data))
        .catch(err => console.log('Fetch image error:', err));
    }

    getImage();
  }, [setAvatar]);

  function clearPickedCoordinate() {
    setDescription('');
    setIsPicking(false);
    setPickedCoordintate(null);
  }

  const updateObstructionInfo = useCallback(() => {
    const newObstruction = { ...selectedObstruction };
    newObstruction.properties.description = description;

    console.log('Updated Obstruction:', newObstruction);
    /* PATCH to server */
    socket.emit(SocketText.events.obstructions, {
      obstruction: newObstruction,
      operation: SocketText.operations.update
    });
  }, [description, selectedObstruction]);

  // Back handler
  const handleBackButton = useCallback(() => {
    switch (mapViewStatus) {
      case EMapViewStatus.clear:
        BackHandler.exitApp();
        break;
      case EMapViewStatus.addingObstruction:
        setMapViewStatus(EMapViewStatus.clear);
        clearPickedCoordinate();
        break;
      case EMapViewStatus.obstructionInfo:
        const des = descriptionRef.current;
        if (des && des.isFocused()) {
          des.blur();
          updateObstructionInfo();
        }

        setMapViewStatus(EMapViewStatus.clear);
        setSelectedObstruction(null);
        setDescription('');
        break;
      case EMapViewStatus.routeInfo:
        setSelectedDriverRoute(null);
        setMapViewStatus(EMapViewStatus.clear);
        break;
    }
  }, [
    mapViewStatus,
    setDescription,
    setMapViewStatus,
    updateObstructionInfo,
    setSelectedDriverRoute,
    setSelectedObstruction
  ]);

  useEffect(() => setBackHandler(() => handleBackButton), [
    setBackHandler,
    handleBackButton
  ]);

  return (
    <View style={styles.container}>
      <Map
        isPicking={isPicking}
        driverRoutes={driverRoutes}
        driverLocation={driverLocation}
        obstructionList={obstructionList}
        trafficLocation={trafficLocation}
        pickedCoordinate={pickedCoordinate}
        setPickedCoordintate={setPickedCoordintate}
        setSelectedObstruction={setSelectedObstruction}
        toggleObstructionInfo={(obstruction, update) => {
          if (update) {
            setDescription(obstruction.properties.description);
          } else if (mapViewStatus === EMapViewStatus.clear) {
            setDescription(obstruction.properties.description);
            setMapViewStatus(EMapViewStatus.obstructionInfo);
          } else if (mapViewStatus === EMapViewStatus.obstructionInfo) {
            setMapViewStatus(EMapViewStatus.clear);
            setDescription('');
            setSelectedObstruction(null);
          }
        }}
        toggleRouteInfo={(id, contact) => {
          if (mapViewStatus === EMapViewStatus.routeInfo) {
            if (
              selectedDriverRoute &&
              id === selectedDriverRoute.properties.id &&
              contact === selectedDriverRoute.properties.contact
            ) {
              setSelectedDriverRoute(null);
              setMapViewStatus(EMapViewStatus.clear);
            } else {
              setSelectedDriverRoute(
                driverRoutes.find(
                  route =>
                    route.properties.id === id &&
                    route.properties.contact === contact
                )
              );
            }
          } else if (mapViewStatus === EMapViewStatus.clear) {
            setSelectedDriverRoute(
              driverRoutes.find(
                route =>
                  route.properties.id === id &&
                  route.properties.contact === contact
              )
            );
            setMapViewStatus(EMapViewStatus.routeInfo);
          }
        }}
        toAccount={info => {
          if (mapViewStatus === EMapViewStatus.clear) {
            toAccount(info);
          }
        }}
      />

      {/* Account Button */}
      <AnimatedImageButton
        in={mapViewStatus !== EMapViewStatus.addingObstruction}
        image={
          avatar
            ? {
                uri: avatar
              }
            : noImage
        }
        timeout={0.25 * 1000}
        useViewContainer={true}
        imageStyles={styles.avatar}
        viewProps={{ pointerEvents: 'auto' }}
        viewStyles={styles.avatarContainer}
        animationStyles={{
          enter: {
            opacity: [0, 1]
          },
          exit: {
            opacity: [1, 0]
          }
        }}
        onPress={() => toAccount(null)}
      />

      {/* Top Container */}
      <AnimatedView
        in={mapViewStatus === EMapViewStatus.addingObstruction}
        timeout={0.25 * 1000}
        viewStyles={styles.topAnimatedContainer}
        animationStyles={{
          enter: {
            opacity: [0, 1],
            top: [-topContainerHeight, 5]
          },
          exit: {
            opacity: [1, 0],
            top: [5, -topContainerHeight]
          }
        }}
      >
        <Pressable
          style={styles.backIconContainer}
          onPress={() => {
            setMapViewStatus(EMapViewStatus.clear);
            clearPickedCoordinate();
          }}
        >
          <Image source={back} style={styles.backIcon} />
        </Pressable>

        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>{MapViewText.pickLocation}</Text>
        </View>
      </AnimatedView>

      {/* Add Button */}
      <AnimatedImageButton
        in={mapViewStatus === EMapViewStatus.clear}
        image={addButton}
        timeout={0.25 * 1000}
        useViewContainer={true}
        imageStyles={styles.addIconImage}
        viewProps={{ pointerEvents: 'auto' }}
        viewStyles={styles.addIconContainer}
        animationStyles={{
          enter: {
            opacity: [0, 1]
          },
          exit: {
            opacity: [1, 0]
          }
        }}
        onPress={() => {
          setIsPicking(true);
          setMapViewStatus(EMapViewStatus.addingObstruction);
        }}
      />

      {/* ObstructionInfo */}
      <ObstructionInfo
        show={
          mapViewStatus === EMapViewStatus.addingObstruction ||
          mapViewStatus === EMapViewStatus.obstructionInfo
        }
        description={[description, setDescription]}
        descriptionRef={descriptionRef}
        pickedCoordinate={pickedCoordinate}
        selectedObstruction={selectedObstruction}
        newObstruction={mapViewStatus === EMapViewStatus.addingObstruction}
        updateObstructionInfo={
          mapViewStatus === EMapViewStatus.obstructionInfo
            ? updateObstructionInfo
            : null
        }
        onClose={() => {
          setMapViewStatus(EMapViewStatus.clear);

          if (mapViewStatus === EMapViewStatus.addingObstruction) {
            clearPickedCoordinate();
          } else if (mapViewStatus === EMapViewStatus.obstructionInfo) {
            setDescription('');
            setSelectedObstruction(null);
          }
        }}
        onUse={data => {
          if (mapViewStatus === EMapViewStatus.addingObstruction) {
            const obstruction = { ...data };
            obstruction.properties = {
              ...obstruction.properties,
              contact: UserInfo.getContact(),
              description: description,
              id: obstructionList.length
            };

            console.log('Created obstruction:', obstruction);
            /* POST obstruction to server */
            socket.emit(SocketText.events.obstructions, {
              obstruction: obstruction,
              operation: SocketText.operations.create
            });

            clearPickedCoordinate();
            setMapViewStatus(EMapViewStatus.clear);
          } else if (mapViewStatus === EMapViewStatus.obstructionInfo) {
            console.log('Delete obstruction data:', selectedObstruction);
            /* DELTE obstruction to server */
            socket.emit(SocketText.events.obstructions, {
              obstruction: selectedObstruction,
              operation: SocketText.operations.delete
            });

            setMapViewStatus(EMapViewStatus.clear);
            setDescription('');
            setSelectedObstruction(null);
          }
        }}
      />

      {/* Route Info */}
      <RouteInfo
        show={mapViewStatus === EMapViewStatus.routeInfo}
        route={selectedDriverRoute}
        onClose={() => {
          setSelectedDriverRoute(null);
          setMapViewStatus(EMapViewStatus.clear);
        }}
      />
    </View>
  );
}

export default MapView;
