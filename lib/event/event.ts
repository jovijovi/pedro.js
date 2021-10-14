import {Bytes} from '../types';
import {NewUUID} from '../common/util/uuid';
import {GetUTCTimeStamp, RFC3339_LIKE} from '../common/util/time';
import * as elliptic from '../common/security/crypto/elliptic';
import * as digest from '../common/security/crypto/digest';
import {plainToClass} from 'class-transformer';

export namespace NSEvent {
	// Default event version
	const DefaultVersion = '1';

	// Header interface
	export interface IHeader {
		id: string;         // Event ID
		namespace: string;  // Event namespace
		timestamp: string;  // Event timestamp(RFC3339)
		version: string;    // Event version
		requestId: string;  // Request ID
		sender: string;     // Sender name
	}

	// Header of Data
	class Header implements IHeader {
		id: string;
		namespace: string;
		requestId: string;
		sender: string;
		timestamp: string;
		version: string;

		constructor() {
			this.id = NewUUID();
			this.timestamp = GetUTCTimeStamp(RFC3339_LIKE);
			this.version = DefaultVersion;
		}
	}

	// Payload interface
	export interface IPayload {
		id: string;         // Payload ID
		category: string;   // Payload category
		digest: Bytes;      // Raw data digest
		raw: Bytes;         // Raw data
	}

	// Payload of Data
	class Payload implements IPayload {
		category: string;
		id: string;
		digest: Bytes;
		raw: Bytes;
	}

	// Data interface
	export interface IData {
		header: IHeader;    // Event header
		flow: string;       // Event flow name
		name: string;       // Event name
		src: string;        // Event source state
		payload: IPayload;  // Event payload
	}

	// Data of event
	class Data implements IData {
		header: NSEvent.IHeader;
		flow: string;
		name: string;
		src: string;
		payload: NSEvent.IPayload;

		constructor() {
			this.header = new Header();
			this.payload = new Payload();
		}
	}

	// Event interface
	export interface IEvent {
		signature: Bytes;   // Signature(optional)
		data: IData;        // Event data

		// SetEventId set event id
		SetEventId(id: string);

		// SetEventNamespace set event namespace
		SetEventNamespace(namespace: string);

		// SetEventVersion set event version
		SetEventVersion(version: string);

		// SetRequestId set event request
		SetRequestId(requestId: string);

		// SetSender set event sender
		SetSender(sender: string);

		// SetFlow set event flow
		SetFlow(flow: string);

		// SetName set event name
		SetName(name: string);

		// SetSrc set event original state
		SetSrc(src: string);

		// SetPayload set event payload
		SetPayload(payload: Payload);

		// AddPayload add event payload
		AddPayload(id: string, category: string, raw: Bytes, hashAlgo?: string): Error;

		// Sign event
		Sign(certificate: string, hashAlgo: string): Bytes;

		// Verify event signature
		Verify(certificate: string, hashAlgo: string): boolean;

		// Marshal event to JSON
		Marshal(): string;
	}

	// Event
	export class Event implements IEvent {
		constructor() {
			this._data = new Data();
		}

		private _signature: Bytes;

		get signature(): Bytes {
			return this._signature;
		}

		set signature(v: Bytes) {
			this._signature = v;
		}

		private _data: IData;

		get data(): IData {
			return this._data;
		}

		set data(v: IData) {
			this._data = v;
		}

		SetEventId(id: string) {
			this._data.header.id = id;
		}

		SetEventNamespace(namespace: string) {
			this._data.header.namespace = namespace;
		}

		SetEventVersion(version: string) {
			this._data.header.version = version;
		}

		SetRequestId(requestId: string) {
			this._data.header.requestId = requestId;
		}

		SetSender(sender: string) {
			this._data.header.sender = sender;
		}

		SetFlow(flow: string) {
			this._data.flow = flow;
		}

		SetName(name: string) {
			this._data.name = name;
		}

		SetSrc(src: string) {
			this._data.src = src;
		}

		SetPayload(payload: Payload) {
			this._data.payload = payload;
		}

		AddPayload(id: string, category: string, raw: Bytes, hashAlgo?: string): Error {
			if (!id) {
				return new Error('payload id is empty');
			} else if (!category) {
				return new Error('category is empty');
			} else if (!raw) {
				return new Error('payload raw is null');
			}

			this._data.payload.id = id;
			this._data.payload.category = category;
			this._data.payload.raw = raw;

			if (hashAlgo) {
				this._data.payload.digest = digest.Get(Buffer.from(raw as Uint8Array), hashAlgo);
			}

			return null;
		}

		// Sign event
		Sign(certificate: string, hashAlgo: string): Bytes {
			const sig = elliptic.ECDSA.Sign(JSON.stringify(this.data), certificate, hashAlgo);
			this.signature = sig;
			return sig;
		};

		// Verify event signature
		Verify(certificate: string, hashAlgo: string): boolean {
			return elliptic.ECDSA.Verify(JSON.stringify(this.data), certificate, Buffer.from(this.signature as Uint8Array), hashAlgo);
		};

		// Marshal event to JSON
		Marshal(): string {
			return JSON.stringify(this);
		};
	}

	export function New(): Event {
		return new Event();
	}

	// Unmarshall event from JSON
	// If you unmarshall an empty JSON, such as "{}", it'll return a new event object.
	export function Unmarshal(s: string): Event {
		const plainObj = JSON.parse(s, (key, value) => {
			switch (key) {
				case 'header':
					if (value) {
						return Object.assign(new Header(), value);
					}
					break;

				case 'payload':
					if (value) {
						return Object.assign(new Payload(), value);
					}
					break;
			}

			if (value && value.type && value.data && value.type == 'Buffer') {
				return Buffer.from(value.data);
			}

			return value;
		});

		// Convert the type from 'Object' to 'Data'
		plainObj._data = Object.assign(new Data(), plainObj._data);

		return plainToClass(Event, plainObj);
	}
}
