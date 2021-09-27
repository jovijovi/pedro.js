import {Bytes} from "./types";
import {GetUTCTimeStamp, RFC3339_LIKE} from '../common/util/time';
import {v4 as uuidv4} from 'uuid';

export namespace Event {
	// Header of Data
	export interface Header {
		id: string          // Event ID
		namespace?: string  // Event namespace
		timestamp: string   // Event timestamp(RFC3339)
		version: string     // Event version
		requestId?: string  // Request ID
		sender?: string     // Sender name
	}

	// Payload of Data
	export interface Payload {
		id: string          // Payload ID
		category: string    // Payload category
		digest?: Bytes[]    // Raw data digest
		raw: Bytes[]        // Raw data
	}

	// Data of event
	export interface Data {
		header: Header      // Event header
		flow?: string       // Event flow name
		name?: string       // Event name
		src?: string        // Event source state
		payload?: Payload   // Event payload
	}

	// Event
	export interface Event {
		signature?: Bytes[] // Signature(optional)
		data: Data          // Event data
	}

	const DefaultVersion = '1';

	export function New(): Event {
		return {
			data: {
				header: {
					id: uuidv4(),
					timestamp: GetUTCTimeStamp(RFC3339_LIKE),
					version: DefaultVersion,
				},
			},
		}
	}
}
