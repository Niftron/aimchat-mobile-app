import GeolocationSlice from './GeolocationSlice';

export const geolocationReducer = GeolocationSlice.reducer;

export const {
  setCoords,
  setUsersAround,
  setRadius,
  setGeopositionTool,
  setHiddenAsked,
  setHidden,
} = GeolocationSlice.actions;
