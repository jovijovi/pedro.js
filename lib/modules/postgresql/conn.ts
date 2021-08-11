import {Sequelize} from 'sequelize';
import * as log from '../../common/log';

export namespace Postgresql {
	export interface Config {
		db?: string;
		user?: string;
		secret?: string;
		ip?: string;
		port?: number;
		uri: string;
	}

	// Connect postgresql database
	export function Connect(cfg: Config, logging: boolean = false): Sequelize {
		if (cfg.uri) {
			return new Sequelize(cfg.uri, {
				logging: logging,
			});
		}

		return new Sequelize(cfg.db, cfg.user, cfg.secret, {
			host: cfg.ip,
			port: cfg.port,
			dialect: 'postgres',
			logging: logging,
		});
	}

	export async function Ping(engine: Sequelize) {
		try {
			await engine.authenticate();
			log.RequestId().info('Connect the postgresql successfully.');
		} catch (error) {
			log.RequestId().fatal('Connect the postgresql failed, error=%o', error);
			throw new Error('Connect the postgresql failed');
		}
	}
}
