import * as jwt from 'jsonwebtoken';
const secret = 'mySecret';

export const signToken = (data: object) => {
  const token = jwt.sign(data, secret, { expiresIn: '1h' });
  return token;
};

export const decodeToken = (token: any): any => {
  const decodedToken = jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return { isValid: false, msg: 'token has expired', exp: 0 };
    }
    return decodedToken;
  });
  return decodedToken;
};
