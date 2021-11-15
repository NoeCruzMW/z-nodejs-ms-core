import { HttpCode } from "..";

/**
 * Common Error Class
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class ZError extends Error {
  private details: string[] = [];
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, ZError);
  }

  public get errorDetails(): string[] {
    return this.details;
  }

  public addDetail(msg: string) {
    this.details.push(msg);
  }
}
/**
 * Common Http Error Class
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class ZHttpError extends ZError {
  private _httpCode: HttpCode;
  constructor(message: string, httpCode: HttpCode) {
    super(message);
    this._httpCode = httpCode;
  }

  public get httpCode(): HttpCode {
    return this._httpCode;
  }
}
