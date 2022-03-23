import {createClient} from 'redis';
import {RedisClientType} from '@node-redis/client/dist/lib/client';
import {log} from '@jovijovi/pedrojs-log';

export namespace Redis {
	export interface Config {
		// Redis URL
		// Connection string format:
		// redis[s]://[[username][:password]@][host][:port][/db-number]
		url: string;

		// Enable or disable redis
		enable?: boolean;
	}

	export type RedisClient = RedisClientType<any, any>;

	interface IEngine {
		client: RedisClient;

		// Ping redis server from client
		Ping();

		// Close the client's connection to Redis server gracefully
		Close();

		// Forcibly close a client's connection to Redis immediately
		ForceClose();
	}

	export class Engine implements IEngine {
		private readonly _client: RedisClient;

		constructor(v: RedisClient) {
			this._client = v;
		}

		get client(): RedisClient {
			return this._client;
		}

		// Ping redis server from client
		async Ping() {
			try {
				await this._client.ping();
				log.RequestId().info('Connect the redis successfully.');
			} catch (error) {
				log.RequestId().fatal('Connect the redis failed, error=%o', error);
				throw new Error(error);
			}
		}

		// Close the client's connection to Redis server gracefully
		async Close() {
			await this._client.quit();
		}

		// Forcibly close a client's connection to Redis immediately
		async ForceClose() {
			await this._client.disconnect();
		}
	}

	// Connect redis
	export async function Connect(cfg: Config): Promise<Engine> {
		if (!cfg.url) {
			throw new Error('Cannot found redis url');
		}

		const client = createClient({
			url: cfg.url,
		});

		await client.on('error', (err) => log.RequestId().fatal('Connect redis failed, error=%o', err));

		await client.connect();

		return new Engine(client);
	}
}
