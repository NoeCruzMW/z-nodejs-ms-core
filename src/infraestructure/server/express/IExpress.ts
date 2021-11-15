import { Request, Response, Express } from "express";

/**
 *  Express Route
 */
interface ERoute {
  verb?: "POST" | "PUT" | "DELETE" | "GET" | "PATCH";
  path: string;
  handler: (request: Request, response: Response) => Promise<void>;
}

/**
 * Express Middleware
 */
interface EMiddleware {
  name: string;
  enabled: boolean;
  default?: boolean;
  consumer: (e: Express) => void;
}

export { ERoute, EMiddleware };
