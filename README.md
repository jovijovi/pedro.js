# Pedro.js

Pedro Microservice Kit in [TypeScript](https://www.typescriptlang.org).

## Features

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

- node `v16.10.0`
- yarn `v1.22.11`
- ts-node `v10.2.1`

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

- Step 5: You got this
```text
yarn run v1.22.11
warning package.json: No license field
$ jest
 PASS  test/log.test.ts
  ✓ #Log (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.465 s, estimated 2 s
Ran all test suites.
Done in 1.93s.
```

## Roadmap
