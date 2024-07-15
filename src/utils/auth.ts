import jwtDecode from 'jwt-decode';
import CryptoJS from 'crypto-js';
const randominator = require('randominator'); //Couldnt retrieve types via import statement

export const generateToken = async () => {
  const token = await randominator.generateToken({
    length: 25,
  });

  return token;
};

export const getSaltFromToken = (token: string) => {
  const decode = jwtDecode(token) as { salt: string };

  return decode.salt;
};

export const getSHA1FromString = (str: string) => {
  return CryptoJS.SHA1(str).toString();
};

export const getRefreshToken = (tokens: { salt: string; token: string }) => {
  const refresh = getSHA1FromString(
    tokens.salt + getSaltFromToken(tokens.token),
  );

  return refresh;
};
