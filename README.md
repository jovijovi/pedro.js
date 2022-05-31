# Pedro.js

[![npm](https://img.shields.io/npm/v/@jovijovi/pedro.js.svg)](https://www.npmjs.com/package/@jovijovi/pedro.js)
[![GitHub Actions](https://github.com/jovijovi/pedro.js/workflows/Test/badge.svg)](https://github.com/jovijovi/pedro.js)
[![Coverage](https://img.shields.io/codecov/c/github/jovijovi/pedro.js?label=\&logo=codecov\&logoColor=fff)](https://codecov.io/gh/jovijovi/pedro.js)

<https://github.com/jovijovi/pedro.js>

Pedro.js is a microservice toolkit written in [TypeScript](https://www.typescriptlang.org).

## Philosophy

*Go home early from work, spend more time with family and friends, enjoy your life.*

## Features

- HTTP/HTTPS 1.1

  - Based on [express](https://github.com/expressjs/express)

  - Task Handler

    - Health check

      Get health and version info

    - Metrics check

      Get simple metrics info

    - RequestId

- JSON-RPC

- WebSocket

  - Heartbeat

    Based on [ws](https://github.com/websockets/ws)

- Cache

  - Memory Cache Set

    Based on [lru-cache](https://github.com/isaacs/node-lru-cache)

- Message Queue

  - AWS SQS

- Database Helper

  - Dgraph

    - HTTP client helper

  - LevelDB

  - MongoDB

    - Based on [Mongoose](https://github.com/Automattic/mongoose)

  - MySQL

  - PostgreSQL

  - Redis

    - Based on [Node Redis](https://github.com/redis/node-redis)

  - SQLite

- Logger

  - Asynchronous logging

  - Advanced logger

- Certificate

- Configuration

  - Custom config items

- Security Suite

  - Crypto

    - Sign/Verify message by ECDSA

    - Encrypt/Decrypt message by AES

    - Get the digest by specified hash function

    - Get fingerprint by specified algorithm

    - Generate random salt

    - Encrypt/Verify password by pbkdf2

- System

  - System signals handler

- Utilities

  - Converter

    - Stream to Buffer

    - Stream to String

  - File

    - Read dedupe line from file to map

  - NanoID

  - Queue

    - A queue (FIFO), not async safe

  - Random

  - Retry

    - Retry running the function m times with n seconds interval

  - Stack

    - A stack (LIFO), not async safe

  - Time

  - UUID

- Simple Event

  - Sign/Verify signature

  - Marshal/Unmarshal

- Expend Types

- FSM

  - Simple FSM (sync)

- Object Storage

  - S3 Client helper

- Auditor

  - Simple assert

- Tracing

  - Based on [OpenTelemetry](https://opentelemetry.io/)

- Context

  - Context chain (parent/child)

- Options

  - An easy-to-use options

- IPFS

  - IPFS helper based on [ipfs-http-client](https://github.com/ipfs/js-ipfs)

## Quick Guide

- Install dependency

  ```shell
  yarn
  ```

- Build

  ```shell
  yarn build
  ```

- Run

  ```shell
  yarn dist-run --config ./conf/app.config.yaml
  ```

- Clean

  ```shell
  yarn clean
  ```

## Development

### Env

***Node version manager [`nvm`](https://github.com/nvm-sh/nvm) will helpful.***

- node `v16.15.0`
- yarn `v1.22.18`
- ts-node `v10.8.0`
- typescript `4.7.2`

### Makefile

- Build

```shell
make build
```

- Make docker images

```shell
make docker
```

### UnitTest with `ts-jest`

- `Official` <https://kulshekhar.github.io/ts-jest>
- `Github` <https://github.com/kulshekhar/ts-jest>

#### Install `ts-jest`

- Step 1: install packages

```shell
yarn add --dev jest typescript ts-jest @types/jest
```

- Step 2: Init ts-jest config

```shell
yarn ts-jest config:init
```

- Step 3: Config package.json

Add below to package.json

```text
  "scripts": {
    "test": "jest"
  },
```

- Step 4: Run test

```shell
yarn test
```

- Step 5: You will get response like this

```text
yarn run v1.22.18
$ jest
 PASS  test/common/common.log.test.ts
  ● Console

    console.log
      logger closed

      at test/common/common.log.test.ts:39:11

......

Test Suites: 37 passed, 37 total
Tests:       87 passed, 87 total
Snapshots:   0 total
Time:        25.024 s
Ran all test suites.
Done in 26.60s.
```

## Roadmap

- Documents

- Task Handler

  - Support CORS by config

  - Real remote IP

- WebSocket

- GRPC

- TLS

  - Mutual TLS

- Message Queue

  - RabbitMQ

  - Aliyun MNS

  - NSQ

- Database Helper

  - Elasticsearch

- Certificate

- Service Discovery

- Security Suite

  - Crypto

    - Encrypt/Decrypt message by RSA

    - Encrypt/Decrypt message by SM4

  - Simple dongle

  - Desensitization

    - Desensitize by rules

- Utilities

  - Execute command

  - Path

  - Smart String

- Job Scheduler

  - Workflow-based job scheduler

  - Storage adapter

- Distributed Lock

  - etcd

- Object Storage

  - OSS Helper

  - S3 Helper

## Contributors

[`jovijovi`](https://github.com/jovijovi)

## License

[MIT](LICENSE)
