import { HttpCodes } from "../..";
import { ZHttpError } from "../ZError";

export class ResourceNotFound extends ZHttpError {
  constructor(msg: string, detail?: string) {
    super(msg, HttpCodes.NOT_FOUND);
    if (detail) {
      this.addDetail(detail);
    }
  }
}

export class BadRequest extends ZHttpError {
  constructor(msg: string, detail?: string[]) {
    super(msg, HttpCodes.BAD_REQUEST);
    if (detail) {
      detail.forEach((d) => this.addDetail(d));
    }
  }
}

export class Forbidden extends ZHttpError {
  constructor(msg: string, detail?: string[]) {
    super(msg, HttpCodes.FORBIDDEN);
    if (detail) {
      detail.forEach((d) => this.addDetail(d));
    }
  }
}
