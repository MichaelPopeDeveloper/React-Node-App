import * as jwt from 'jsonwebtoken';
const secret = 'mySecret';

export const signToken = (data: object) => {
  const token = jwt.sign(data, secret, { expiresIn: '1h' });
  return token;
};

export const decodeToken = (token: any) => {
  const decodedToken = jwt.verify(token, secret);
  return decodedToken;
};
