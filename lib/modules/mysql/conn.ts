import {Sequelize} from 'sequelize';
import {log} from '@jovijovi/pedrojs-common';

export namespace Mysql {
	export interface Config {
		db?: string;
		user?: string;
		secret?: string;
		ip?: string;
		port?: number;
		uri: string;
	}

	// Connect mysql database
	export function Connect(cfg: Config, logging = false): Sequelize {
		if (cfg.uri) {
			return new Sequelize(cfg.uri, {
				logging: logging,
			});
		}

		return new Sequelize(cfg.db, cfg.user, cfg.secret, {
			host: cfg.ip,
			port: cfg.port,
			dialect: 'mysql',
			logging: logging,
		});
	}

	export async function Ping(engine: Sequelize) {
		try {
			await engine.authenticate();
			log.RequestId().info('Connect the mysql successfully.');
		} catch (error) {
			log.RequestId().fatal('Connect the mysql failed, error=%o', error);
			throw new Error('Connect the mysql failed');
		}
	}
}
