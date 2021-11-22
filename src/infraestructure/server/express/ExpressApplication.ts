import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import morganBody from "morgan-body";
import { EMiddleware, ERoute } from "./IExpress";
import { zL } from "../../logging";

/**
 * Common Express Server Application
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 *
 */
export class EApp {
  private customPort: number = 5000;
  public express: Express;
  protected handlers: ERoute[] = [];

  constructor(initializer?: (e: Express) => void, port?: number) {
    this.express = express();
    this.customPort = port && port >= 0 ? port : this.customPort;
    initializer && initializer(this.express);
  }

  /**
   * Configure route and request handler
   * @param route route data
   */
  public configureRoute(route: ERoute) {
    this.handlers.push(route);
  }

  /**
   * Configure route and request handler
   * @param route route data
   */
  public GET(route: ERoute) {
    this.handlers.push({ verb: "GET", ...route });
  }

  /**
   * Configure route and request handler
   * @param route route data
   */
  public POST(route: ERoute) {
    this.handlers.push({ verb: "POST", ...route });
  }

  /**
   * Configure route and request handler
   * @param route route data
   */
  public PUT(route: ERoute) {
    this.handlers.push({ verb: "PUT", ...route });
  }

  /**
   * Configure route and request handler
   * @param route route data
   */
  public PATCH(route: ERoute) {
    this.handlers.push({ verb: "PATCH", ...route });
  }

  /**
   * Configure route and request handler
   * @param route route data
   */
  public DELETE(route: ERoute) {
    this.handlers.push({ verb: "DELETE", ...route });
  }

  /**
   * Configure custom middleware
   * @param middleware middleware instance
   */
  public configureMiddleware(middleware: EMiddleware) {
    this.defaultMiddlewares.push(middleware);
  }

  /**
   * Setup application
   * @param port port of server
   * @param before callback before initialize setup
   * @param after callback after initialize setup
   */
  public setup(
    port?: number,
    before?: (e: Express) => void,
    after?: (e: Express) => void
  ) {
    this.customPort = port && port >= 0 ? port : this.customPort;
    before && before(this.express);
    this.defaultMiddlewares?.forEach((m) => {
      m.enabled && m.consumer(this.express);
    });
    this.handlers?.forEach((r) => {
      if (r.verb) {
        switch (r.verb!) {
          case "GET":
            this.express.get(r.path, r.handler);
            break;
          case "POST":
            this.express.post(r.path, r.handler);
            break;
          case "PUT":
            this.express.put(r.path, r.handler);
            break;
          case "PATCH":
            this.express.patch(r.path, r.handler);
            break;
          case "DELETE":
            this.express.delete(r.path, r.handler);
            break;
          default:
            this.express.use(r.path, r.handler);
            break;
        }
      } else {
        this.express.use(r.path, r.handler);
      }
    });
    after && after(this.express);
  }
  /**
   * Start express and listent in provided port
   * @param port
   */
  public start(port?: number): void {
    this.customPort = port && port >= 0 ? port : this.customPort;
    this.express.listen(this.customPort, () => {
      zL.info(`http://localhost:${this.customPort} 🚀`);
    });
  }

  /**
   * Default middlewares for build Express Application
   */
  protected defaultMiddlewares: EMiddleware[] = [
    {
      name: "morgan",
      enabled: true,
      default: true,
      consumer: (e: Express) => {
        e.use(morgan("dev"));
      },
    },
    {
      name: "cors",
      enabled: true,
      default: true,
      consumer: (e: Express) => {
        e.use(cors({ origin: true }));
      },
    },
    {
      name: "urlencoded",
      enabled: true,
      default: true,
      consumer: (e: Express) => {
        e.use(express.urlencoded({ extended: true }));
      },
    },
    {
      name: "json",
      enabled: true,
      default: true,
      consumer: (e: Express) => {
        e.use(express.json());
      },
    },
    {
      name: "http-logger",
      enabled: true,
      default: true,
      consumer: (e: Express) => {
        morganBody(e, {
          noColors: true,
          prettify: false
        });
      },
    },
  ];
}
