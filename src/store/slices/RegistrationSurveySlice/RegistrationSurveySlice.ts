import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialsStateType = {
  name: string;
  isAdult: boolean;
  gender: 'm' | 'f' | 'p' | null;
  email: string;
  phone: {
    code: string;
    number: string;
  };
  job: {
    title: string;
    company: string;
  };
  quote: string;
};

const initialState: InitialsStateType = {
  name: '',
  isAdult: false,
  gender: null,
  email: '',
  phone: {
    code: '',
    number: '',
  },
  job: {
    title: '',
    company: '',
  },
  quote: '',
};

const RegistrationSurveySlice = createSlice({
  name: 'registrationSurvey',
  initialState,
  reducers: {
    setSurveyName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSurveyIsAdult: (state, action: PayloadAction<boolean>) => {
      state.isAdult = action.payload;
    },
    setSurveyGender: (state, action: PayloadAction<'m' | 'f' | 'p'>) => {
      state.gender = action.payload;
    },
    setSurveyEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSurveyPhone: (
      state,
      action: PayloadAction<{ code: string; number: string }>,
    ) => {
      state.phone = action.payload;
    },
    setSurveyJob: (
      state,
      action: PayloadAction<{ title: string; company: string }>,
    ) => {
      state.job = action.payload;
    },
    setSurveyQuote: (state, action: PayloadAction<string>) => {
      state.quote = action.payload;
    },
    resetSurvey: () => initialState,
  },
});

export default RegistrationSurveySlice;
