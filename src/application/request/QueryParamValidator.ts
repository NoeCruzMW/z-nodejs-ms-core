import { BadRequest } from "../../domain";
/**
 * Verify if contains params or keys
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export const containsParams = (queryParams: any, ...params: string[]) => {
  params.forEach((p) => {
    if (!(p in queryParams)) {
      const common = `The parameter ${p} its required.`;
      throw new BadRequest(common, [common]);
    }
  });
};
