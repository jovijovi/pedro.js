# Pedro Loader Package

This submodule is part of [pedro.js](https://github.com/jovijovi/pedro.js) project.

## Install

```shell
npm install @jovijovi/pedrojs-loader
```

or

```shell
yarn add @jovijovi/pedrojs-loader
```

## Usage

```typescript
import {loader} from '@jovijovi/pedrojs-loader';

const fooLoader = () => {
	console.log('Hello world!');
}

loader.Register('foo', fooLoader);
loader.Load('foo');
```

## License

[MIT](LICENSE)
