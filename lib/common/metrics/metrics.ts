export namespace Metrics {
	// Metrics Info
	interface IMetricsInfo {
		cpuUsage: any
		memoryUsage: any
		uptime: any
		nodejsVersion: string

		toJSON(): string
	}

	class MetricsInfo implements IMetricsInfo {
		cpuUsage: any;
		memoryUsage: any;
		nodejsVersion: string;
		uptime: any;

		constructor() {
			this.cpuUsage = process.cpuUsage();
			this.memoryUsage = process.memoryUsage();
			this.uptime = process.uptime();
			this.nodejsVersion = process.version;
		}

		toJSON(): string {
			return JSON.stringify({
				cpuUsage: this.cpuUsage,
				memoryUsage: this.memoryUsage,
				nodejsVersion: this.nodejsVersion,
				uptime: this.uptime,
			});
		}
	}

	// GetMetricsInfo returns metrics info
	export function GetMetricsInfo(): MetricsInfo {
		return new MetricsInfo();
	}
}
