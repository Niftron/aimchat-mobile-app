import type { UserProfileType } from 'app/types';
// AUTH
export type PhoneConfirmationRequestType = {
  phone: string;
  device: string;
  code: string;
  salt: string;
};

// GEOLOCATION
export type SendMyGeoPositionArgumentType = {
  lat: number;
  lng: number;
};
export type SendMyGeoPositionRequestType = {
  lat: number;
  lng: number;
  hidden: boolean;
};

export type GeoPositionsAroundRequestType = {
  distance: number;
  limit?: number;
  timeout?: number;
};

export type GeoPositionsAroundResponseType = {
  response: {
    'GeoObject[]': GeoDataResponseType[];
  };
};

export type GeoDataResponseType = {
  id: string;
  lat: number;
  lng: number;
  alt: number;
  dist: number;
  udate: number;
  hidden: boolean;
};

// CHAT
export type ChatRequestListQueryType = {
  role: 'receiver' | 'sender' | 'all';
  status?: number;
  limit?: number;
  offset?: number;
};

export type ChatConversationType = {
  sender: string;
  receiver: string;
  message: string;
  position: {
    lat: number;
    lng: number;
  };
  cdate: string;
  udate: string;
  status: number;
  meta: {
    meta_sender: string;
    meta_receiver: string;
    meta_message: string;
    meta_udate: string;
    meta_sdate: string;
    meta_unread: number;
  };
};

export type CheckRequestFromUserRequestType = {
  response: {
    Conversation: ChatConversationType;
  };
};

export type ChatIncomingRequestsResponse = {
  response: {
    'Conversation[]': ChatConversationType[];
  };
};

export type ChatIncomingRequestResponse = {
  response: {
    Conversation: ChatConversationType;
  };
};

export type SendChatRequestDataType = {
  receiverID: string;
  message: string;
  lat: number;
  lng: number;
};

export type SendMessageDataType = {
  userID: string;
  message: string;
};

export type ChatMessageType = {
  id: number;
  hash: string;
  sender: string;
  receiver: string;
  message: string;
  cdate: string;
  rdate: string;
  resource: string;
  thumbnail: string;
};

export type SendMessageResponseType = {
  response: {
    Message: ChatMessageType;
  };
};

export type MessagesResponseType = {
  response: {
    'Message[]': ChatMessageType[];
  };
};

export type MessagesCountResponseType = {
  response: {
    MessageStatistic: {
      unread: number;
    };
  };
};

export type DeleteChatResponseType = {
  response: {
    result: 'OK';
  };
};

export type ChatMessagesFiltersType = {
  read?: 'read' | 'unread' | 'all';
  fromMessageId?: string;
  order?: 'DESC' | 'ASC';
  offset?: number;
  limit?: number;
};

// PROFILE
export type ListOfProfilesRequestType = {
  userIDs: string[];
  limit?: number;
  offset?: number;
};

export type ListOfProfilesResponseType = {
  response: {
    'Profile[]': UserProfileType[];
  };
};

export type ResourceType = {
  did: string;
  owner: string;
  sid: string;
  path: string;
  origin: string;
  mime: string;
  size: number;
  sort: number;
  cdate: string;
  udate: string;
  meta: string;
  width: number;
  height: number;
};

export type GetGalleryPropsType = {
  userId: string;
  limit?: number;
  offset?: number;
};

export type GetGalleryResponseType = {
  response: {
    'Resource[]': ResourceType[];
  };
};
