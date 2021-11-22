import { HttpCodes, SuccessHttpResponse } from "..";
/**
 * ZCreatedResponse
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class ZCreatedResponse<T> extends SuccessHttpResponse<T> {
  private constructor(msg: string, data: T) {
    super(msg, data, HttpCodes.CREATED);
  }

  public static create<T>(response: T): ZCreatedResponse<T> {
    return new ZCreatedResponse("", response);
  }

  public static createWithCustom<T>(
    response: T,
    customMessage: string
  ): ZCreatedResponse<T> {
    return new ZCreatedResponse(customMessage, response);
  }
}
