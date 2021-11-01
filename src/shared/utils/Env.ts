/**
 * Retrieve a value of the environment variable with key provided
 * @param key value of key
 * @returns string value or undefined if the key does not exist
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export const getEnv = (key: string): string | undefined => {
  return process.env[key];
};

/**
 * Retrieve a value of the environment variable with key provided
 * @param key value of key
 * @returns string value
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 * @throws Exception if the variable does not exist
 */
export const getEnvOrThrow = (key: string): string => {
  const value = process.env[key];
  if (value === undefined)
    throw `The variable with key: ${key} does not exist!`;
  return value;
};
