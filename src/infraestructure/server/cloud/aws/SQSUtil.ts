import { zL } from "../../..";

const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";

/**
 * SQS Parameter
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export interface SQSParams {
  DelaySeconds?: number;
  MessageAttributes?: any;
  MessageBody: string;
  QueueUrl: string;
}
/**
 * Helper class for AWS Sqs
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export class SQSUtil {
  static sqsClient = new AWS.SQS({ apiVersion: "2012-11-05" });
  constructor() {}

  public static sendWith = async (params: SQSParams, region?: string) => {
    zL.info(`SQS Params: ${params}`);
    try {
      if (region && region !== undefined && region !== null) {
        AWS.config.region = region;
      }
    } catch (error) {
      zL.fatal("Error when try configure region: ", error);
    }
    try {
      let sqs = new AWS.SQS();
      let sendSqsMessage = await sqs.sendMessage(params).promise();
      console.log("SQS message id:\n", sendSqsMessage.MessageId);
      return sendSqsMessage;
    } catch (e) {
      console.log("Error to send SQS", e);
    }
    return null;
  };

  /**
   * Helper function to send messages to aws sqs, handling any possible error.
   *
   * if an error occurred the result is null other wise
   * the result data.
   *
   * @param params aws sqs parameters
   * @returns result data
   */
  static async trySend(params: SQSParams) {
    try {
      zL.info(
        `Before to send message to: ${params.QueueUrl} with: ${params.MessageBody}`
      );
      const result = await SQSUtil.send(params);
      zL.info(`Message id: ${result.MessageId}`);
      return result;
    } catch (error) {
      zL.fatal("An error occurred when try send message to queue.");
      zL.fatal(error);
    }
    return null;
  }
  /**
   * Helper function to send message to aws sqs
   * @param params sqs parameters
   * @returns Promise
   */
  static async send(params: SQSParams): Promise<any> {
    return new Promise((res: any, rej: any) => {
      SQSUtil.sqsClient.sendMessage(params, function (err: any, data: any) {
        if (err) {
          zL.fatal(
            `An error occurred when try to send message to sqs with params: ${params}`
          );
          zL.fatal(err);
          rej(err);
        } else {
          zL.info(
            `The message sent successfully to sqs. MessageId: ${data.MessageId}`
          );
          res(data);
        }
      });
    });
  }
}
