import fs from 'fs';
import {IPFS} from '../../lib/modules/ipfs';

const _mockCID = 'QmYAXgX8ARiriupMQsbGXtKdDyGzWry1YV3sycKw1qqmgH';

test('Connection Failed', async () => {
	// Connect
	const engine = IPFS.Connect({
		url: 'http://127.0.0.1:56789',
		enable: true,
	});

	// Ping
	const isOnline = await engine.Ping();
	if (!isOnline) {
		console.log("IPFS node is not online");
	}
	expect(isOnline).toBeFalsy();
})

test('Connection Successfully', async () => {
	// Connect
	const engine = IPFS.Connect({
		url: 'http://127.0.0.1:5001',
		enable: true,
	});

	// Ping
	const isOnline = await engine.Ping();
	if (!isOnline) {
		console.log("IPFS node is not online");
	}
	expect(isOnline).toBeTruthy();
})

test('Add/Cat File', async () => {
	// Connect
	const engine = IPFS.Connect({
		url: 'http://127.0.0.1:5001',
		enable: true,
	});

	// Ping
	const isOnline = await engine.Ping();
	if (!isOnline) {
		console.log("IPFS node is not online");
	}
	expect(isOnline).toBeTruthy();

	// Add a file
	const content = fs.readFileSync('./test/mock/hello.txt', 'utf8');
	const result = await engine.client.add({
		content: content,
	});

	const cid = result.cid.toString();
	console.log("CID=", result.cid.toString());
	expect(cid).toMatch(_mockCID);

	// Cat a file
	const chunks = [];
	for await (const chunk of engine.client.cat(_mockCID)) {
		chunks.push(chunk)
	}
	const chunkString = chunks.toString();
	console.log("Data=", chunkString);
	expect(chunkString).toMatch(content);
})
