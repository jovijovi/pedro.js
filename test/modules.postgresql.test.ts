import {Postgresql} from "../lib/modules/postgresql";

test('Connection', async () => {
	// Connect
	const engine = Postgresql.Connect({
		uri: 'postgresql://postgres:@localhost:5432/explorer',
	});

	// Ping
	await Postgresql.Ping(engine);

	// Raw query
	const addresses = await engine.query("SELECT * FROM addresses");
	console.log("Addresses=", addresses);

	const result = await engine.query("SELECT COUNT(1) as count FROM addresses", {
		plain: true,
	})
	console.log("Count=", result.count);

	const result2 = await engine.query("SELECT COUNT(1) as count FROM transactions", {
		plain: true,
	})
	console.log("Count=", result2);
})
