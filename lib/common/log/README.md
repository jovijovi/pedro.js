# Pedro Log Package

This submodule is part of [pedro.js](https://github.com/jovijovi/pedro.js) project.

## Install

```shell
npm install @jovijovi/pedrojs-log
```

or

```shell
yarn add @jovijovi/pedrojs-log
```

## Usage

```typescript
import {log} from '@jovijovi/pedrojs-log'

// Print info log
log.RequestId().info("Hello, world!");

// Print trace log
log.RequestId("reqId1").trace("This is a trace msg");

// Print logo
log.logo("MyLogo");
```

## License

[MIT](LICENSE)
