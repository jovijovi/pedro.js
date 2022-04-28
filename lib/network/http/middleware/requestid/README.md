# Pedro Express Request ID Package

This submodule is part of [pedro.js](https://github.com/jovijovi/pedro.js) project.

## Install

```shell
npm install @jovijovi/express-request-id
```

or

```shell
yarn add @jovijovi/express-request-id
```

## Usage

```typescript
import express from 'express';
import {RequestID} from '@jovijovi/express-request-id';

const app = express();
app.use(RequestID);

app.get('/', function (req, res) {
	res.send('RequestID=' + req[KEY]);
})

app.listen(3000);
```

## License

[MIT](LICENSE)
