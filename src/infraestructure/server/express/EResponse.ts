import { Request, Response } from "express";
import { zL } from "../..";
import { HttpCodes, SuccessHttpResponse, ZHttpError } from "../../../domain";

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
  try {
    zL.info(`Aws requesId: ${request.apiGateway.event}`);
  } catch (error) {}
  response?.status(successEvent.code).json({
    message:
      successEvent.shortMessage && successEvent.shortMessage != ""
        ? successEvent.shortMessage
        : successEvent.httpCode.description,
    requestId: "xxx-xxx-xxx-xx",
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
  try {
    zL.info(`Aws requesId: ${JSON.stringify(request.apiGateway.event)}`);
  } catch (error) {}
  if (error instanceof ZHttpError) {
    zL.error(error);
    const code = error.httpCode;
    response?.status(code.code).json({
      message: code.message,
      description: code.description,
      requestId: "xxx-xxx-xxx-xx",
      details: error.errorDetails,
    });
  } else {
    const code = HttpCodes.INTERNAL_SERVER_ERROR;
    zL.fatal(error);
    response?.status(code.code).json({
      message: code.message,
      description: code.description,
      requestId: "xxx-xxx-xxx-xx",
      details: null,
    });
  }
};
