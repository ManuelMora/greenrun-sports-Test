import debugLib from 'debug';
import jwt from 'jsonwebtoken';
import config from '../../config';

const debug = debugLib('carwash:JwtService');

export default class JwtService {
  public static async signedToken(
    entity: object,
    expiredTime: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(entity, config.jwtSecret, {
          expiresIn: expiredTime,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static async validateToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const user = jwt.verify(token, config.jwtSecret);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}
