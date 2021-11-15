import { Neo } from "..";
import { AuthFilter, ZRequest } from "../../../../application/authorizer";
import { ResourceNotFound } from "../../../../domain/errors/generics/InvalidNeoIdentifier";

/**
 * FilterOptions
 *
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface FilterOptions {
  verifyTarget?: boolean;
  verifyRequested?: boolean;
  labelTarget?: string;
  labelRequested?: string;
}

/**
 * ExistResourceFilter
 *
 * Check if resources of request exist
 *
 * Who request and target request
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class ExistResourceFilter implements AuthFilter {
  options: FilterOptions;
  constructor(options: FilterOptions) {
    this.options = options;
  }

  private async _verify(label: string, data: number | string) {
    const result = await Neo.runSQ<any>(
      `match (u: ${label}) where id(u) = ${data} return u`
    );

    if (result.length == 0) {
      const commonMessage = `The ${label} with identifier (id:${data}) provided not found.`;
      throw new ResourceNotFound(commonMessage, commonMessage);
    }
  }

  async verify(request: ZRequest): Promise<boolean> {
    if (this.options.verifyTarget) {
      await this._verify(this.options.labelTarget!, request.searchTarget);
    }

    if (this.options.verifyRequested) {
      await this._verify(
        this.options.labelRequested!,
        request.whoSearchRequested
      );
    }

    return true;
  }
}
