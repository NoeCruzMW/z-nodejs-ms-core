import { ValueObject } from "../../../domain/entities/Values";
import { InvalidNeoIdError } from "./exceptions/InvalidNeoIdentifier";

/**
 * Means a neo4j identifier
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface NeoIdProps {
  value: number;
}

/**
 * Value Object for Neo4j identifiers
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class NeoId extends ValueObject<NeoIdProps> {
  static invalidMsg(param: string): string {
    return `The parameter ${param} does not match with expected value`;
  }
  public readonly value: number;
  private constructor(props: NeoIdProps) {
    super(props);
    this.value = props.value;
  }

  public static create(value: string | number, extraErrorMsg?: string): NeoId {
    const _value = Number(value);
    if (value == null || value == "" || isNaN(_value))
      throw new InvalidNeoIdError(
        "Invalid value provided for NeoId",
        extraErrorMsg
      );
    if (_value <= 0) {
      const error = new InvalidNeoIdError(
        "Invalid value provided for NeoId, value is less than 0.",
        extraErrorMsg
      );
      error.addDetail("The value cannot be less than 0.");
      throw error;
    }
    return new NeoId({ value: _value });
  }
}
