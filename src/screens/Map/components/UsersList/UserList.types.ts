import { GeoDataResponseType } from 'app/services/types';
import { UserProfileType } from 'app/types';

export type UserListProps = {
  users: {
    profile: UserProfileType;
    coords: GeoDataResponseType;
  }[];
};
