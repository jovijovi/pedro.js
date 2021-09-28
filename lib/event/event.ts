import {Bytes} from "./types";
import {NewUUID} from "../common/util/uuid";
import {GetUTCTimeStamp, RFC3339_LIKE} from "../common/util/time";

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
		digest: Bytes[];   // Raw data digest
		raw: Bytes[];       // Raw data
	}

	// Payload of Data
	class Payload implements IPayload {
		category: string;
		id: string;
		digest: Bytes[];
		raw: Bytes[];
	}

	// Data interface
	export interface IData {
		header: IHeader;    // Event header
		flow: string;      // Event flow name
		name: string;      // Event name
		src: string;       // Event source state
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
		signature: Bytes[]; // Signature(optional)
		data: IData;        // Event data

		// Sign event
		Sign(privateKey: Buffer, hashAlgo: string): Buffer;

		// Verify event signature
		Verify(privateKey: Buffer, hashAlgo: string): boolean;
	}

	// Event
	class Event implements IEvent {
		signature: Bytes[];
		data: IData;

		constructor() {
			this.data = new Data();
		}

		// TODO: Sign event
		Sign(privateKey: Buffer, hashAlgo: string): Buffer {
			return
		};

		// TODO: Verify event signature
		Verify(privateKey: Buffer, hashAlgo: string): boolean {
			return false;
		};
	}

	export function New(): Event {
		return new Event();
	}
}
