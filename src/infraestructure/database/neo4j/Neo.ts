import * as neo4j from "neo4j-driver";
import { Driver } from "neo4j-driver-core";
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
}
