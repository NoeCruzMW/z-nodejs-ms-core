/**
 * Evaluates the provided value, if it is null or undefined it returns the default value
 * @param value value to evaluate
 * @param defaultValue default value if the value is null or undefined
 * @returns T value
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export const getOr = <T>(value: any, defaultValue: T): T | null => {
  if (!value || value === undefined || value === null) return defaultValue;
  return value;
};
/**
 * Evaluates the provided value, if it is null or undefined it returns null
 * @param value value to evaluate
 * @returns T value
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export const getOrNull = <T>(value: T | any): T | null => {
  if (!value || value === undefined || value === null) return null;
  return value;
};
