import RegistrationSurveySlice from './RegistrationSurveySlice';

export const registrationSurveyReducer = RegistrationSurveySlice.reducer;
export const {
  setSurveyName,
  setSurveyEmail,
  setSurveyIsAdult,
  setSurveyJob,
  setSurveyGender,
  setSurveyPhone,
  setSurveyQuote,
  resetSurvey,
} = RegistrationSurveySlice.actions;
