import {loader} from '../../lib/loader';

async function FooRun() {
	console.debug("Foo is running...");
}

// Foo loader
const fooLoader = () => {
	FooRun().catch((err) => {
		console.error(err);
	});
}

function BarRun() {
	console.debug("Bar is running...");
}

const barLoader = () => {
	BarRun();
}

test('Load foo', () => {
	// Register 'foo'
	loader.Register('foo', fooLoader);

	// Register 'foo' again
	loader.Register('foo', fooLoader);

	// Load 'foo'
	loader.Load('foo');

	// Load 'foo' again
	loader.Load('foo');
})

test('Load bar', () => {
	loader.Load('bar', barLoader);
})

test('ERROR: invalid module name', () => {
	try {
		loader.Register('', barLoader);
	} catch (e) {
		console.debug("Expected error=", e);
	}

	try {
		loader.Load('');
	} catch (e) {
		console.debug("Expected error=", e);
	}

	try {
		loader.Load(undefined);
	} catch (e) {
		console.debug("Expected error=", e);
	}
})

test('ERROR: invalid loader', () => {
	try {
		loader.Register('bar', undefined);
	} catch (e) {
		console.debug("Expected error=", e);
	}
})

test('ERROR: Load not existed module', () => {
	try {
		loader.Load('not_existed_module');
	} catch (e) {
		console.debug("Expected error=", e);
	}
})

test('New LoaderMapper', () => {
	const myLoaderMapper = loader.NewLoaderMapper();
	if (!myLoaderMapper.has('nothing')) {
		console.debug('Nothing in myLoaderMapper');
	}
})
