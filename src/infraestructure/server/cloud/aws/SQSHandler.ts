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

  proccess(event: SQSEvent): any {
    try {
      this.onEvent && this.onEvent(event);
      this.onRecords && this.onRecords(event.Records);
      if (this.onRecord) {
        event.Records.forEach((r) => {
          this.onRecord!(r);
        });
      }
    } catch (error) {
      zL.fatal(error);
    }
    return "OK";
  }

  static proxy(app: SQSApp, event: SQSEvent): any {
    if (app.onEvent == null && app.onRecord == null && app.OnRecords == null)
      zL.warn(
        "SQS records callbacks handlers not found, at least one must be registered!"
      );
    return app.proccess(event);
  }
}
