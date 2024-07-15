import { api } from './api';
import { GEO_URL } from 'app/constants/config';
import { AxiosResponse } from 'axios';
import {
  GeoDataResponseType,
  GeoPositionsAroundRequestType,
  GeoPositionsAroundResponseType,
  SendMyGeoPositionRequestType,
} from './types';

export class GeoService {
  static sendMyGeoPosition = async (
    data: SendMyGeoPositionRequestType,
  ): Promise<AxiosResponse<{
    response: { 'GeoObject[]': GeoDataResponseType[] };
  }> | void> => {
    return api.post(GEO_URL + 'api/v3/geo/object', null, { params: data });
  };

  static getUserGeoPositionAround = async (
    query: GeoPositionsAroundRequestType,
  ): Promise<AxiosResponse<GeoPositionsAroundResponseType>> => {
    return api.get(GEO_URL + 'api/v3/geo/around', { params: query });
  };
}
