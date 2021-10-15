# Pedro.js

Pedro.js is a microservice toolkit written in [TypeScript](https://www.typescriptlang.org).

## Features

- HTTP/HTTPS 1.1

  - Based on [express](https://github.com/expressjs/express)

  - Task Handler

    - Health check

      Get health and version info

    - Metrics check

      Get simple metrics info

- JSON-RPC

- WebSocket

  - Heartbeat

    Based on [ws](https://github.com/websockets/ws)

- Message Queue

  - AWS SQS

- Database Helper

  - MongoDB

    - Based on [Mongoose](https://github.com/Automattic/mongoose)

  - PostgreSQL

- Logger

  - Asynchronous logging

  - Advanced logger

- Certificate

- Configuration

  - Custom config item in a microservice

- Security Suite

  - Crypto

    - Sign/Verify message by ECDSA

    - Encrypt/Decrypt message by AES

    - Get the digest by specified hash function

- System

  - System signals handler

- Utilities

  - File

    - Read dedupe line from file to map

  - Random

  - Time

  - UUID

- Simple Event

  - Sign/Verify signature

  - Marshal/Unmarshal

- Expend Types

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

- node `v16.11.1`
- yarn `v1.22.15`
- ts-node `v10.3.0`
- typescript `4.4.4`

### Makefile

- Make docker images

```bash
make docker
```

### UnitTest with `ts-jest`

- `Official` <https://kulshekhar.github.io/ts-jest>
- `Github` <https://github.com/kulshekhar/ts-jest>

#### Install `ts-jest`

- Step 1: install packages

```bash
yarn add --dev jest typescript ts-jest @types/jest
```

- Step 2: Init ts-jest config

```bash
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

```bash
yarn test
```

- Step 5: You will see the information like this

```text
yarn run v1.22.11
warning package.json: No license field
$ jest
 PASS  test/log.test.ts
  ✓ #Log (1 ms)

......

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.465 s, estimated 2 s
Ran all test suites.
Done in 1.93s.
```

## Roadmap

- Documents

- Task Handler

  - Support CORS by config

  - RequestId

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

  - MySQL

  - Redis

  - SQLite

  - LevelDB

  - Elasticsearch

- Certificate

- Service Discovery

- Security Suite

  - Crypto

    - Get fingerprint by specified algorithm

    - Encrypt/Verify password by pbkdf2

    - Encrypt/Decrypt message by RSA

    - Encrypt/Decrypt message by SM4

  - Simple dongle

  - Desensitization

    - Desensitize by rules

- Utilities

  - Execute command

  - Path

  - Smart String

  - Retry

- Job Scheduler

  - Workflow-based job scheduler

  - Storage adapter

- Distributed Lock

  - etcd

- Object Storage

  - OSS Helper

  - S3 Client

  - S3 Helper

- FSM

## Contributors

[`jovijovi`](https://github.com/jovijovi)
