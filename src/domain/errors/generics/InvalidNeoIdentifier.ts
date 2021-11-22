import { HttpCodes } from "../..";
import { ZHttpError } from "../ZError";

/**
 * ResourceNotFound
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class ResourceNotFound extends ZHttpError {
  constructor(msg: string, detail?: string) {
    super(msg, HttpCodes.NOT_FOUND);
    if (detail) {
      this.addDetail(detail);
    }
  }
}
/**
 * BadRequest
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class BadRequest extends ZHttpError {
  constructor(msg: string, detail?: string[]) {
    super(msg, HttpCodes.BAD_REQUEST);
    if (detail) {
      detail.forEach((d) => this.addDetail(d));
    }
  }
}
/**
 * Forbidden
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class Forbidden extends ZHttpError {
  constructor(msg: string, detail?: string[]) {
    super(msg, HttpCodes.FORBIDDEN);
    if (detail) {
      detail.forEach((d) => this.addDetail(d));
    }
  }
}
