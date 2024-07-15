import { api } from './api';
import { RESOURCE_URL } from 'app/constants/config';
import { AxiosResponse } from 'axios';
import { GetGalleryPropsType, GetGalleryResponseType } from './types';
import { Asset } from 'react-native-image-picker';

export class ResourceService {
  static getGalleryByUser = async ({
    userId,
    limit = 15,
    offset = 0,
  }: GetGalleryPropsType): Promise<AxiosResponse<GetGalleryResponseType>> => {
    return api.get(
      `${RESOURCE_URL}api/v1/gallery/get/${userId}?offset=${offset}&limit=${limit}`,
    );
  };

  static uploadImages = async (images: Asset[]) => {
    const formData = new FormData();
    if (!images?.length) {
      return;
    }

    for (let i = 0; i < images.length; i++) {
      const name = `file[${i}]`;
      formData.append(name, {
        uri: images[i].uri,
        name: images[i].fileName,
        type: images[i].type,
      });
    }

    return api.post(RESOURCE_URL + 'api/v1/gallery/upload', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  static deleteImages = async (images: string[]) => {
    if (!images?.length) {
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      const name = `images[${i}]`;
      formData.append(name, images[i]);
    }
    return api.post(RESOURCE_URL + 'api/v1/gallery/delete/group', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };
}
