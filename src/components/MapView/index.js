import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Image, Pressable, BackHandler } from 'react-native';

// components
import Map from 'components/Map';
import Text from 'components/Text';
import RouteInfo from 'components/RouteInfo';
import AnimatedView from 'components/AnimatedView';
import ObstructionInfo from 'components/ObstructionInfo';
import AnimatedImageButton from 'components/AnimatedImageButton';

// assets
import back from 'assets/images/back.png';
import account from 'assets/images/dead.png';
import addButton from 'assets/images/addButton.png';

// global
import { MapViewText } from 'global/strings';
import { EMapViewStatus } from 'global/enum';

// styles
import styles, { topContainerHeight } from './styles';

import {
  dummyRoute,
  dummyObstruction,
  dummyDriverLocations,
  dummyTrafficLocations
} from 'global/dummyData';

function MapView({ toAccount, setBackHandler }) {
  const descriptionRef = useRef(null);

  const [isPicking, setIsPicking] = useState(false);
  const [description, setDescription] = useState('');
  const [driverRoutes, setDriverRoutes] = useState(dummyRoute);
  const [driverLocation, setDriverLocation] = useState(dummyDriverLocations);
  const [obstructionList, setObstructionList] = useState(dummyObstruction);
  const [trafficLocation, setTrafficLocation] = useState(dummyTrafficLocations);
  const [pickedCoordinate, setPickedCoordintate] = useState(null);
  const [selectedDriverRoute, setSelectedDriverRoute] = useState(null);
  const [selectedObstruction, setSelectedObstruction] = useState(null);

  const [mapViewStatus, setMapViewStatus] = useState(EMapViewStatus.clear);

  function clearPickedCoordinate() {
    setDescription('');
    setIsPicking(false);
    setPickedCoordintate(null);
  }

  const updateObstructionInfo = useCallback(() => {
    const index = obstructionList.findIndex(
      obs =>
        obs.geometry.coordinates[0] ===
          selectedObstruction.geometry.coordinates[0] &&
        obs.geometry.coordinates[1] ===
          selectedObstruction.geometry.coordinates[1]
    );

    const newList = obstructionList;
    newList[index].properties.description = description;

    console.log('Updated Obstruction:', newList[index]);

    /* PATCH to server */

    setObstructionList(newList);
  }, [description, obstructionList, setObstructionList, selectedObstruction]);

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
        toggleRouteInfo={(id, createdBy) => {
          if (mapViewStatus === EMapViewStatus.routeInfo) {
            if (
              selectedDriverRoute &&
              id === selectedDriverRoute.properties.id &&
              createdBy === selectedDriverRoute.properties.createdBy
            ) {
              setSelectedDriverRoute(null);
              setMapViewStatus(EMapViewStatus.clear);
            } else {
              setSelectedDriverRoute(
                driverRoutes.find(
                  route =>
                    route.properties.id === id &&
                    route.properties.createdBy === createdBy
                )
              );
            }
          } else if (mapViewStatus === EMapViewStatus.clear) {
            setSelectedDriverRoute(
              driverRoutes.find(
                route =>
                  route.properties.id === id &&
                  route.properties.createdBy === createdBy
              )
            );
            setMapViewStatus(EMapViewStatus.routeInfo);
          }
        }}
        toAccount={id => {
          if (mapViewStatus === EMapViewStatus.clear) {
            console.log('ID:', id);

            toAccount(id);
          }
        }}
      />

      {/* Account Button */}
      <AnimatedImageButton
        in={mapViewStatus !== EMapViewStatus.addingObstruction}
        image={account}
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
        onPress={() => toAccount(123)}
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
              description: description
            };

            console.log('Created obstruction:', obstruction);
            /* POST obstruction to server */

            // Remove this after server connection
            setObstructionList(curList => {
              const newList = [...curList];

              newList.push(obstruction);

              return newList;
            });

            clearPickedCoordinate();
            setMapViewStatus(EMapViewStatus.clear);
          } else if (mapViewStatus === EMapViewStatus.obstructionInfo) {
            // delete obstruction
            console.log('Delete obstruction data:', selectedObstruction);

            /* DELTE obstruction to server */

            // Remove this after server connection
            setObstructionList(curList =>
              curList.filter(obs => {
                console.log(
                  obs.geometry.coordinates,
                  selectedObstruction.geometry.coordinates
                );

                const result =
                  obs.geometry.coordinates[0] ===
                    selectedObstruction.geometry.coordinates[0] &&
                  obs.geometry.coordinates[1] ===
                    selectedObstruction.geometry.coordinates[1];

                console.log('result:', result);

                return !result;
              })
            );

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
