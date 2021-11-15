import { HttpCode } from "./HttpCodes";

/**
 * SuccessResponseEvent
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export abstract class SuccessResponseEvent<T> {
  private readonly message: string;
  private readonly data: T;
  constructor(msg: string, data: T) {
    this.message = msg;
    this.data = data;
  }

  public get shortMessage(): string {
    return this.message;
  }

  public get value(): T {
    return this.data;
  }
}
/**
 * SuccessHttpResponse
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export abstract class SuccessHttpResponse<T> extends SuccessResponseEvent<T> {
  private readonly _httpCode: HttpCode;
  private _requestId: string | null = null;
  constructor(msg: string, data: T, httpCode: HttpCode) {
    super(msg, data);
    this._httpCode = httpCode;
  }

  public get code(): number {
    return this._httpCode.code;
  }

  public get httpCode(): HttpCode {
    return this._httpCode;
  }

  public set requestId(id: string | null) {
    this._requestId = id;
  }

  public get requestId(): string | null {
    return this._requestId;
  }
}
