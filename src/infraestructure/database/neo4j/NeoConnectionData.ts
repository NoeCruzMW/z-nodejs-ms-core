/**
 * Connection data for Neo4j
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export class NeoConnectionData {
  public readerUri: string;
  public writerUri: string;
  public user: string;
  public password: string;

  constructor(
    readerUri: string,
    writerUri: string,
    user: string,
    password: string
  ) {
    this.readerUri = readerUri;
    this.writerUri = writerUri;
    this.user = user;
    this.password = password;
  }
  /**
   * Build a NeoConnectionData instance of raw values
   * @param readerUri uri of reader node
   * @param writerUri uri of wirter node
   * @param user user for the authentication
   * @param password user for the authentication
   * @returns NeoConnectionData instance
   */
  public static build(
    readerUri: string,
    writerUri: string,
    user: string,
    password: string
  ): NeoConnectionData {
    return new NeoConnectionData(readerUri, writerUri, user, password);
  }  
  /**
   * Verify if the provided data is empty or null
   * @returns true if the provided data is not empty
   */
  public isValid(): Boolean {
    return (
      this.writerUri != "" &&
      this.readerUri != "" &&
      this.password != "" &&
      this.password != ""
    );
  }
}
