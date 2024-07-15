import { ResourceType } from 'app/services/types';
import { AxiosError } from 'axios';

export type userProfileGenderType = 'm' | 'f' | 'p' | null;

export type UserType = {
  id: string;
  created_at: string;
  token: string;
  is_verified: boolean;
  is_enabled: boolean;
  fb_id: string;
  fak_id: string;
  device: string;
  phone: string;
  profile: UserProfileType;
};

export type UserProfileAvatarType = {
  did: string;
  owner: string;
  sid: string;
  path: string;
  origin: string;
  mime: string;
  size: number;
  sort: number;
  cdate: Date;
  udate: Date;
  meta: string;
  width: number;
  height: number;
};

export type UserProfileType = {
  user: string;
  user_name: string;
  job: string;
  quote: string;
  summary: string;
  email: string;
  email_private: boolean;
  company: string;
  company_private: boolean;
  education: string;
  education_private: boolean;
  phone: string;
  phone_private: boolean;
  avatar: UserProfileAvatarType;
  gender: userProfileGenderType;
  banned_by_me: boolean;
};

export type ExtendedUserProfileType = {
  message: string;
  position: {
    lat: number;
    lng: number;
  };
  profile: UserProfileType;
  gallery: ResourceType[];
};

export type ConversationProfileType = {
  profile: UserProfileType;
  updateDate: string;
  unread: number;
};

enum errorEnum {
  invalidEmail = 'invalidEmail',
  unauthorized = 'unauthorized',
  invalid_fb_account = 'invalid_fb_account',
  invalid_phone = 'invalid_phone',
  invalid_confirmation_code = 'invalid_confirmation_code',
  uploading_file_count_range_max = 'uploading_file_count_range_max',
  removing_file_count_range_max = 'removing_file_count_range_max',
  invalid_limit_range = 'invalid_limit_range',
  empty_request_data = 'empty_request_data',
  account_not_exists = 'account_not_exists',
  conversation_request_already_sent = 'conversation_request_already_sent',
  conversation_request_not_found = 'conversation_request_not_found',
  only_receiver_can_accept_conversation_request = 'only_receiver_can_accept_conversation_request',
  only_receiver_can_reject_conversation_request = 'only_receiver_can_reject_conversation_request',
  only_sender_can_cancel_conversation_request = 'only_sender_can_cancel_conversation_request',
  conversation_too_long_message = 'conversation_too_long_message',
  not_found = 'not_found',
  bad_file_error = 'bad_file_error',
  default_error = 'default_error',
  image_not_exists_in_gallery = 'image_not_exists_in_gallery',
  verification_service_verification_error = 'verification_service_verification_error',
  verification_service_invalid_number = 'verification_service_invalid_number',
  account_banned = 'account_banned',
  invalid_message_text = 'invalid_message_text',
}

export type ApiError = AxiosError<{
  error: errorEnum;
}>;
