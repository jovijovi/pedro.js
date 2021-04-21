import * as yaml from 'js-yaml';
import * as fs from 'fs'

export namespace config {
	export class ConfCluster {
		name:           string;
		id:             string;
		description:    string;
	}

	export class ConfHTTPServer {
		enable:         boolean;
		port:           number;
	}

	export class ConfHTTPSServer {
		enable:         boolean;
		port:           number;
		mutualTLS:      boolean;
	}

	export class ConfNetwork {
		ip:             string;
		httpServer:     ConfHTTPServer;
		httpsServer:    ConfHTTPSServer;
	}

	export class ConfLog {
		mode:           string;
		level:          string;
	}

	export class YmlConfig {
		cluster:        ConfCluster;
		network:        ConfNetwork;
		log:            ConfLog;
	}

	let setting: YmlConfig

	export function LoadConfig(filename?: string) {
		let contents = fs.readFileSync(filename, 'utf8');
		setting = yaml.load(contents);
	}

	export function GetYmlConfig(): YmlConfig {
		return setting
	}
}
