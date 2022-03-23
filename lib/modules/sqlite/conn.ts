import {Sequelize} from 'sequelize';
import {log} from '@jovijovi/pedrojs-log';

export namespace Sqlite {
	export interface Config {
		// Database uri(sqlite db filename)
		uri: string;

		// Enable or disable
		enable?: boolean;
	}

	export type SqliteClient = Sequelize;

	interface IEngine {
		client: SqliteClient;

		// Ping
		Ping();

		// Close the client's connection gracefully
		Close();
	}

	export class Engine implements IEngine {
		private readonly _client: SqliteClient;

		constructor(v: SqliteClient) {
			this._client = v;
		}

		get client(): SqliteClient {
			return this._client;
		}

		// Ping database from client
		async Ping() {
			try {
				await this._client.authenticate();
				log.RequestId().info('Connect the sqlite successfully.');
			} catch (error) {
				log.RequestId().fatal('Connect the sqlite failed, error=%o', error);
				throw new Error(error);
			}
		}

		// Close all connections used by this instance and free all references so the instance can be garbage collected.
		async Close() {
			await this._client.close();
		}
	}

	// Connect sqlite database
	export function Connect(cfg: Config, logging = false): Engine {
		if (!cfg.uri) {
			throw new Error('Cannot found sqlite url');
		}

		const s = new Sequelize(cfg.uri, {
			logging: logging,
		})

		return new Engine(s);
	}
}
