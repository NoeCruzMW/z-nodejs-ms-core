import { zL } from "../../..";

/**
 * RecordAttribs
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface RecordAttribs {
  ApproximateReceiveCount: string;
  SentTimestamp: string;
  SenderId: string;
  ApproximateFirstReceiveTimestamp: string;
}
/**
 * SQSRecord
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface SQSRecord {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes: RecordAttribs;
  messageAttributes: any;
  md5OfBody: string;
  eventSource: string;
  eventSourceARN: string;
  awsRegion: string;
}
/**
 * SQSEvent
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export interface SQSEvent {
  Records: SQSRecord[];
}
/**
 * AWS SQS Hanlder
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export class SQSApp {
  onRecord: ((record: SQSRecord) => void) | null | undefined = null;
  onRecords: ((records: SQSRecord[]) => void) | null | undefined = null;
  onEvent: ((event: SQSEvent) => void) | null | undefined = null;
  constructor(initializer?: () => void) {
    initializer && initializer();
  }
  /**
   * If you want to receive only the body of the records.
   * @param onEvent
   */
  OnRecord(onRecord: ((event: SQSRecord) => void) | null | undefined) {
    this.onRecord = onRecord;
  }

  /**
   * Configure callback when sqs records received
   * @param onRecords callback
   */
  OnRecords(onRecords: ((records: SQSRecord[]) => void) | null | undefined) {
    this.onRecords = onRecords;
  }

  /**
   * Configure callback when an sqs event is received
   * @param onEvent callback
   */
  OnEvent(onEvent: ((event: SQSEvent) => void) | null | undefined) {
    this.onEvent = onEvent;
  }

  /**
   * Process the sqs event passed to callbacks configured.
   * Return an explicit string for avoid re enqueue.
   *
   * In futures version you can change this behavior. 🤗
   *
   * @param event SQS event
   * @returns result of process
   */
  async proccess(event: SQSEvent): Promise<any> {
    zL.info("Initializing processing...");
    try {
      this.onEvent && (await this.onEvent(event));
      this.onRecords && (await this.onRecords(event.Records));
      if (this.onRecord) {
        for (const record of event.Records) {
          try {
            await this.onRecord!(record);
          } catch (error) {
            zL.fatal(
              `An errror ocurred when try proccess the record: ${JSON.stringify(
                record
              )}`,
              error
            );
          }
        }
      }
    } catch (error) {
      zL.fatal(
        `An errror ocurred when try proccess the event: ${JSON.stringify(
          event
        )}`,
        error
      );
    }
    return "Processing completed!";
  }
  /**
   * Simulates the processing of an sqs event without running local containers
   * @param absFilePath absolute file with json sqs event
   */
  async test(absFilePath: string) {
    try {
      if (
        this.onEvent == null &&
        this.onRecord == null &&
        this.onRecords == null
      )
        zL.warn(
          "SQS records callbacks handlers not found, at least one must be registered!"
        );
      const fs = require("fs");
      const result = await this.proccess(
        JSON.parse(fs.readFileSync(absFilePath, "utf8"))
      );
      zL.info("Result: ", result);
    } catch (error) {
      zL.fatal(error);
    }
  }
  /**
   * Configure SQS Handler
   * @param app SQS Hanlder
   * @param event  SQS Event
   * @returns for now explicit string 😁
   */
  static async proxy(app: SQSApp, event: SQSEvent): Promise<any> {
    if (app.onEvent == null && app.onRecord == null && app.onRecords == null)
      zL.warn(
        "SQS records callbacks handlers not found, at least one must be registered!"
      );
    return await app.proccess(event);
  }
}
