import * as fs from 'fs'

export namespace Version {
	const versionInfoFilename = 'git.json';

	let versionInfo: any;

	// GetVersionInfo returns application version info
	export function GetVersionInfo(): any {
		try {
			if (!versionInfo) {
				versionInfo = JSON.parse(fs.readFileSync(versionInfoFilename, 'utf8'));
				return versionInfo;
			}

			return versionInfo;
		} catch (e) {
			return {};
		}
	}
}
