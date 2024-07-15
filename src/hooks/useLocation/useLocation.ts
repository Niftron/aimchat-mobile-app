import { useCallback, useEffect, useState } from 'react';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { useAppDispatch, useTypedSelector } from 'app/store';
import {
  getUsersAround,
  sendMyGeoPosition,
} from 'app/store/slices/GeolocationSlice/GeolocationSlice';
import {
  setCoords,
  setGeopositionTool,
} from 'app/store/slices/GeolocationSlice';
const INTERVAL = 60000; // 1 min
let watch: NodeJS.Timer | null = null;

const useLocation = () => {
  const isAuth = useTypedSelector(state => state.auth.isAuth);
  const [location, setLocation] = useState<GeolocationResponse>();
  const dispatch = useAppDispatch();
  const onLocation = useCallback(
    (currentLocation: GeolocationResponse) => {
      if (currentLocation?.coords) {
        setLocation(currentLocation);
        dispatch(
          sendMyGeoPosition({
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude,
          }),
        );
        dispatch(
          setCoords({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          }),
        );
        dispatch(getUsersAround());
      }
    },
    [dispatch],
  );

  const watchPosition = useCallback(async () => {
    //We tried the Geolocation.watchPosition but it's not working properly with high accuracy, creating fuzzing in map, or even not updating at all
    //So setting the timer is the proper workaround
    //Also we are trying both wi-fi and gps tracking to get the most accurate position
    let locationParamsOne: undefined | GeolocationResponse;
    let locationParamsTwo: undefined | GeolocationResponse;

    function finishedCheckingPositionAccuracy(
      firstLocation: GeolocationResponse,
      secondLocation: GeolocationResponse,
    ) {
      if (firstLocation.coords.accuracy >= secondLocation.coords.accuracy) {
        dispatch(setGeopositionTool('gps'));
        onLocation(firstLocation);
      } else {
        dispatch(setGeopositionTool('wi-fi'));
        onLocation(secondLocation);
      }
    }
    Geolocation.getCurrentPosition(
      currentPosition => {
        locationParamsOne = currentPosition;
        if (locationParamsTwo) {
          finishedCheckingPositionAccuracy(
            locationParamsOne,
            locationParamsTwo,
          );
        }
      },
      err => {
        locationParamsOne = {
          coords: {
            accuracy: -1,
            altitude: 0,
            altitudeAccuracy: -1,
            heading: -1,
            latitude: 0.0,
            longitude: 0.0,
            speed: -1,
          },
          timestamp: 0,
        };
        console.warn(
          'Geolocation.getCurrentPosition enableHighAccuracy: true, error ',
          err,
        );
        if (locationParamsTwo) {
          finishedCheckingPositionAccuracy(
            locationParamsOne,
            locationParamsTwo,
          );
        }
      },
      {
        enableHighAccuracy: true,
      },
    );
    Geolocation.getCurrentPosition(
      currentPosition => {
        locationParamsTwo = currentPosition;
        if (locationParamsOne) {
          finishedCheckingPositionAccuracy(
            locationParamsOne,
            locationParamsTwo,
          );
        }
      },
      err => {
        locationParamsTwo = {
          coords: {
            accuracy: -1,
            altitude: 0,
            altitudeAccuracy: -1,
            heading: -1,
            latitude: 0.0,
            longitude: 0.0,
            speed: -1,
          },
          timestamp: 0,
        };
        console.warn(
          'Geolocation.getCurrentPosition enableHighAccuracy: false, error ',
          err,
        );
        if (locationParamsOne) {
          finishedCheckingPositionAccuracy(
            locationParamsOne,
            locationParamsTwo,
          );
        }
      },
      {
        enableHighAccuracy: false,
      },
    );
    watch = setTimeout(watchPosition, INTERVAL);
  }, [onLocation, dispatch]);

  useEffect(() => {
    //Yes, of course we need to clear timeouts on unmounting to escape the memory leak, but! this hook is top component hook, so the only time we need to really close it is when the application is closed.
    //And there are some problems with huawei models and timeouts, so there is no need for now to clear timeout on return func.
    if (isAuth && !watch) {
      watchPosition();
    } else if (!isAuth && watch !== null) {
      clearTimeout(watch);
      watch = null;
    }
  }, [isAuth, watchPosition]);

  return location;
};

export default useLocation;
