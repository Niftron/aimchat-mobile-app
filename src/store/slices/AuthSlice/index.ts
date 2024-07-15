import AuthSlice from './AuthSlice';

export const authReducer = AuthSlice.reducer;

export const {
  setIsAuth,
  setVerificationCode,
  setUserGallery,
  setUserProfile,
  setAuthType,
  setPhone,
  setIsConfirmationCodeInvalid,
  resetAuth,
  setIsFetchFinished,
} = AuthSlice.actions;
