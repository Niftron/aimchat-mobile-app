import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
const CACHE_BASE_PATH = RNFS.CachesDirectoryPath + '/cachedImage-';

type cachedImageProps = {
  id: string;
  uri: string;
};

let idsInProcess: String[] = [];

export async function getImageByIdAndUri({
  id,
  uri,
}: cachedImageProps): Promise<string | null> {
  const isExist = await RNFS.exists(getImagePath(id));
  if (isExist) {
    //found cached, return
    return getImagePath(id);
  } else {
    const isProxyExist = await RNFS.exists(getImagePathForLoading(id));
    if (isProxyExist) {
      //still loading
      return null;
    }
    const isImageInvalid = await RNFS.exists(getImagePathForInvalid(id));
    if (isImageInvalid) {
      //file is invalid, ignore
      return null;
    }
    //download
    return await downloadImage({ id, uri });
  }
}

async function downloadImage({
  id,
  uri,
}: cachedImageProps): Promise<string | null> {
  try {
    if (idsInProcess.indexOf(id) > -1) {
      return await raceFound(id);
    }
    idsInProcess.push(id);
    const result = await RNFS.downloadFile({
      fromUrl: uri,
      toFile: getImagePathForLoading(id),
    }).promise;

    if (+result.statusCode >= 200 && +result.statusCode < 300) {
      if (!(await RNFS.exists(getImagePathForLoading(id)))) {
        return await raceFound(id);
      }
      await RNFS.moveFile(getImagePathForLoading(id), getImagePath(id));
      removeFromProcessing(id);
      return getImagePath(id);
    } else {
      await RNFS.writeFile(getImagePathForInvalid(id), '');
      removeFromProcessing(id);
      return null;
    }
  } catch (err) {
    console.error('error while downloading image to cache', err);
    safeDelete(getImagePathForLoading(id));
    safeDelete(getImagePath(id));
    removeFromProcessing(id);
    return null;
  }
}

async function raceFound(id: string): Promise<string | null> {
  // some components trying to download same picture
  // trying again to retrieve the image after some time that was downloaded by previous component
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        removeFromProcessing(id);
        const isExist = await RNFS.exists(getImagePath(id));
        if (isExist) {
          return resolve(getImagePath(id));
        }
        return resolve(null);
      } catch (err) {
        return reject(err);
      }
    }, 5000);
  });
}

function removeFromProcessing(id: string) {
  if (idsInProcess.indexOf(id) > -1) {
    idsInProcess.splice(idsInProcess.indexOf(id), 1);
  }
}

function getImagePath(id: string) {
  return `${Platform.OS === 'android' ? 'file://' : ''}${CACHE_BASE_PATH}${id}`;
}

function getImagePathForLoading(id: string) {
  return `${
    Platform.OS === 'android' ? 'file://' : ''
  }${CACHE_BASE_PATH}loading-${id}`;
}

function getImagePathForInvalid(id: string) {
  return `${
    Platform.OS === 'android' ? 'file://' : ''
  }${CACHE_BASE_PATH}invalid-${id}`;
}

export function clearCache() {
  RNFS.unlink(RNFS.CachesDirectoryPath);
}

async function safeDelete(path: string) {
  const isExist = await RNFS.exists(path);
  if (isExist) {
    RNFS.unlink(path);
  }
}
