import * as fs from 'fs'

export namespace Version {
	const versionInfoFilename = 'git.json';
	const unknown = 'unknown';

	let versionInfo: any;

	// GetVersionInfo returns app version info from git.json
	// git.json example:
	// {
	// 	"version": "dev.17585bd",
	// 	"gitCommit": "17585bd",
	// 	"buildTime": "20220301",
	// 	"tsVersion": "Version 4.6.2"
	// }
	export function GetVersionInfo(): any {
		try {
			return versionInfo ? versionInfo : JSON.parse(fs.readFileSync(versionInfoFilename, 'utf8'));
		} catch (e) {
			return {
				version: unknown,
				gitCommit: unknown,
				buildTime: unknown,
				tsVersion: unknown
			};
		}
	}
}
