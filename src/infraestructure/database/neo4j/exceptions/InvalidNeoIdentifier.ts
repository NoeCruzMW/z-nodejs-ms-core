import { HttpCodes, ZHttpError } from "../../../../domain";

export class InvalidNeoIdError extends ZHttpError {
  constructor(msg: string, extraMsg?: string) {
    super(msg, HttpCodes.BAD_REQUEST);
    if (extraMsg) {
      this.addDetail(extraMsg);
    }
    this.addDetail("The ID provided does not match the expected value or format.");
    this.addDetail("Identifier should be match with: [0-9]+");
  }
}
