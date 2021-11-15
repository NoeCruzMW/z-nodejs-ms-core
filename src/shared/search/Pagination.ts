import { InvalidKeyPagination } from "./exceptions";
import { Buffer } from "buffer";
import { zL } from "../../infraestructure";
import { ZPage } from "../../domain";
/**
 * Pagination
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class Pagination {
  public static defaultSize: number = 20;
  public size: number;
  public lowRange: number | string;
  public highRange: number | string;
  private constructor(
    size: number,
    low: number | string,
    high: number | string
  ) {
    this.size = size;
    this.lowRange = low;
    this.highRange = high;
  }
  /**
   * Return low range plus one
   */
  public get sizePlus(): number {
    return Number(this.size) + 1;
  }

  public get nextLow(): number {
    return Number(this.lowRange) + this.size;
  }

  public get nextHigh(): number {
    return Number(this.highRange) + this.size;
  }

  public get nextKey(): string {
    this.lowRange = this.highRange;
    this.highRange = this.size + Number(this.highRange);
    return Buffer.from(
      `${this.lowRange}-${this.highRange}-${this.size}`
    ).toString("base64");
  }

  public static initial(size?: number): Pagination {
    const _size = size ? size : Pagination.defaultSize;
    return new Pagination(_size, 0, _size);
  }

  public static fromRawKey(key: string): Pagination {
    /**
     *  low-high-size
     */
    if (key == null || key == undefined || !key)
      throw new InvalidKeyPagination("key pagination can not be null.");
    try {
      const keyData = Buffer.from(key, "base64").toString("ascii");
      const data = keyData.split("-");
      if (data.length >= 2) {
        const low = Number(data[0]);
        const high = Number(data[1]);
        let size = Pagination.defaultSize;
        if (data.length >= 3) {
          const _size = Number(data[2]);
          if (!isNaN(_size)) size = _size;
        }
        if (isNaN(low) || isNaN(high))
          throw new InvalidKeyPagination(
            "Failed when try to processing the next key, the key is malformed!"
          );

        return new Pagination(size, low, high);
      }
      throw new InvalidKeyPagination(
        "Failed when try to processing the next key, the key is incomplete!"
      );
    } catch (error) {
      zL.error(error);
      throw new InvalidKeyPagination(
        "Fail when try to processing the next key"
      );
    }
  }
}

/**
 * SearchQuery
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class SearchQuery {
  private pageData: Pagination;
  private searchQuery: string;
  private whoSearchRequestedId: string | number;
  private targetSearchId: string | number;
  constructor(
    pageData: Pagination,
    searchQuery: string,
    whoSearchRequestedId: string | number,
    targetSearchId: string | number
  ) {
    this.pageData = pageData;
    this.searchQuery = searchQuery;
    this.whoSearchRequestedId = whoSearchRequestedId;
    this.targetSearchId = targetSearchId;
  }

  public static of(
    pageData: Pagination,
    whoSearchRequestedId: string | number
  ): SearchQuery {
    return new SearchQuery(pageData, "", whoSearchRequestedId, whoSearchRequestedId);
  }

  public get pagination(): Pagination {
    return this.pageData;
  }

  public get query(): string {
    return this.searchQuery;
  }

  public get whoSearchRequested(): string | number {
    return this.whoSearchRequestedId;
  }

  public get searchTarget(): string | number {
    return this.targetSearchId;
  }
}

/**
 * ZPaginator
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class ZPaginator<T> {
  private data: T[];
  private page: Pagination;

  private constructor(data: T[], pageData: Pagination) {
    this.data = data;
    this.page = pageData;
  }
  /**
   * Create a new Paginator
   * @param data data
   * @param pageData page provided
   * @returns ZPaginator instance
   */
  static of<T>(data: T[], pageData: Pagination) {
    return new ZPaginator<T>(data, pageData);
  }
  /**
   *  Get data of current paginator
   */
  public get finalData(): T[] {
    if (this.data.length > this.page.size) {
      this.data = this.data.slice(0, this.page.size);
    }
    return this.data;
  }
  /**
   *
   */
  public get pageData(): ZPage {
    return {
      hasMore: this.data.length > this.page.size,
      next: this.page.nextKey,
    };
  }

  /**
   * Build object with data and page information
   * @param keyData key for data
   * @param keyPage key for page
   * @returns object with keys provided
   */
  public compact(keyData: string, keyPage: string): any {
    let obj: any = {};
    obj[keyPage] = this.pageData;
    if (this.data.length > this.page.size)
      this.data = this.data.slice(0, this.page.size);
    obj[keyData] = this.data;
    return obj;
  }
}
