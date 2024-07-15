import { UserProfileType } from 'app/types';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export type ChatListItemPropsType = {
  profile: UserProfileType;
  onPress: (profile: UserProfileType) => void;
  unread: number;
  onDeleteChat: (id: string, index: number) => void;
  index: number;
  setRef: (ref: Swipeable | null, index: number) => void;
  onSwipeableOpen: (index: number) => void;
};
