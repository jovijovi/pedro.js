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
})
