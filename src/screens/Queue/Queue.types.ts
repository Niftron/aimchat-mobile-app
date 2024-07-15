import { UserProfileType } from 'app/types';

export type QueuePendingRequestPropsType = {
  item: UserProfileType;
  rejectUser: (profile: UserProfileType) => void;
  acceptUser: (profile: UserProfileType) => void;
  openUserProfile: (profile: UserProfileType) => void;
};

export type QueueFriendPropsType = {
  profile: UserProfileType;
  openUserProfile: (profile: UserProfileType) => void;
};
