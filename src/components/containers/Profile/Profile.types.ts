import { ResourceType } from 'app/services/types';
import { UserProfileType } from 'app/types';

export type ProfileProps = {
  profile: UserProfileType;
  gallery?: ResourceType[];
  galleryLoading?: boolean;
  BottomButton?: React.ComponentType<any>;
  EditAvatarButton?: React.ComponentType<any>;
};
