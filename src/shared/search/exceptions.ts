import { HttpCodes, ZHttpError } from "../../domain";
/**
 * InvalidKeyPagination
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class InvalidKeyPagination extends ZHttpError {
  constructor(msg: string) {
    super(
      "The next page key provided not match with format expected.",
      HttpCodes.BAD_REQUEST
    );
    this.addDetail(
      "The next page key provided not match with format expected."
    );
    this.addDetail(msg);
  }
}
