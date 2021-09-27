import mongoose, {Connection} from 'mongoose';

export namespace Mongodb {
	export interface Config {
		enable?: boolean;
		db?: string;
		user?: string;
		secret?: string;
		ip?: string;
		port?: number;
		uri: string;
	}

	// Connect mongodb
	export async function Connect(cfg: Config): Promise<Connection> {
		if (!cfg.uri) {
			throw new Error('Cannot found mongodb uri');
		}

		return mongoose.createConnection(cfg.uri);
	}
}
