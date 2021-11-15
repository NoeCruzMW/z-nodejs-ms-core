import { Request, Response } from "express";
import { zL } from "../..";
import { HttpCodes, SuccessHttpResponse, ZHttpError } from "../../../domain";

const extractRequestId = (request: any) => {
  let requestId = "-";
  try {
    requestId = request.apiGateway.context.awsRequestId;
  } catch (error) {}
  return requestId;
};

/**
 * Build success response
 * @param request Express request
 * @param response Express response
 * @param successEvent Success http response
 * @author @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export const BSuccess = (
  request: Request | any,
  response: Response,
  successEvent: SuccessHttpResponse<any>
) => {
  response?.status(successEvent.code).json({
    message:
      successEvent.shortMessage && successEvent.shortMessage != ""
        ? successEvent.shortMessage
        : successEvent.httpCode.description,
    requestId: extractRequestId(request),
    result: successEvent.value,
  });
};

/**
 * Build error responses
 * @param request Express request
 * @param response Express response
 * @param error Error instance
 * @author @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export const BError = (
  request: Request | any,
  response: Response,
  error: any
) => {
  let requestId = extractRequestId(request);
  if (error instanceof ZHttpError) {
    zL.error(error);
    const code = error.httpCode;
    response?.status(code.code).json({
      message: code.message,
      description: code.description,
      requestId: requestId,
      details: error.errorDetails,
    });
  } else {
    const code = HttpCodes.INTERNAL_SERVER_ERROR;
    zL.fatal(error);
    response?.status(code.code).json({
      message: code.message,
      description: code.description,
      requestId: requestId,
      details: null,
    });
  }
};
