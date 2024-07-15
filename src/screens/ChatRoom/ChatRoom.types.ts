import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatStackParamList } from 'app/navigation/Navigation.types';
import { ChatMessageType } from 'app/services/types';
import { UserProfileType } from 'app/types';

export type ChatRoomPropsType = NativeStackScreenProps<
  ChatStackParamList,
  'chatRoom'
>;

export type ChatRoomMessagePropsType = {
  chatMessage: ChatMessageType;
  profile: UserProfileType;
  isMyMessage: Boolean;
};

export type ChatRoomSectionPropsType = {
  title: string;
  data: ChatMessageType[];
};
