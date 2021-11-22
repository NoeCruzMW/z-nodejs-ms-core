import { HttpCodes, SuccessHttpResponse } from "..";
/**
 * ZSuccessResponse
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class ZSuccessResponse<T> extends SuccessHttpResponse<T> {
  private constructor(msg: string, data: T) {
    super(msg, data, HttpCodes.SUCCESS);
  }

  public static create<T>(response: T): ZSuccessResponse<T> {
    return new ZSuccessResponse("", response);
  }

  public static createWithCustom<T>(
    response: T,
    customMessage: string
  ): ZSuccessResponse<T> {
    return new ZSuccessResponse(customMessage, response);
  }
}
