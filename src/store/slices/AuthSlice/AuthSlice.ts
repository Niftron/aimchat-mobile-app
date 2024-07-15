import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from 'app/services/AuthService';
import { getDeviceId } from 'react-native-device-info';
import {
  clearSecureStorageItems,
  getSecureStorageItem,
  setSecureStorageItem,
} from 'app/utils/secureStorage';
import { generateToken, getRefreshToken } from 'app/utils/auth';
import { UserProfileType } from 'app/types';
import { ResourceType } from 'app/services/types';
import { ResourceService } from 'app/services/ResourceService';
import { ProfileService } from 'app/services/ProfileService';
import { RootState } from 'app/store';
import { Asset } from 'react-native-image-picker';
import {
  setIsAuth,
  setUserGallery,
  setUserProfile,
  setAuthType,
  setVerificationCode,
  setPhone,
  setIsConfirmationCodeInvalid,
  resetAuth,
  setIsFetchFinished,
} from './index';
import { sortDates } from 'app/utils/datetimeHelper';
import { clearCache } from 'app/utils/cachingImageService';

type InitialState = {
  authType: 'login' | 'registration' | 'fetch' | '';
  isAuth: boolean;
  isFetchFinished: boolean;
  verificationCode: string;
  phone: string;
  device: string;
  user: {
    profile: UserProfileType;
    gallery: ResourceType[];
  };
  loading: {
    isProfileUpdating: boolean;
    isConfirmationCodeLoading: boolean;
  };
  isConfirmationCodeInvalid: boolean;
};

const initialState: InitialState = {
  authType: '',
  isAuth: false,
  isFetchFinished: true,
  verificationCode: '',
  phone: '',
  device: '',
  user: {
    profile: {} as UserProfileType,
    gallery: [],
  },
  loading: {
    isProfileUpdating: false,
    isConfirmationCodeLoading: false,
  },
  isConfirmationCodeInvalid: false,
};

export const phoneRequest = createAsyncThunk(
  'auth/phoneRequest',
  async (phone: string, { dispatch }) => {
    try {
      const response = await AuthService.phoneRequest(phone);
      if (response) {
        dispatch(setVerificationCode(response.data));
        dispatch(setPhone(phone));
      }
    } catch (error) {
      console.error('phoneRequest error:', error);
    }
  },
);

export const phoneConfirmation = createAsyncThunk(
  'auth/phoneConfirmation',
  async (data: { phone: string; code: string }, { dispatch }) => {
    try {
      const device = getDeviceId();
      const salt = await generateToken();
      const response = await AuthService.phoneConfirmation({
        ...data,
        device,
        salt,
      });

      if (response?.data) {
        await setSecureStorageItem('tokens', {
          token: response.data.response.User.token,
          device,
          salt,
        });

        dispatch(setIsAuth(true));
        dispatch(setAuthType(response.data.response._meta.operation));
        dispatch(setUserProfile(response.data.response.User.profile));

        const galleryResponse = await ResourceService.getGalleryByUser({
          userId: response.data.response.User.profile.user,
        });

        if (galleryResponse.data.response['Resource[]']?.length) {
          let sortedGallery = galleryResponse.data.response['Resource[]'].sort(
            (a, b) => {
              return sortDates(a.udate, b.udate, 'DESC');
            },
          );
          dispatch(setUserGallery(sortedGallery));
        } else {
          dispatch(setUserGallery([]));
        }
      }
    } catch (error: any) {
      console.error('phoneConfirmation error:', error);

      if (error?.response?.status === 400) {
        dispatch(setIsConfirmationCodeInvalid(true));
      }
    }
  },
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { dispatch }) => {
    try {
      dispatch(setIsFetchFinished(false));
      const profileResponse = await ProfileService.getProfile();
      if (profileResponse?.data) {
        await dispatch(setUserProfile(profileResponse.data.response.Profile));

        const galleryResponse = await ResourceService.getGalleryByUser({
          userId: profileResponse.data.response.Profile.user,
        });

        if (galleryResponse.data.response['Resource[]']?.length) {
          let sortedGallery = galleryResponse.data.response['Resource[]'].sort(
            (a, b) => {
              return sortDates(a.udate, b.udate, 'DESC');
            },
          );
          dispatch(setUserGallery(sortedGallery));
        } else {
          dispatch(setUserGallery([]));
        }

        dispatch(setAuthType('fetch'));
        dispatch(setIsAuth(true));
      }
      dispatch(setIsFetchFinished(true));
    } catch (error) {
      console.error('fetchUser error:', error);
      dispatch(setIsFetchFinished(true));
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { dispatch }) => {
    try {
      const tokens = await getSecureStorageItem('tokens');
      const refresh = getRefreshToken(tokens);

      const response = await AuthService.refreshToken(refresh);

      if (response) {
        setSecureStorageItem('tokens', {
          ...tokens,
          token: response.data.response.token,
          salt: refresh,
        });

        dispatch(fetchUser());
      }
    } catch (error) {
      console.error('refreshToken error:', error);
      dispatch(clearUserData());
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'auth/UpdateProfile',
  async (
    {
      profile,
      newImages,
      deletedImagesIds,
    }: {
      profile: UserProfileType;
      newImages: Asset[];
      deletedImagesIds: string[];
    },
    { getState, dispatch },
  ) => {
    try {
      const state = getState() as RootState;
      await ResourceService.deleteImages(deletedImagesIds);
      await ResourceService.uploadImages(newImages);

      const profileResponse = await ProfileService.updateProfile(profile);
      const galleryResponse = await ResourceService.getGalleryByUser({
        userId: state.auth.user.profile.user,
      });

      dispatch(setUserProfile(profileResponse.data.response.Profile));
      if (galleryResponse.data.response['Resource[]']?.length) {
        let sortedGallery = galleryResponse.data.response['Resource[]'].sort(
          (a, b) => {
            return sortDates(a.udate, b.udate, 'DESC');
          },
        );
        dispatch(setUserGallery(sortedGallery));
      } else {
        dispatch(setUserGallery([]));
      }
    } catch (error) {
      console.error('updateUserProfile error', error);
    }
  },
);

export const updateUserAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (asset: Asset, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const avatarRes = await ResourceService.uploadImages([asset]);
      if (avatarRes) {
        const newAvatar = avatarRes.data.response['Resource[]'][0];
        dispatch(setUserGallery([...state.auth.user.gallery, newAvatar]));

        const {
          data: {
            response: { Profile },
          },
        } = await ProfileService.updateAvatar(newAvatar.did);

        dispatch(setUserProfile(Profile));
      }
    } catch (error) {
      console.error(error);
    }
  },
);

export const clearUserData = createAsyncThunk(
  'auth/clearUserData',
  async (_, { dispatch }) => {
    try {
      await clearSecureStorageItems();
      dispatch(resetAuth());
      clearCache();
    } catch (error) {
      console.error('clearUserData error:', error);
    }
  },
);

export const setBlockStatus = createAsyncThunk(
  'auth/changeBlockStatus',
  async ({ receiver, status }: { receiver: string; status: string }) => {
    try {
      await AuthService.setBlockStatus({
        objectId: receiver,
        action: status,
      });

      return true;
    } catch (error) {
      console.error('setBlockStatus error:', error);
      return false;
    }
  },
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsFetchFinished: (state, action: PayloadAction<boolean>) => {
      state.isFetchFinished = action.payload;
    },
    setVerificationCode: (state, action: PayloadAction<string>) => {
      state.verificationCode = action.payload;
    },
    setAuthType: (state, action: PayloadAction<InitialState['authType']>) => {
      state.authType = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfileType>) => {
      state.user.profile = action.payload;
    },
    setUserGallery: (state, action: PayloadAction<ResourceType[]>) => {
      state.user.gallery = action.payload;
    },
    setIsConfirmationCodeInvalid: (state, action: PayloadAction<boolean>) => {
      state.isConfirmationCodeInvalid = action.payload;
    },
    resetAuth: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(updateUserProfile.pending, state => {
      state.loading.isProfileUpdating = true;
    });
    builder.addCase(updateUserProfile.fulfilled, state => {
      state.loading.isProfileUpdating = false;
    });
    builder.addCase(updateUserProfile.rejected, state => {
      state.loading.isProfileUpdating = false;
    });

    builder.addCase(phoneConfirmation.pending, state => {
      state.loading.isConfirmationCodeLoading = true;
    });
    builder.addCase(phoneConfirmation.fulfilled, state => {
      state.loading.isConfirmationCodeLoading = false;
    });
    builder.addCase(phoneConfirmation.rejected, state => {
      state.loading.isConfirmationCodeLoading = false;
    });
  },
});

export default AuthSlice;
