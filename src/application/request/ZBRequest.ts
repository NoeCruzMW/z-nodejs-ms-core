import { BadRequest } from "../../domain";
import { getOrNull } from "../../shared";
/**
 * ZBRequest
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export abstract class ZBRequest {
  public toJson(): {} {
    return JSON.parse(JSON.stringify(this));
  }

  public static validate(input: any): void {
    if (getOrNull(input) === null || input === {}) {
      const commonMessage = "Request can't be null or empty";
      throw new BadRequest(commonMessage, [commonMessage]);
    }
  }

  public static of<T>(ctor: { new (x: any): T }, data: any): T {
    this.validate(data);
    return new ctor(data);
  }
}
