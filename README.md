# z-nodejs-ms-core

Core layer for fast and productive building of microservices using TypeScript, express and AWS Cloud.

## Getting Started

Modules

## Demo

WS Deployed in AWS Lambda

User Controller

`user.controller.ts`

```typescript
export const PostController = async (req: Request, res: Response) => {
  try {
    containsParams(req.params, "userId");
    ok(req, res, { name: "Zurckz" });
  } catch (e) {
    error(req, res, e);
  }
};
```

`App.ts`

```typescript
/**
 * Create an instance of Express Application
 */
const app = new EApp();

/**
 * Setup Application 🛠
 */
app.setup(
  getEnvOr("LOCAL_PORT", "5000"),
  (_) => {
    app.configureMiddleware({
      consumer: (e) => e.use(awsMiddleware.eventContext()),
      enabled: true,
      name: "aws",
    });
    app.GET({
      path: "/users/:userId",
      handler: UserController,
    });
  },
  (_) => NeoDB.init()
);

/**
 *  Start server 🚀, if the current environment is local 🏡
 * otherwise export app.
 */
if (getEnv("env") == "local") app.start();
else module.exports = app.express;
```

Lambda Hanlder

`handler.js`

```javascript
const aws = require("aws-serverless-express");
const app = require("./index");
const server = aws.createServer(app);

exports.handler = (e, c) => aws.proxy(server, e, c);
```

## Demo SQS

Hanlde SQS Event

`App.ts`

```typescript
/**
 * Create an instance of Express Application
 */
const sqs = new SQSApp(() => NeoDB.init());

/**
 * Setup Application 🛠
 */
sqs.onRecords = async (records: SQSRecord[]) => {
  for (const record of records) {
    await doSomeThing(record);
  }
  return true;
};

/**
 *  Run test 🚀, if the current environment is local 🏡
 * otherwise export app.
 */
if (getEnv("env") == "local")
  sqs.test(__dirname.replace("dist", "SQSEvent.json"));
else module.exports = sqs;
```

Lambda Hanlder

`handler.js`

```javascript
const zk = require("@zurckz/nodejs-ms-core");
const app = require("./index");

exports.handler = async (e, _) => await zk.SQSApp.proxy(app, e);
```

### Prerequisites

- NodeJS 14

### Dependencies

- neo4j-driver
- tslog
- express

### Installing

Install package

```bash

npm i @zurckz/nodejs-ms-core

```

## Built With

- [npm](https://www.npmjs.com/) - Dependency Management

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see
the [tags on this repository](https://github.com/NoeCruzMW/z-nodejs-ms-core/blob/main/CHANGELOG.md)
.

## Authors

- **Noé Cruz** - _[Developer](https://www.linkedin.com/in/zurckz/)_
