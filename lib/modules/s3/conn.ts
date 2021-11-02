import {S3Client} from '@aws-sdk/client-s3';
import {Credentials} from '@aws-sdk/types/dist-types/credentials';

export namespace S3 {
	export interface Config {
		accessKey: string;
		secretKey: string;
		endpoint: string;
		region: string;
		forcePathStyle: boolean;
	}

	// Connect S3
	export async function Connect(cfg: Config): Promise<S3Client> {
		if (!cfg.accessKey) {
			throw new Error('AccessKey is empty');
		} else if (!cfg.secretKey) {
			throw new Error('SecretKey is empty');
		} else if (!cfg.endpoint) {
			throw new Error('Endpoint is empty');
		} else if (!cfg.region) {
			throw new Error('Region is empty');
		}

		// Build credentials
		const credentials: Credentials = {
			accessKeyId: cfg.accessKey,
			secretAccessKey: cfg.secretKey,
		}

		// Return new S3 client
		return new S3Client({
			credentials: credentials,
			endpoint: cfg.endpoint,
			region: cfg.region,
			forcePathStyle: cfg.forcePathStyle,
		});
	}
}
