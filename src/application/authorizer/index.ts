import { Pagination, SearchQuery } from "../../shared";
/**
 * ZRequest
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class ZRequest extends SearchQuery {
  constructor(
    pageData: Pagination,
    searchQuery: string,
    whoSearchRequestedId: string | number,
    targetSearchId: string | number
  ) {
    super(pageData, searchQuery, whoSearchRequestedId, targetSearchId);
  }

  static from(
    whoSearchRequestedId: string | number,
    targetSearchId: string | number
  ): ZRequest {
    return new ZRequest(null!, "", whoSearchRequestedId, targetSearchId);
  }
}

/**
 * AuthFilter
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface AuthFilter {
  verify(request: ZRequest): Promise<boolean>;
}

/**
 * AuthManager
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface AuthManager {
  verify(request: ZRequest): Promise<boolean>;
  addFilter(filter: AuthFilter): void;
  addFilters(filters: AuthFilter[]): void;
}

/**
 * GenericAuthManager
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class GenericAuthManager implements AuthManager {
  filters: AuthFilter[];
  constructor(filters: AuthFilter[]) {
    this.filters = filters;
  }
  async verify(request: ZRequest): Promise<boolean> {
    for await (const filter of this.filters) {
      await filter.verify(request);
    }
    return true;
  }
  addFilter(filter: AuthFilter): void {
    this.filters.push(filter);
  }
  addFilters(filters: AuthFilter[]): void {
    this.filters = this.filters.concat(filters);
  }
}
