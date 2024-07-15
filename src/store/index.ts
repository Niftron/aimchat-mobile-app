import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authReducer } from './slices/AuthSlice';
import { geolocationReducer } from './slices/GeolocationSlice';
import { queueReducer } from './slices/QueueSlice';
import { registrationSurveyReducer } from './slices/RegistrationSurveySlice';
import { chatReducer } from './slices/ChatSlice';

export const store = configureStore({
  reducer: {
    queue: queueReducer,
    geolocation: geolocationReducer,
    registrationSurvey: registrationSurveyReducer,
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
