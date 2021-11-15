import * as neo4j from "neo4j-driver";
import { Driver, Session } from "neo4j-driver-core";
import { zL } from "./../../logging";
import { NeoConnectionData } from "./NeoConnectionData";
const parser = require("parse-neo4j");
/**
 * Helper singleton class for manage operation with neo4j databases.
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class Neo {
  public static instance: Neo;
  private readerNode: Driver | null = null;
  private writerNode: Driver | null = null;
  private neoConnectionData: NeoConnectionData | null = null;

  private constructor() {}
  /**
   * Setup Connection data from environment variables value
   *
   * Shuld be set the next variables
   *
   * neoReaderUri: URI of reader node
   * neoWriterUri: URI of writer node
   * neoUser: User for authentication
   * newPassword: Password for authentication
   */
  public setupFromEnv() {
    this.setupConnection(
      process.env.neoReaderUri!,
      process.env.neoWriterUri!,
      process.env.neoUser!,
      process.env.neoPassword!
    );
  }
  /**
   *  Setup connection data
   * @param readerUri  Uri of reader node
   * @param writerUri  Uri of writer node
   * @param user User for autheticate
   * @param password  Password for autheticate
   */
  public setupConnection(
    readerUri: string,
    writerUri: string,
    user: string,
    password: string
  ) {
    this.neoConnectionData = NeoConnectionData.build(
      readerUri,
      writerUri,
      user,
      password
    );
  }
  /**
   * Setup connection data
   * @param data NeoConnectionData instance for setup connection data
   */
  public setupConnectionOf(data: NeoConnectionData) {
    this.neoConnectionData = data;
    this.verifyData();
  }

  /**
   * Builde neo4j driver for connect to cluster
   * @param uri Uri of database
   * @param user User for authentication
   * @param password Password for authentication
   * @returns Neo4j driver
   */
  private buildDriver(uri: string, user: string, password: string): Driver {
    return neo4j.driver(uri, neo4j.auth.basic(user, password), {
      encrypted: "ENCRYPTION_OFF",
    });
  }
  /**
   * Close neo4j drivers
   */
  public async closeDrivers(): Promise<void> {
    await this.readerNode?.close();
    await this.writerNode?.close();
    this.writerNode = null;
    this.readerNode = null;
  }
  /**
   * Verify that the provided connection data is valid
   */
  private verifyData() {
    if (!this.neoConnectionData?.isValid()) {
      throw "The connection data provided is invalid.";
    }
  }
  /**
   * Return the reader driver for apply transactions.
   * @returns Driver instance
   */
  public async getReader(): Promise<Driver> {
    if (!this.readerNode) {
      await this.verifyData();
      this.readerNode = this.buildDriver(
        this.neoConnectionData!.readerUri,
        this.neoConnectionData!.user,
        this.neoConnectionData!.password
      );
    }
    return this.readerNode;
  }
  /**
   * Return the reader driver for apply transactions.
   * @returns Driver instance
   */
  public async getWritter(): Promise<Driver> {
    if (!this.writerNode) {
      await this.verifyData();
      this.writerNode = this.buildDriver(
        this.neoConnectionData!.writerUri,
        this.neoConnectionData!.user,
        this.neoConnectionData!.password
      );
    }
    return this.writerNode;
  }

  public static getInstance(): Neo {
    if (!Neo.instance) {
      zL.info(`New instance of Neo created!!`);
      Neo.instance = new Neo();
    }
    return Neo.instance;
  }
  /**
   * Parse neo4j query result to JSON
   * @param data Transaction result data
   * @returns data with json format
   * @async
   */
  public async parse(data: any) {
    return await parser.parse(data);
  }
  /**
   * Run single query and parse raw data
   * @param session Opened Session
   * @param query String query
   * @param params Optional params
   * @returns json result
   * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
   */
  public static async run(
    session: Session,
    query: string,
    params?: any
  ): Promise<any[]> {
    const rawData = await session.readTransaction((tx: any) =>
      tx.run(query, params)
    );
    return await Neo.getInstance().parse(rawData);
  }
  /**
   * Run single cypher query auto manage session and apply transformation to result
   * @param consumer tranformation
   * @param query raw query
   * @param params optional params
   * @returns list of T
   * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
   */
  public static async runAnd<T>(
    consumer: (i: any) => Promise<T>,
    query: string,
    params?: any
  ): Promise<T[]> {
    const reader = await Neo.getInstance().getReader();
    const session = reader.session();
    try {
      return await Promise.all(
        (
          await Neo.run(session, query, params)
        )?.map(async (rp) => await consumer(rp))
      );
    } finally {
      await session.close();
    }
  }
  /**
   * Run single cypher query auto manage session
   * @param consumer tranformation
   * @param query raw query
   * @param params optional params
   * @returns list of T
   * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
   */
  public static async runSQ<T>(query: string, params?: any): Promise<T[]> {
    const reader = await Neo.getInstance().getReader();
    const session = reader.session();
    try {
      return await Neo.run(session, query, params);
    } finally {
      await session.close();
    }
  }
}
