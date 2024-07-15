import { api } from './api';
import { AUTH_URL } from 'app/constants/config';
import { AxiosResponse } from 'axios';
import { PhoneConfirmationRequestType } from './types';

export class AuthService {
  static phoneRequest = async (
    phone: string,
  ): Promise<AxiosResponse<any> | void> => {
    return api.get(AUTH_URL + 'api/v1/auth/phone/request', {
      params: { phone },
    });
  };

  static phoneConfirmation = async (data: PhoneConfirmationRequestType) => {
    return api.get(AUTH_URL + 'api/v1/auth/phone/confirm', { params: data });
  };

  static refreshToken = async (refreshToken: string) => {
    return api.get(AUTH_URL + `api/v1/auth/token/refresh/${refreshToken}`);
  };

  static setBlockStatus = async ({
    objectId,
    action,
  }: {
    objectId: string;
    action: string;
  }) => {
    return api.post(AUTH_URL + `api/v1/ban/${objectId}/${action}`);
  };
}
