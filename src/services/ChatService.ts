import { AxiosResponse } from 'axios';
import { api } from './api';
import { CHAT_URL } from 'app/constants/config';
import {
  ChatConversationType,
  ChatIncomingRequestsResponse,
  ChatMessagesFiltersType,
  ChatRequestListQueryType,
  CheckRequestFromUserRequestType,
  DeleteChatResponseType,
  MessagesCountResponseType,
  MessagesResponseType,
  SendChatRequestDataType,
  SendMessageDataType,
  SendMessageResponseType,
} from './types';

/*
INFO: Request statuses:
1 - new request/pending
2 - request accepted
4 - request cancelled
8 - request rejected
16 - sender of request was muted
32 - receiver of request was muted
255 - all requests
 */
export class ChatService {
  static getChatIncomingRequests = async ({
    status = 255,
    role,
    limit = 20,
    offset = 0,
  }: ChatRequestListQueryType): Promise<
    AxiosResponse<ChatIncomingRequestsResponse>
  > => {
    return api.get(CHAT_URL + 'api/v1/chat/request/list', {
      params: { status, role, limit, offset },
    });
  };

  static sendChatRequest = async (
    data: SendChatRequestDataType,
  ): Promise<AxiosResponse<ChatIncomingRequestsResponse>> => {
    const formData = new FormData();

    formData.append('message', data.message);
    formData.append('lat', data.lat);
    formData.append('lng', data.lng);

    return api.post(
      CHAT_URL + `api/v1/chat/request/send/${data.receiverID}`,
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
  };

  static checkRequestFromUser = async (
    userID: string,
  ): Promise<AxiosResponse<CheckRequestFromUserRequestType>> => {
    return api.get(CHAT_URL + `api/v1/chat/request/check/${userID}`);
  };

  static acceptChatRequest = async (
    userID: string,
  ): Promise<AxiosResponse<ChatConversationType>> => {
    return api.post(CHAT_URL + `api/v1/chat/request/accept/${userID}`);
  };

  static rejectChatRequest = async (
    userID: string,
  ): Promise<AxiosResponse<ChatConversationType>> => {
    return api.post(CHAT_URL + `api/v1/chat/request/reject/${userID}`);
  };

  static cancelChatRequest = async (
    userID: string,
  ): Promise<AxiosResponse<ChatConversationType>> => {
    return api.delete(CHAT_URL + `api/v1/chat/request/cancel/${userID}`);
  };

  static muteUser = async (
    userID: string,
  ): Promise<AxiosResponse<ChatConversationType>> => {
    return api.post(CHAT_URL + `api/v1/chat/request/mute/${userID}`);
  };

  static unmuteUser = async (
    userID: string,
  ): Promise<AxiosResponse<ChatConversationType>> => {
    return api.post(CHAT_URL + `api/v1/chat/request/unmute/${userID}`);
  };

  static sendMessage = async ({
    userID,
    message,
  }: SendMessageDataType): Promise<AxiosResponse<SendMessageResponseType>> => {
    const formData = new FormData();

    formData.append('message', message);
    return api.post(CHAT_URL + `api/v1/chat/message/send/${userID}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  static readMessages = async (
    data: number[],
  ): Promise<AxiosResponse<MessagesResponseType> | void> => {
    if (!data.length) {
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < data.length; i++) {
      const name = `messages[${i}]`;

      formData.append(name, data[i]);
    }

    return api.post(CHAT_URL + 'api/v1/chat/message/read', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  static getUserMessages = async (
    userID: string,
    filters: ChatMessagesFiltersType,
  ): Promise<AxiosResponse<MessagesResponseType>> => {
    return api.get(CHAT_URL + `api/v1/chat/message/${userID}`, {
      params: filters,
    });
  };

  static getMessagesCount = async (): Promise<
    AxiosResponse<MessagesCountResponseType>
  > => {
    return api.get(CHAT_URL + 'api/v1/chat/statistic/message');
  };

  static deleteChat = async (
    receiver: string,
  ): Promise<AxiosResponse<DeleteChatResponseType>> => {
    return api.delete(CHAT_URL + `api/v1/chat/request/remove-chat/${receiver}`);
  };
}
