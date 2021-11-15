/**
 * HttpCode
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface HttpCode {
  code: number;
  description: string;
  message: string;
}

/**
 * HttpCodes for build http responses
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export const HttpCodes = {
  SUCCESS: {
    code: 200,
    description: "SUCCEEDED",
    message: "The request has succeeded.",
  },
  CREATED: {
    code: 201,
    description: "CREATED",
    message:
      "The request has been fulfilled and resulted in a new resource being created.",
  },
  ACCEPTED: {
    code: 202,
    description: "ACCEPTED",
    message:
      "The request has been accepted for processing, but the processing has not been completed.",
  },
  NO_CONTENT: {
    code: 204,
    description: "NO CONTENT",
    message:
      "The request has been completed successfully but your response has no content, although the headers can be useful.",
  },
  PARTIAL_CONTENT: {
    code: 206,
    description: "PARTIAL CONTENT",
    message: "Partial content accepeted.",
  },
  BAD_REQUEST: {
    code: 400,
    description: "BAD REQUEST",
    message:
      "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.",
  },
  UNAUTHORIZED: {
    code: 401,
    description: "UNAUTHORIZED",
    message: "The request requires user authentication.",
  },
  FORBIDDEN: {
    code: 403,
    description: "FORBIDDEN",
    message:
      "The server understood the request, but is refusing to fulfill it.",
  },
  NOT_FOUND: {
    code: 404,
    description: "NOT FOUND",
    message:
      "The server has not found anything matching the Request-URI or resource requested.",
  },
  NOT_ALLOWED: {
    code: 405,
    description: "METHOD NOT ALLOWED",
    message:
      "The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.",
  },
  CONTENT_NOT_ACCEPTABLE: {
    code: 406,
    description: "CONTENT NOT ACCEPTABLE",
    message:
      "The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request.",
  },
  REQUEST_TIMEOUT: {
    code: 408,
    description: "REQUEST TIMEOUT",
    message: "Time Out.",
  },
  UNSUPPORTED_MEDIA_TYPE: {
    code: 415,
    description: "UNSUPPORTED MEDIA TYPE",
    message:
      "The multimedia format of the requested data is not supported by the server, therefore the server rejects the request.",
  },
  CONFLICT: {
    code: 409,
    description: "CONFLICT",
    message: "The server found conflict with request supplied.",
  },
  UNPROCESSABLE: {
    code: 422,
    description: "UNPROCESSABLE ENTITY",
    message: "The process could not be completed due to a semantics error.",
  },
  LOCKED: {
    code: 423,
    description: "LOCKED",
    message: "The source or destination resource of a method is locked.",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    description: "INTERNAL SERVER ERROR",
    message:
      "The server encountered an unexpected condition which prevented it from fulfilling the request.",
  },
  NOT_IMPLEMENTED: {
    code: 501,
    description: "NOT IMPLEMENTED",
    message:
      "The server does not support the functionality required to fulfill the request.",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    description: "SERVICE UNAVAILABLE",
    message:
      "The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.",
  },
  LOOP_DETECTED: {
    code: 508,
    description: "LOOP DETECTED",
    message:
      "The server encountered an infinite loop while processing the request.",
  },
};
