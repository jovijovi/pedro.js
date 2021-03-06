import {Level} from 'level';

export namespace Leveldb {
	export interface Config {
		dbname: string;
		enable?: boolean;
	}

	// Connect (or Create) database
	export async function Connect(cfg: Config): Promise<Level> {
		if (!cfg.dbname) {
			throw new Error('Cannot found leveldb database name');
		}

		const db = new Level(cfg.dbname);
		if (!db) {
			throw new Error('Connect leveldb failed');
		}

		return db;
	}
}
