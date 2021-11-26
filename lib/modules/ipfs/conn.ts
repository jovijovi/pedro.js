import {create} from 'ipfs-http-client';
import {IPFSHTTPClient, Options} from 'ipfs-http-client/types/src/types';
import * as log from '../../common/log';

export namespace IPFS {
	export interface Config extends Options {
		enable?: boolean;
	}

	interface IEngine {
		client: IPFSHTTPClient;

		// Ping IPFS node
		Ping();
	}

	export class Engine implements IEngine {
		private readonly _client: IPFSHTTPClient;

		constructor(v: IPFSHTTPClient) {
			this._client = v;
		}

		get client(): IPFSHTTPClient {
			return this._client;
		}

		async Ping(): Promise<boolean> {
			try {
				const id = await this._client.id();
				if (id && id.addresses && id.addresses.length) {
					log.RequestId().fatal('IPFS node(%s:%s) is online',
						this._client.getEndpointConfig().host, this._client.getEndpointConfig().port);
					return true;
				}
			} catch (e) {
				log.RequestId().fatal('IPFS node(%s:%s) is not online, error=%o',
					this._client.getEndpointConfig().host, this._client.getEndpointConfig().port, e.message);
			}

			return false;
		}
	}

	// Connect IPFS node and returns a HTTP client
	export function Connect(cfg: Config): Engine {
		if (!cfg) {
			throw new Error('Cannot found IPFS config');
		} else if (!cfg.enable) {
			return null;
		}

		// Config URL example:
		// http://127.0.0.1:5001
		// new URL('http://127.0.0.1:5001')
		// /ipv4/127.0.0.1/tcp/5001/http
		const client = create(cfg);

		return new Engine(client);
	}
}
