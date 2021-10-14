import yaml from 'yaml';
import * as fs from 'fs'
import path from 'path';
import * as log from '../log';
import {Command} from 'commander';

export namespace config {
	// Prod config filename
	const ProdConfigFileName = 'app.config.yaml';

	// Default config filename
	const defaultConfigFilename = ProdConfigFileName;

	export class ConfCluster {
		name: string;
		id: string;
		description: string;
	}

	export class ConfHTTPServer {
		enable: boolean;
		port: number;
	}

	export class ConfHTTPSServer {
		enable: boolean;
		port: number;
		mutualTLS: boolean;
	}

	export class ConfJsonRpcProxy {
		enable: boolean;
		port: number;
		mutualTLS: boolean;
	}

	export class ConfNetwork {
		ip: string;
		httpServer: ConfHTTPServer;
		httpsServer: ConfHTTPSServer;
		jsonRpcProxy: ConfJsonRpcProxy;
	}

	export class ConfLog {
		mode: string;
		level: string;
	}

	export class YmlConfig {
		cluster: ConfCluster;
		network: ConfNetwork;
		log: ConfLog;
		custom: any;
	}

	let setting: YmlConfig;

	const helpText = `
Example call:
  $ node ./src/main --help`;

	function GetConfigFilenameFromCmd(must = true): string {
		const program = new Command();
		program
			.option("--config <filename>", 'config filename & path')
			.addHelpText('after', helpText)
			.parse();

		if (must) {
			if (!program.opts().config) {
				console.log(program.helpInformation());
				process.exit(1);
			}
		}

		return program.opts().config;
	}

	export function LoadConfig(filename?: string) {
		let serviceConfigFilename: string;

		if (filename == undefined) {
			const confFile = GetConfigFilenameFromCmd();
			serviceConfigFilename = path.resolve(!confFile ? defaultConfigFilename : confFile);
			log.RequestId().info("Loading config file:", serviceConfigFilename);
		} else {
			serviceConfigFilename = path.resolve(filename);
			log.RequestId().info("Loading config file:", filename);
		}

		let contents = fs.readFileSync(serviceConfigFilename, 'utf8');

		setting = yaml.parse(contents);

		// Set log level
		log.SetLogLevel(setting.log.level);
	}

	export function GetYmlConfig(): YmlConfig {
		return setting;
	}
}
