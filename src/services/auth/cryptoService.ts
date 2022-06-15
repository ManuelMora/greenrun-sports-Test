import bcrypt from 'bcrypt';

export default class BcryptService {
  public static async generateHash(text: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(text, salt);
      return hash;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public static async checkHash(hash: string, text: string): Promise<boolean> {
    try {
      return await bcrypt.compare(text, hash);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
