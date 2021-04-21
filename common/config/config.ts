import * as yaml from 'js-yaml';
import * as fs from 'fs'
import * as log from "../log";

export namespace config {
	export class ConfCluster {
		Name:           string;
		Id:             string;
		Description:    string;
	}

	export class YmlConfig {
		Cluster:        ConfCluster
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
