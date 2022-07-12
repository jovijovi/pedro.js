import {Dgraph} from '../../lib/modules/dgraph';

const _mockData = {
	name: "Pedro",
	age: 1,
	location: {
		type: "Point",
		coordinates: [71, -45],
	},
};

const _mockSchema = `
	name: string @index(exact) .
	age: int .
	location: geo .
`;

test('Connection', async () => {
	// Connect
	const client = await Dgraph.Connect({
		uri: 'http://localhost:8080',
	});

	// Enable debug logs
	client.setDebugMode(true);

	// Drop all data including schema from the Dgraph instance.
	await client.alter({dropAll: true});

	// Set the schema
	await client.alter({schema: _mockSchema});

	// Create a tx
	const txn = client.newTxn();

	// Run a mutation
	await txn.mutate({
		setJson: _mockData,
		commitNow: true     // commit the mutation immediately
	});

	// Run a query
	const query = `
	query all($a: string) {
	  all(func: eq(name, $a))
	  {
	    name
	    age
	    location
	  }
	}`;
	const vars = {$a: "Pedro"};
	const rsp = await client.newTxn().queryWithVars(query, vars);
	const data: any = rsp.data;

	// Print result
	console.log("Data=", data);
	console.log(`Number of items named "Pedro": ${data.all.length}`);
	data.all.forEach(person => console.log("Name=", person.name));
}, 20000)

test('Error: Connection failed', async () => {
	try {
		// Connect with invalid URI
		await Dgraph.Connect({
			uri: '',
		});
	} catch (e) {
		console.debug("Expected Error=", e);
	}

	try {
		// Connect with invalid userid & password
		await Dgraph.Connect({
			userid: 'foobar',
			password: 'example',
			uri: 'http://localhost:8080',
		});
	} catch (e) {
		console.debug("Expected Error=", e);
	}

	try {
		// Connect with invalid cert
		await Dgraph.Connect({
			ca: './test/mock/hello.txt',
			cert: './test/mock/hello.txt',
			key: './test/mock/hello.txt',
			uri: 'http://localhost:8080',
		});
	} catch (e) {
		console.debug("Expected Error=", e);
	}
}, 10000)
