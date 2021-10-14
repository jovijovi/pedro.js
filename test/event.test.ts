import {NSEvent} from '../lib/event';
import * as elliptic from '../lib/common/security/crypto/elliptic';
import assert from 'assert';

const ecdsaCert = `
-----BEGIN CERTIFICATE-----
MIIB4DCCAYagAwIBAgIUfQHOQgzmUnwpNGau9E0qwHHM1l4wCgYIKoZIzj0EAwIw
RzELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAk5ZMQswCQYDVQQHDAJOWTEOMAwGA1UE
CgwFUGVkcm8xDjAMBgNVBAMMBVBlZHJvMB4XDTIxMDkyODA3MDEwNVoXDTIyMDky
MzA3MDEwNVowRzELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAk5ZMQswCQYDVQQHDAJO
WTEOMAwGA1UECgwFUGVkcm8xDjAMBgNVBAMMBVBlZHJvMFYwEAYHKoZIzj0CAQYF
K4EEAAoDQgAEmS8gkAL6lgQ1PRjzI3Z2anmWujt9jkNUemelKi38E3OqSZMu4u4T
4MMLs3PlOWUEDmHx7snpN+1qcsXld2J+dqNTMFEwHQYDVR0OBBYEFKb3ToVNpz67
3JmIxVVb6SZX/at+MB8GA1UdIwQYMBaAFKb3ToVNpz673JmIxVVb6SZX/at+MA8G
A1UdEwEB/wQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIhAJeqZSBW0Jq31f1IZ15P
8NCVBWIsFLAxKaIKImi8tJr0AiA8o18pK9SLtQ+Ekps/2fsLiSI3CA7cPMKCKfXw
8AtNWQ==
-----END CERTIFICATE-----
`

const ecdsaPrivateKey = `
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEII+FTYjTLsV/PhJ6qH1lu35KAoSBCLdaFR1tyvFsvY47oAcGBSuBBAAK
oUQDQgAEmS8gkAL6lgQ1PRjzI3Z2anmWujt9jkNUemelKi38E3OqSZMu4u4T4MML
s3PlOWUEDmHx7snpN+1qcsXld2J+dg==
-----END EC PRIVATE KEY-----
`

const mockEventId = '792db679-f669-42b2-9a75-7ae68da589a4';
const mockEventNamespace = 'foo';
const mockEventVersion = '2';
const mockEventRequestId = '36e9786a-56e1-48bf-b023-b90dc6b8a20d';
const mockEventSender = 'John';
const mockEventFlow = 'EventFlowGoHome';
const mockEventName = 'OpenDoor';
const mockEventSrc = 'DoorIsClosed';
const mockEventPayloadHashString = 'c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646';

let evtAfterSign: NSEvent.Event;

test('NewEvent', () => {
	const event = NSEvent.New();
	console.log("NewEvent=", event);
})

test('SetEventId', () => {
	const event = NSEvent.New();
	event.SetEventId(mockEventId);
	assert.strictEqual(event.data.header.id, mockEventId);
})

test('SetEventNamespace', () => {
	const event = NSEvent.New();
	event.SetEventNamespace(mockEventNamespace);
	assert.strictEqual(event.data.header.namespace, mockEventNamespace);
})

test('SetEventVersion', () => {
	const event = NSEvent.New();
	event.SetEventVersion(mockEventVersion);
	assert.strictEqual(event.data.header.version, mockEventVersion);
})

test('SetRequestId', () => {
	const event = NSEvent.New();
	event.SetRequestId(mockEventRequestId);
	assert.strictEqual(event.data.header.requestId, mockEventRequestId);
})

test('SetSender', () => {
	const event = NSEvent.New();
	event.SetSender(mockEventSender);
	assert.strictEqual(event.data.header.sender, mockEventSender);
})

test('SetFlow', () => {
	const event = NSEvent.New();
	event.SetFlow(mockEventFlow);
	assert.strictEqual(event.data.flow, mockEventFlow);
})

test('SetName', () => {
	const event = NSEvent.New();
	event.SetName(mockEventName);
	assert.strictEqual(event.data.name, mockEventName);
})

test('SetSrc', () => {
	const event = NSEvent.New();
	event.SetSrc(mockEventSrc);
	assert.strictEqual(event.data.src, mockEventSrc);
})

test('SetPayload', () => {
	const event = NSEvent.New();
	event.SetPayload({
		category: "TestCategory",
		id: "2f52ef17-d127-497e-b7ee-a09042c2054d",
		digest: [1, 2, 3],
		raw: [4, 5, 6]
	});
	console.log("Event=%o", event);
})

test('AddPayload', () => {
	const event = NSEvent.New();
	const err = event.AddPayload('2f52ef17-d127-497e-b7ee-a09042c2054d',
		'TestCategory',
		Buffer.from('1234567890'),
		elliptic.SHA256);
	if (!err) {
		console.log("Error=", err);
	}

	console.log("Event=%o", event);

	console.log("EventPayloadHashString=", event.data.payload.digest.toString('hex'));

	assert.strictEqual(Buffer.from(event.data.payload.digest as Uint8Array).toString('hex'), mockEventPayloadHashString);
})

test('Event Sign/Verify', () => {
	const evt = NSEvent.New();
	evt.SetEventNamespace('namespace');
	evt.SetRequestId('dd683066-e68d-4d7b-92f0-64c772403e45');
	evt.SetSender('sender');
	evt.AddPayload('009888ce-4fa8-4ece-9783-f13fe6bc720e',
		'TestCategory',
		Buffer.from('Hello, world!'),
	);
	console.log("Event=", evt);

	const sig = evt.Sign(ecdsaPrivateKey, elliptic.SHA256);
	console.log("Signature=", sig);

	const result = evt.Verify(ecdsaCert, elliptic.SHA256);
	console.log("VerifyResult=", result);
	assert.strictEqual(result, true);

	evtAfterSign = evt;
})

test('Event Marshal/Unmarshal', () => {
	// Get event1 from evtAfterSign
	let evt1 = evtAfterSign;

	// Test marshal
	const evtJson = evt1.Marshal();
	console.log("Event1 Json=", evtJson);
	console.log("Event1=", evt1);

	// Test unmarshal
	const evt2 = NSEvent.Unmarshal(evtJson);
	console.log("Event2=", evt2);
	console.log("Event2.Signature=", evt2.signature);

	// Check equal
	expect(evt2).toEqual(evt1);

	// Check instance
	console.log("Event2 is instance of Event:", evt2 instanceof NSEvent.Event);

	// Test call event2 function after unmarshal
	evt2.SetRequestId('new-req-id-123456');
	console.log("Event2 updated=", evt2);

	// Check not equal
	expect(evt2).not.toEqual(evt1);

	// Unmarshal an empty JSON
	const evt3 = NSEvent.Unmarshal("{}");
	console.log("Event3=", evt3);
})
