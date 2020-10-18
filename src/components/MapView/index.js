import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, Pressable, BackHandler } from 'react-native';

// components
import Map from 'components/Map';
import Text from 'components/Text';
import AnimatedView from 'components/AnimatedView';
import ObstructionInfo from 'components/ObstructionInfo';
import AnimatedImageButton from 'components/AnimatedImageButton';

// assets
import back from 'assets/images/back.png';
import account from 'assets/images/dead.png';
import addButton from 'assets/images/addButton.png';

// global
import { EMapViewStatus } from 'global/enum';

// styles
import styles, { topContainerHeight } from './styles';

function MapView({ toAccount, setBackHandler }) {
  const [isPicking, setIsPicking] = useState(false);
  const [description, setDescription] = useState('');
  const [pickedCoordinate, setPickedCoordintate] = useState(null);
  const [selectedObstruction, setSelectedObstruction] = useState(null);
  const [createdObstructionList, setCreatedObstructionList] = useState([]);

  const [mapViewStatus, setMapViewStatus] = useState(EMapViewStatus.clear);

  function clearPickedCoordinate() {
    setIsPicking(false);
    setPickedCoordintate(null);
  }

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
        setMapViewStatus(EMapViewStatus.clear);
        break;
      case EMapViewStatus.routeInfo:
        setMapViewStatus(EMapViewStatus.clear);
        break;
    }
  }, [mapViewStatus, setMapViewStatus]);

  useEffect(() => setBackHandler(() => handleBackButton), [
    setBackHandler,
    handleBackButton
  ]);

  return (
    <View style={styles.container}>
      <Map
        isPicking={isPicking}
        pickedCoordinate={pickedCoordinate}
        setPickedCoordintate={setPickedCoordintate}
      />

      {/* Account Button */}
      <AnimatedImageButton
        in={mapViewStatus === EMapViewStatus.clear}
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
          <Text style={styles.topText}>Tap to pick a location</Text>
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
        pickedCoordinate={pickedCoordinate}
        selectedObstruction={selectedObstruction}
        newObstruction={mapViewStatus === EMapViewStatus.addingObstruction}
        onUse={data => {
          if (mapViewStatus === EMapViewStatus.addingObstruction) {
            setCreatedObstructionList(currentList => {
              const newList = currentList;
              newList.push({ ...data, id: currentList.length });

              return newList;
            });

            setIsPicking(false);
            setPickedCoordintate(null);
            setMapViewStatus(EMapViewStatus.clear);
          } else if (mapViewStatus === EMapViewStatus.obstructionInfo) {
            // delete obstruction
            console.log('Delete obstruction data:', selectedObstruction);
          }
        }}
      />
    </View>
  );
}

export default MapView;
