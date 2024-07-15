import EncryptedStorage from 'react-native-encrypted-storage';

export const setSecureStorageItem = async (key: string, item: unknown) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('setSecureStorageItem Error', error);
  }
};

export const getSecureStorageItem = async (key: string) => {
  try {
    const result = await EncryptedStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
  } catch (error) {
    console.error('getSecureStorageItem Error', error);
  }
};

export const removeSecureStorageItem = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error('removeSecureStorageItem Error', error);
  }
};

export const clearSecureStorageItems = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.error('clearSecureStorageItems Error', error);
  }
};
