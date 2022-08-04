# Changelog

## [v1.1.13](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.13)

Fixes:

- (common/cache): pass through custom options

## [v1.1.12](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.12)

Build:

- Bump packages

## [v1.1.10](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.10)

Fixes:

- (network/http/middleware/twofa-token): node-scheduler has only one timer, for compatibility reasons, this dependency
  is removed.

Build:

- Bump packages

## [v1.1.9](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.9)

Features:

- (modules/sqlite): specify the sqlite3 module explicitly

Test:

- More test code

Build:

- Bump packages

## [v1.1.6](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.6)

Build:

- Bump packages

## [v1.1.5](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.5)

Features:

- (common/util/random): random seed

Build:

- Bump packages

## [v1.1.4](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.4)

Build:

- Bump packages

## [v1.1.2](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.2)

Features:

- (network/http): use custom middleware
- (network/http/middleware/twofa-token): API authorization based on 2FA

## [v1.1.0](https://github.com/jovijovi/pedro.js/releases/tag/v1.1.0)

Features:

- (common/auditor): check only if the expression is valid

## [v1.0.23](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.23)

Features:

- Custom NanoID

Build:

- Bump packages

## [v1.0.21](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.21)

Build:

- Bump packages

## [v1.0.19](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.19)

Build:

- Bump packages

## [v1.0.18](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.18)

Build:

- Bump packages

## [v1.0.17](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.17)

Build:

- Bump packages

## [v1.0.15](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.15)

Build:

- Bump packages

## [v1.0.11](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.11)

Build:

- Bump packages

## [v1.0.10](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.10)

Build:

- Bump packages

## [v1.0.8](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.8)

Features:

- Refactor network

## [v1.0.5](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.5)

Features:

- Export standalone packages

## [v1.0.3](https://github.com/jovijovi/pedro.js/releases/tag/v1.0.3)

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

- Cache

    - Memory Cache Set

      Based on [lru-cache](https://github.com/isaacs/node-lru-cache)

- Message Queue

    - AWS SQS

- Database Helper

    - Dgraph

        - HTTP client

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

    - Custom config item in a microservice

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

    - S3 Client

- Auditor

    - Simple Auditor

- Tracing

    - Based on [OpenTelemetry](https://opentelemetry.io/)

- Context

    - Context chain (parent/child)

- Options

    - An easy-to-use options

- IPFS

    - Based on [ipfs-http-client](https://github.com/ipfs/js-ipfs)
