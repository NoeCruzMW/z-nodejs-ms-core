import { BadRequest } from "../../domain";

export const containsParams = (queryParams: any, ...params: string[]) => {
  params.forEach((p) => {
    if (!(p in queryParams)) {
      const common = `The parameter ${p} its required.`;
      throw new BadRequest(common, [common]);
    }
  });
};
