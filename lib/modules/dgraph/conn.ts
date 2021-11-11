import * as fs from 'fs';
import * as https from 'https';
import * as dgraph from 'dgraph-js-http';
import {DgraphClient} from 'dgraph-js-http/lib/client';
import {DgraphClientStub} from 'dgraph-js-http/lib/clientStub';

export namespace Dgraph {
	export interface Config {
		uri: string;
		userid?: string;
		password?: string;
		cert?: string;
		ca?: string;
		key?: string;
	}

	// New stub
	async function newStub(cfg: Config): Promise<DgraphClientStub> {
		if (cfg.userid && cfg.password) {
			const stub = new dgraph.DgraphClientStub(cfg.uri);
			await stub.login(cfg.userid, cfg.password);
			return stub;
		} else if (cfg.cert && cfg.ca) {
			const cert = fs.readFileSync(cfg.cert, "utf8");
			const ca = fs.readFileSync(cfg.ca, "utf8");
			const key = cfg.key ? fs.readFileSync(cfg.key, "utf8") : '';    // cert key is optional
			const agent = new https.Agent({
				cert,
				ca,
				key,
			});

			return new dgraph.DgraphClientStub(
				cfg.uri,
				{legacyApi: false},
				{agent: agent},
			);
		}

		return new dgraph.DgraphClientStub(cfg.uri);
	}

	// Connect dgraph and returns a HTTP client
	export async function Connect(cfg: Config): Promise<DgraphClient> {
		if (!cfg.uri) {
			throw new Error('Cannot found dgraph uri');
		}

		return new dgraph.DgraphClient(await newStub(cfg));
	}
}
