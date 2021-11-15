import { BadRequest } from "../../domain";
import { NeoId } from "../../infraestructure";

/**
 * ZPropValidations
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface ZPropOptions {
  notNull?: boolean;
  number?: boolean;
  neoID?: boolean;
  only?: any[];
}

/**
 * ZProp
 *
 *  Use for valide http requests
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export function ZProp(options?: ZPropOptions) {
  return function (target: Object, propertyKey: string) {
    let value: string;
    const getter = function () {
      return value;
    };
    const setter = function (newVal: string) {
      if (options?.notNull) {
        if (
          !newVal ||
          newVal === null ||
          newVal === undefined ||
          newVal.length == 0
        ) {
          const common = `The field '${propertyKey}' its required.`;
          throw new BadRequest(common, [common]);
        }
      }
      if (options?.number) {
        const _value = Number(value);
        if (newVal == null || newVal == "" || isNaN(_value)) {
          const common = `The field ${propertyKey} should be numeric.`;
          throw new BadRequest(common, [common]);
        }
      }
      if (options?.neoID) {
        NeoId.create(
          newVal,
          `The ${propertyKey} field contains an invalid value`
        );
      }

      if (options?.only && options.only.length != 0) {
        if (options?.only.indexOf(newVal) < 0) {
          const common = `The value of the ${propertyKey} field does not match the expected value.`;
          throw new BadRequest(common, [
            common,
            `Expected values: ${options.only}`,
          ]);
        }
      }
      value = newVal;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
