import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatService } from 'app/services/ChatService';
import { ConversationProfileType } from 'app/types';
import { ProfileService } from 'app/services/ProfileService';
import { AppDispatch, RootState } from 'app/store';
import { ChatMessageType } from 'app/services/types';

type InitialState = {
  chatRooms: ConversationProfileType[];
  messages: ChatMessageType[];
  isLoading: boolean;
  unreadCount: number;
  currentCompanion: string | null;
};

const initialState: InitialState = {
  chatRooms: [],
  messages: [],
  isLoading: false,
  unreadCount: 0,
  currentCompanion: null,
};

export const getChatRooms = createAsyncThunk<
  void,
  undefined,
  { state: RootState; dispatch: AppDispatch }
>('chat/chatRooms', async (params, { dispatch, getState }) => {
  try {
    dispatch(ChatSlice.actions.setIsLoading(true));
    const response = await ChatService.getChatIncomingRequests({
      status: 2,
      role: 'all',
    });
    const userProfile = getState().auth.user.profile;

    if (response?.data?.response) {
      const chatRequestRes = response.data.response['Conversation[]'];
      if (chatRequestRes?.length) {
        const ids = chatRequestRes.map(conversation => {
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
            let extendedChatProfiles = [];
            for (let i = 0; i < profileRes.length; i++) {
              let _profile = profileRes[i];
              for (let j = 0; j < chatRequestRes.length; j++) {
                let _chatRequest = chatRequestRes[j];
                if (
                  _profile.user === _chatRequest.sender ||
                  _profile.user === _chatRequest.receiver
                ) {
                  extendedChatProfiles.push({
                    profile: _profile,
                    updateDate: _chatRequest.meta.meta_udate,
                    unread: +_chatRequest.meta.meta_unread,
                  });
                  break;
                }
              }
            }
            extendedChatProfiles.sort((a, b) => {
              return +b.updateDate - +a.updateDate;
            });
            dispatch(
              ChatSlice.actions.setChatRooms(
                extendedChatProfiles?.length ? extendedChatProfiles : [],
              ),
            );
            return;
          }
        } else {
          ChatSlice.actions.setChatRooms([]);
        }
      } else {
        dispatch(ChatSlice.actions.setChatRooms([]));
        return;
      }
    }
  } catch (error) {
    console.error(error);
    dispatch(ChatSlice.actions.setIsLoading(false));
  }
});

export const getMessagesCount = createAsyncThunk(
  'chat/messagesCount',
  async (params, { dispatch }) => {
    try {
      const response = await ChatService.getMessagesCount();
      if (response?.data?.response) {
        const messagesCount = response.data.response?.MessageStatistic.unread;
        dispatch(ChatSlice.actions.setMessagesCount(messagesCount));
      }
      return;
    } catch (error) {
      console.error('getMessagesCount error:', error);
    }
  },
);

export const deleteChat = createAsyncThunk(
  'chat/deleteChat',
  async (receiver: string, { dispatch }) => {
    try {
      dispatch(ChatSlice.actions.setIsLoading(true));
      await ChatService.deleteChat(receiver);
    } catch (error) {
      console.error('deleteChat error:', error);
      dispatch(ChatSlice.actions.setIsLoading(false));
    }
  },
);

const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatRooms: (state, action: PayloadAction<ConversationProfileType[]>) => {
      state.chatRooms = action.payload;
      state.isLoading = false;
    },
    setMessages: (state, action: PayloadAction<ChatMessageType[]>) => {
      state.messages = action.payload;
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMessagesCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    setCurrentCompanion: (state, action: PayloadAction<string | null>) => {
      state.currentCompanion = action.payload;
    },
  },
});
export default ChatSlice;
