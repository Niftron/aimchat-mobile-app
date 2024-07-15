import { AxiosResponse } from 'axios';
import { api } from './api';
import { ListOfProfilesRequestType, ListOfProfilesResponseType } from './types';
import { UserProfileType } from 'app/types';
import { BASE_URL } from 'app/constants/config';

export class ProfileService {
  static getProfile = async (): Promise<
    AxiosResponse<{ response: { Profile: UserProfileType } }, void>
  > => {
    return api.get(BASE_URL + 'api/v2/profile/get');
  };

  static getListOfProfiles = async ({
    offset = 0,
    limit = 20,
    userIDs,
  }: ListOfProfilesRequestType): Promise<
    AxiosResponse<ListOfProfilesResponseType>
  > => {
    const formData = new FormData();

    userIDs.forEach((id, i) => {
      const name = `ids[${i}]`;
      formData.append(name, id);
    });

    return api.post(
      BASE_URL + `api/v1/profile/list/${limit}/${offset}`,
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
  };

  static updateProfile = async (profile: UserProfileType) => {
    const data = {
      username: profile.user_name,
      gender: profile.gender,
      job: profile.job,
      quote: profile.quote,
      summary: profile.summary,
      email: profile.email,
      email_access: profile.email_private,
      company: profile.company,
      company_access: profile.company_private,
      education: profile.education,
      education_access: profile.education_private,
      phone_access: profile.phone_private,
      phone: profile.phone,
      avatar: profile?.avatar?.did,
    };

    return api.post(BASE_URL + 'api/v1/profile/update', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  static updateAvatar = async (
    avatarId: string,
  ): Promise<AxiosResponse<{ response: { Profile: UserProfileType } }>> => {
    return api.post(BASE_URL + `api/v1/profile/avatar/${avatarId}`);
  };

  static deleteAccount = async (): Promise<void> => {
    return api.delete(BASE_URL + 'api/v1/profile/delete');
  };
}
