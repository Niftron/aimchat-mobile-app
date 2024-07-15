import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatService } from 'app/services/ChatService';
import { UserProfileType } from 'app/types';
import { ProfileService } from 'app/services/ProfileService';
import { AppDispatch, RootState } from 'app/store';

type InitialState = {
  friends: UserProfileType[];
  pendingRequests: UserProfileType[];
  isLoading: boolean;
};

const initialState: InitialState = {
  friends: [],
  pendingRequests: [],
  isLoading: false,
};

async function filterConnections({
  status,
  role,
  userProfile,
}: {
  status: number;
  role: 'receiver' | 'sender' | 'all';
  userProfile: UserProfileType;
}) {
  const response = await ChatService.getChatIncomingRequests({
    status: status,
    role: role,
  });

  if (response?.data?.response) {
    const incomingRequestRes = response.data.response['Conversation[]'];
    if (incomingRequestRes?.length) {
      let ids = incomingRequestRes.map(conversation => {
        return userProfile.user === conversation.sender
          ? conversation.receiver
          : conversation.sender;
      });
      if (ids?.length) {
        const profilesResponse = await ProfileService.getListOfProfiles({
          userIDs: ids,
        });
        if (profilesResponse?.data?.response) {
          const profileRes = profilesResponse.data.response['Profile[]'];
          return profileRes?.length ? profileRes : [];
        }
      }
    }
  }
  return [];
}

export const acceptRequest = createAsyncThunk(
  'queue/acceptRequest',
  async (userID: string, { dispatch }) => {
    try {
      dispatch(QueueSlice.actions.setIsLoading(true));
      await ChatService.acceptChatRequest(userID);
      dispatch(QueueSlice.actions.setIsLoading(false));
      return;
    } catch (error) {
      console.error(error);
      dispatch(QueueSlice.actions.setIsLoading(false));
    }
  },
);

export const rejectRequest = createAsyncThunk(
  'queue/rejectRequest',
  async (userID: string, { dispatch }) => {
    try {
      dispatch(QueueSlice.actions.setIsLoading(true));
      await ChatService.rejectChatRequest(userID);
      dispatch(QueueSlice.actions.setIsLoading(false));
      return;
    } catch (error) {
      console.error(error);
      dispatch(QueueSlice.actions.setIsLoading(false));
    }
  },
);

export const getFriends = createAsyncThunk<
  void,
  undefined,
  { state: RootState; dispatch: AppDispatch }
>('queue/friends', async (params, { dispatch, getState }) => {
  try {
    dispatch(QueueSlice.actions.setIsLoading(true));
    const userProfile = getState().auth.user.profile;
    const friends = await filterConnections({
      status: 2,
      role: 'all',
      userProfile,
    });
    dispatch(QueueSlice.actions.setFriends(friends));
  } catch (error) {
    console.error('getFriends error:', error);
    dispatch(QueueSlice.actions.setFriends([]));
    dispatch(QueueSlice.actions.setIsLoading(false));
  }
});

export const getPendingRequest = createAsyncThunk<
  void,
  undefined,
  { state: RootState; dispatch: AppDispatch }
>('queue/pendingRequest', async (params, { dispatch, getState }) => {
  try {
    dispatch(QueueSlice.actions.setIsLoading(true));
    const userProfile = getState().auth.user.profile;
    const pending = await filterConnections({
      status: 1,
      role: 'receiver',
      userProfile,
    });
    dispatch(QueueSlice.actions.setPendingRequests(pending));
  } catch (error) {
    console.error('getPendingRequest error:', error);
    dispatch(QueueSlice.actions.setPendingRequests([]));
    dispatch(QueueSlice.actions.setIsLoading(false));
  }
});

const QueueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<UserProfileType[]>) => {
      state.friends = action.payload;
      state.isLoading = false;
    },
    setPendingRequests: (state, action: PayloadAction<UserProfileType[]>) => {
      state.pendingRequests = action.payload;
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});
export default QueueSlice;
