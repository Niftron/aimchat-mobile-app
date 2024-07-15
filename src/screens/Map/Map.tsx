import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Alert,
  LayoutAnimation,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import CompassHeading from 'react-native-compass-heading';
import { GeoService } from 'app/services/GeoService';
import {
  requestMultiple,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';
import UserList from './components/UsersList/UsersList';
import MapMenu from './components/MapMenu/MapMenu';
import { MapPinIcon, MyLocationIcon } from 'app/assets/SVG';
import { UIColors } from 'app/constants';
import { styles } from './Map.styles';
import { metersToLatitudes } from 'app/utils';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { useAppDispatch, useTypedSelector } from 'app/store';
import {
  getUsersAround,
  sendMyGeoPosition,
} from 'app/store/slices/GeolocationSlice/GeolocationSlice';
import { ImageFrame } from 'elements/ImageFrame';
import { useAppNavigation } from 'app/navigation';
import { useFocusEffect } from '@react-navigation/native';
import { setRadius, setCoords } from 'app/store/slices/GeolocationSlice';
import { changeVisibility } from 'app/store/slices/GeolocationSlice/GeolocationSlice';
import type { PermissionStatus } from 'react-native-permissions';
import moment from 'moment';
import { i18n } from 'app/i18n';
import { InfoModal } from 'components/InfoModal';
const degree_update_rate = 3;
let loadingDotsTimer: NodeJS.Timer | null = null;

const MapScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [locationStatusModalVisible, setLocationStatusModalVisible] =
    useState(false);

  const [locationStatusModalMessage, setLocationStatusModalMessage] = useState(
    i18n.mapScreen.locationStatusModal.accessDenied,
  );
  // const [followLocation, setFollowLocation] = useState(true);
  const [genders, setGenders] = useState<string[]>([]);
  const [isLocationPermissionGranted, setIsLsLocationPermissionGranted] =
    useState(false);
  const { geopositionTool, hiddenAsked } = useTypedSelector(
    state => state.geolocation,
  );
  // const [location, setLocation] = useState<GeolocationResponse>({
  //   coords: {
  //     latitude: 0,
  //     longitude: 0,
  //     altitude: 0,
  //     accuracy: 1,
  //     altitudeAccuracy: 0.1,
  //     heading: 0,
  //     speed: 0,
  //   },
  //   timestamp: Date.now(),
  // } as GeolocationResponse);

  const navigation = useAppNavigation();
  const mapRef = useRef<MapView>(null);

  const { usersAround, radius, coords } = useTypedSelector(
    state => state.geolocation,
  );
  const filteredUsers = useMemo(() => {
    const users = [];

    for (let el of usersAround) {
      if (
        genders.length &&
        (!el.profile?.gender || genders.includes(el.profile?.gender))
      ) {
        users.push(el);
      } else if (!genders.length) {
        users.push(el);
      }
    }
    return users;
  }, [genders, usersAround]);

  const profiles = filteredUsers.map(el => el?.profile);

  const dispatch = useAppDispatch();

  const setLocationPosition = useCallback(() => {
    Geolocation.getCurrentPosition(
      currentLocation => {
        // setLocation(currentLocation);
        setIsLsLocationPermissionGranted(true);
        setTimeout(() => {
          dispatch(
            setCoords({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }),
          );
          mapRef.current?.animateToRegion({
            latitudeDelta: metersToLatitudes(radius),
            longitudeDelta: metersToLatitudes(radius),
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
          dispatch(
            sendMyGeoPosition({
              lat: currentLocation.coords.latitude,
              lng: currentLocation.coords.longitude,
            }),
          );
        }, 300);
        setTimeout(() => {
          dispatch(getUsersAround());
        }, 1000);
      },
      err => {
        //Geolocation.getCurrentPosition enableHighAccuracy: true, error  {"ACTIVITY_NULL": 4, "PERMISSION_DENIED": 1, "POSITION_UNAVAILABLE": 2, "TIMEOUT": 3, "code": 3, "message": "Location request timed out"}
        console.warn('getCurrentPosition on MAP error', err);
        if (err.code === 1) {
          setLocationStatusModalMessage(
            i18n.mapScreen.locationStatusModal.accessDenied,
          );
          setLocationStatusModalVisible(true);
          setIsLsLocationPermissionGranted(false);
        } else if (err.code === 2) {
          setLocationStatusModalMessage(
            i18n.mapScreen.locationStatusModal.locationUnavailable,
          );
          setLocationStatusModalVisible(true);
          setIsLsLocationPermissionGranted(false);
        }
      },
      {
        enableHighAccuracy: geopositionTool === 'gps',
      },
    );
  }, [geopositionTool, dispatch, radius]);

  const setCameraToUserPosition = useCallback(() => {
    // setFollowLocation(true);
    setLocationPosition();
  }, [setLocationPosition]);

  const onRadiusChange = (r: number) => {
    dispatch(setRadius(r));
  };

  const onFiltersChange = (res: { genders: string[]; radius: number }) => {
    setGenders(res.genders);
    dispatch(getUsersAround());

    if (coords) {
      mapRef.current?.animateToRegion({
        latitudeDelta: metersToLatitudes(res.radius),
        longitudeDelta: metersToLatitudes(res.radius),
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  };

  const openLocationSettings = useCallback(() => {
    openSettings();
  }, []);
  const closeLocationStatusModal = useCallback(() => {
    setLocationStatusModalVisible(false);
  }, []);

  // const onMapDrug = () => {
  //   if (followLocation) {
  //     setFollowLocation(false);
  //   }
  // };

  const requestCameraPermission = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        if (Platform.OS === 'ios') {
          const statuses = await requestMultiple([
            PERMISSIONS.IOS.LOCATION_ALWAYS,
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          ]);
          for (let key in statuses) {
            const statusKey: PermissionStatus = statuses[key];
            if (statusKey === 'granted') {
              setIsLsLocationPermissionGranted(true);
              return resolve(true);
            }
          }
          reject();
        } else {
          const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (permission === 'granted') {
            setIsLsLocationPermissionGranted(true);
            resolve(true);
          } else {
            reject();
          }
        }
      });
    } catch (err) {
      console.error('requestCameraPermission error:' + err);
    }
  };

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS === 'android') {
        const timer = setTimeout(requestCameraPermission, 3000);
        await requestCameraPermission();
        clearTimeout(timer);
      } else {
        await requestCameraPermission();
      }
    };
    getPermissions();
  }, [dispatch]);

  useEffect(() => {
    if (!hiddenAsked && isMapReady) {
      Alert.alert(
        i18n.mapScreen.requestVisibility.title,
        i18n.mapScreen.requestVisibility.message,
        [
          {
            text: i18n.general.no,
            onPress: () => {
              dispatch(changeVisibility(false));
            },
            style: 'cancel',
          },
          {
            text: i18n.general.yes,
            onPress: async () => {
              dispatch(changeVisibility(true));
            },
          },
        ],
      );
    }
  }, [dispatch, hiddenAsked, isMapReady]);

  // useEffect(() => {
  //   if (followLocation) {
  //     mapRef.current?.animateToRegion({
  //       latitudeDelta: metersToLatitudes(radius),
  //       longitudeDelta: metersToLatitudes(radius),
  //       latitude: coords?.latitude,
  //       longitude: coords?.longitude,
  //     });
  //   }
  // }, [followLocation, location, radius]);

  useFocusEffect(
    useCallback(() => {
      if (!isMenuOpen) {
        setLocationPosition();
        dispatch(getUsersAround());
      }
    }, [dispatch, isMenuOpen, setLocationPosition]),
  );

  useEffect(() => {
    if (!isMenuOpen) {
      CompassHeading.start(
        degree_update_rate,
        ({ heading }: { heading: number }) => {
          mapRef.current?.setCamera({
            heading,
          });
        },
      );
    }

    return () => {
      CompassHeading.stop();
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isLocationPermissionGranted) {
      setLocationPosition();
    }
  }, [isLocationPermissionGranted]);

  useEffect(() => {
    //setLoadingDots
    if (isLocationPermissionGranted && !coords && !loadingDotsTimer) {
      loadingDotsTimer = setInterval(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setLoadingDots(prevState => {
          if (prevState === '...') {
            return '';
          } else {
            return prevState + '.';
          }
        });
      }, 500);
    } else if (loadingDotsTimer) {
      clearInterval(loadingDotsTimer);
      loadingDotsTimer = null;
    }
  }, [coords, isLocationPermissionGranted]);

  return (
    <BaseLayout showTopSafeArea={false}>
      {isLocationPermissionGranted && !!coords ? (
        <MapView
          ref={mapRef}
          initialRegion={{
            latitudeDelta: metersToLatitudes(radius),
            longitudeDelta: metersToLatitudes(radius),
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          provider={Platform.OS === 'android' ? 'google' : undefined}
          rotateEnabled={true}
          scrollEnabled={true}
          followsUserLocation={true}
          showsCompass={false}
          loadingEnabled={true}
          zoomEnabled={true}
          // onPanDrag={onMapDrug}
          onMapReady={() => setIsMapReady(true)}
          style={{ ...StyleSheet.absoluteFillObject }}>
          {isMapReady && !!coords && (
            <>
              {filteredUsers.map((user, index) => {
                const date = moment.unix(user?.coords?.udate).format();
                const diff = moment().diff(date, 'minutes');
                return (
                  <Marker
                    key={user.profile.user}
                    onPress={() =>
                      navigation.navigate('usersProfiles', {
                        profiles: profiles.slice(0, profiles.length),
                        currentIndex: index,
                      })
                    }
                    coordinate={{
                      latitude: user.coords.lat,
                      longitude: user.coords.lng,
                    }}>
                    <ImageFrame
                      userName={user.profile.user_name}
                      imagePath={user.profile?.avatar?.path}
                      imageId={user.profile?.avatar?.sid}
                      strokeColor={
                        +diff >= 60 ? UIColors.gray : UIColors.highlightBlue
                      }
                    />
                  </Marker>
                );
              })}

              <Marker style={styles.top} coordinate={coords}>
                <MapPinIcon style={styles.pin} />
              </Marker>

              <Circle
                style={styles.top}
                center={coords}
                radius={radius * 0.3048}
                strokeWidth={2}
                strokeColor={UIColors.yellow}
                lineCap="round"
                lineJoin="round"
              />
            </>
          )}
        </MapView>
      ) : isLocationPermissionGranted && !coords ? (
        <View style={styles.deniedPermissionWrapper}>
          <Text style={styles.deniedPermissionText}>
            {i18n.mapScreen.messages.pendingPosition + loadingDots}
          </Text>
        </View>
      ) : (
        <View style={styles.deniedPermissionWrapper}>
          <Text style={styles.deniedPermissionText}>
            {i18n.mapScreen.messages.noAccess}
          </Text>
          <TouchableOpacity
            style={styles.deniedPermissionButton}
            onPress={openLocationSettings}>
            <Text style={styles.deniedPermissionButtonTitle}>
              {i18n.general.openSettings}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isLocationPermissionGranted && !!coords ? (
        <SafeAreaView>
          <MapMenu
            radius={radius}
            onGendersChange={setGenders}
            onRadiusChange={onRadiusChange}
            onOpen={setIsMenuOpen}
            onChange={onFiltersChange}
          />
          <TouchableOpacity
            style={styles.myLocationButton}
            onPress={setCameraToUserPosition}>
            <MyLocationIcon width={44} height={44} color={UIColors.black} />
          </TouchableOpacity>
        </SafeAreaView>
      ) : null}

      {isLocationPermissionGranted && !!coords ? (
        <View style={styles.userListWrapper}>
          <UserList users={filteredUsers} />
        </View>
      ) : null}
      <InfoModal
        visible={locationStatusModalVisible}
        title={i18n.mapScreen.locationStatusModal.title}
        message={locationStatusModalMessage}
        actionButtonTitle={i18n.general.open}
        actionTitleColor={UIColors.brandBlue}
        onRequestClose={closeLocationStatusModal}
        onActionButtonPress={openLocationSettings}
      />
    </BaseLayout>
  );
};

export default MapScreen;
