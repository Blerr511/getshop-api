import { JwtService } from '@nestjs/jwt';

export interface ITokenPayload {
  exp: number;
  iat: number;
}

export abstract class JwtTokenService<T extends ITokenPayload> {
  /**
   * In seconds
   */
  abstract expirationTime: number;
  abstract secret: string;
  abstract jwtService: JwtService;

  async getToken(payload: Omit<T, 'exp' | 'iat'>): Promise<string> {
    const result = await this.jwtService.signAsync(
      { ...payload },
      {
        secret: this.secret,
        expiresIn: `${this.expirationTime}s`,
      },
    );

    return result;
  }

  getTokenSync(payload: Omit<T, 'exp' | 'iat'>): string {
    const result = this.jwtService.sign(
      { ...payload },
      {
        secret: this.secret,
        expiresIn: `${this.expirationTime}s`,
      },
    );

    return result;
  }

  async decode(token: string): Promise<T> {
    const result = await this.jwtService.verifyAsync(token, {
      secret: this.secret,
    });

    return result as T;
  }

  public getExpiry(token: string): number {
    const decoded = this.jwtService.verify<T>(token, {
      secret: this.secret,
    });
    return decoded.exp;
  }
}
