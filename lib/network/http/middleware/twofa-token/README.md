# Pedro Express 2FA token Package

This submodule is part of [pedro.js](https://github.com/jovijovi/pedro.js) project.

## Install

```shell
npm install @jovijovi/express-2fa-token
```

or

```shell
yarn add @jovijovi/express-2fa-token
```

## Usage

```typescript
import express from 'express';
import {TwoFAToken} from '@jovijovi/express-2fa-token';

const app = express();
app.use(TwoFAToken);
```

## License

[MIT](LICENSE)
