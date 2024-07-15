import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeoService } from 'app/services/GeoService';
import { ProfileService } from 'app/services/ProfileService';
import {
  GeoDataResponseType,
  SendMyGeoPositionArgumentType,
} from 'app/services/types';
import { UserProfileType } from 'app/types';
import { setHidden, setHiddenAsked, setUsersAround } from './index';
import { RootState } from 'app/store';
import { setSecureStorageItem } from 'app/utils/secureStorage';
import { VISIBILITY_TOKEN } from 'app/constants';

const INITIAL_RADIUS = 150;

type InitialState = {
  coords: {
    latitude: number;
    longitude: number;
  } | null;
  hidden: boolean;
  hiddenAsked: boolean;
  usersAround: {
    coords: GeoDataResponseType;
    profile: UserProfileType;
  }[];
  geopositionTool: 'wi-fi' | 'gps';
  radius: number;
};

const initialState: InitialState = {
  coords: null,
  hidden: true,
  hiddenAsked: false,
  usersAround: [],
  geopositionTool: 'wi-fi',
  radius: INITIAL_RADIUS,
};

export const changeVisibility = createAsyncThunk(
  'geolocation/changeVisibility',
  async (isVisible: boolean, { dispatch }) => {
    try {
      await setSecureStorageItem(VISIBILITY_TOKEN, {
        hidden: !isVisible,
      });
      dispatch(setHidden(!isVisible));
      dispatch(setHiddenAsked(true));
    } catch (error) {
      console.error('changeVisibility error:', error);
    }
  },
);

export const sendMyGeoPosition = createAsyncThunk(
  'geolocation/usersAround',
  async ({ lat, lng }: SendMyGeoPositionArgumentType, { getState }) => {
    try {
      const {
        geolocation: { hidden },
      } = getState() as RootState;
      GeoService.sendMyGeoPosition({
        lat,
        lng,
        hidden,
      });
    } catch (error) {
      console.error('sendMyGeoPosition error:', error);
    }
  },
);

export const getUsersAround = createAsyncThunk(
  'geolocation/usersAround',
  async (_, { dispatch, getState }) => {
    try {
      const {
        geolocation: { radius },
      } = getState() as RootState;
      const {
        data: { response },
      } = await GeoService.getUserGeoPositionAround({
        distance: radius * 0.001,
      });
      const objectsAround = response['GeoObject[]'];

      let userIDs = objectsAround.map(el => el.id);

      if (userIDs?.length) {
        const profiles = await ProfileService.getListOfProfiles({
          userIDs,
          limit: userIDs.length,
        });
        const userProfiles = profiles.data.response['Profile[]'];

        let usersAround = [];
        for (let i = 0; i < userProfiles.length; i++) {
          for (let j = 0; j < userProfiles.length; j++) {
            let userProfile = userProfiles[i];
            let geoObject = objectsAround[j];
            if (userProfile.user === geoObject.id) {
              usersAround.push({
                coords: geoObject,
                profile: userProfile,
              });
              break;
            }
          }
        }

        let filteredUser = usersAround.sort((a, b) => {
          return +b.coords.udate - +a.coords.udate;
        });

        dispatch(setUsersAround(filteredUser));
      } else {
        dispatch(setUsersAround([]));
      }
    } catch (error) {
      console.error('getUsersAround error:', error);
    }
  },
);

// export const updateUsersAround = createAsyncThunk(
//   'geolocation/updateUsersAround',
//   async (usersCoords: GeoDataResponseType[], { dispatch }) => {
//     try {
//       const userIDs = usersCoords.map(el => el.id);

//       const profiles = await ProfileService.getListOfProfiles({
//         userIDs,
//         limit: userIDs.length,
//       });

//       const usersAround = usersCoords.map((coords, i) => ({
//         coords,
//         profile: profiles.data.response['Profile[]'][i],
//       }));

//       dispatch(setUsersAround(usersAround));
//     } catch (error) {}
//   },
// );
const GeolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setCoords: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.coords = action.payload;
    },
    setUsersAround: (
      state,
      action: PayloadAction<
        {
          coords: GeoDataResponseType;
          profile: UserProfileType;
        }[]
      >,
    ) => {
      state.usersAround = action.payload;
    },
    setRadius: (state, action: PayloadAction<number>) => {
      state.radius = action.payload;
    },
    setHidden: (state, action: PayloadAction<boolean>) => {
      state.hidden = action.payload;
    },
    setHiddenAsked: (state, action: PayloadAction<boolean>) => {
      state.hiddenAsked = action.payload;
    },
    setGeopositionTool: (state, action: PayloadAction<'wi-fi' | 'gps'>) => {
      state.geopositionTool = action.payload;
    },
  },
});

export default GeolocationSlice;
