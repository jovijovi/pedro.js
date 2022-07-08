import {Postgresql} from '../../lib/modules/postgresql';

test('Connection', async () => {
	// Connect
	const engine = Postgresql.Connect({
		uri: 'postgresql://postgres:example@localhost:5432/mock_pedro',
	});

	// Ping
	await Postgresql.Ping(engine);

	// Raw query
	const addresses = await engine.query("SELECT * FROM mock_animals");
	console.log("Addresses=", addresses);

	const result = await engine.query("SELECT COUNT(1) as count FROM mock_animals", {
		plain: true,
	})
	console.log("Count=", result.count);

	// Close
	await engine.close();
})

test('Connection in another way', async () => {
	// Connect
	// URI: postgresql://postgres:example@localhost:5432/mock_pedro
	const engine = Postgresql.Connect({
		db: "mock_pedro",
		ip: "localhost",
		port: 5432,
		secret: "example",
		user: "postgres",
		uri: "",
	});

	// Ping
	await Postgresql.Ping(engine);

	// Close
	await engine.close();

	// Ping again
	// It will be failed if ping again since the client is already closed
	try {
		await Postgresql.Ping(engine);
	} catch (e) {
		console.debug("Expect Error=", e);
	}
})
