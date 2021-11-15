import { zL } from "../../..";

const AWS = require("aws-sdk");

export interface SQSParams {
  DelaySeconds?: number;
  MessageAttributes?: any;
  MessageBody: string;
  QueueUrl: string;
}

export class SQSUtil {
  static sqsClient = new AWS.SQS({ apiVersion: "2012-11-05" });
  constructor() {}
  static async sendMessage(params: SQSParams): Promise<any> {
    return await SQSUtil.sqsClient.sendMessage(params);
  }

  static async sendMessageWith(params: SQSParams): Promise<any> {
    try {
      zL.info(
        `Before to send message to: ${params.QueueUrl} with: ${params.MessageBody}`
      );
      const result = await SQSUtil.sqsClient.sendMessage(params);
      zL.info(`Message id: ${result.MessageId}`);
      return result;
    } catch (error) {
      zL.fatal("An error occurred when try send message to queue.");
      zL.fatal(error);
    }
    return null;
  }
}
