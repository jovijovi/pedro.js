import * as yaml from 'js-yaml';
import * as fs from 'fs'
import * as log from '../log';

export namespace config {
	// Prod config filename
	const ProdConfigFileName = 'app.config.yaml'

	// Default config filename
	const defaultConfigFilename = ProdConfigFileName

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
		let serviceConfigFilename: string

		if (filename == undefined) {
			serviceConfigFilename = defaultConfigFilename
			log.RequestId().Info("Loading config file:", defaultConfigFilename)
		} else {
			serviceConfigFilename = filename
			log.RequestId().Info("Loading config file:", filename)
		}

		let contents = fs.readFileSync(serviceConfigFilename, 'utf8');

		setting = yaml.load(contents);
	}

	export function GetYmlConfig(): YmlConfig {
		return setting
	}
}
