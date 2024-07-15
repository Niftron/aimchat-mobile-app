import ChatSlice from './ChatSlice';

export const chatReducer = ChatSlice.reducer;

export const { setCurrentCompanion } = ChatSlice.actions;
