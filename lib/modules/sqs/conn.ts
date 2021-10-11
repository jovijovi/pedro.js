import {SQSClient} from '@aws-sdk/client-sqs';
import {Credentials} from '@aws-sdk/types/dist-types/credentials';

export namespace SQS {
	export interface Config {
		accessKey: string;
		secretKey: string;
		endpoint: string;
		region: string;
		disableSSL?: boolean;
	}

	// Connect SQS
	export async function Connect(cfg: Config): Promise<SQSClient> {
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

		// Return new SQS client
		return new SQSClient({
			credentials: credentials,
			endpoint: cfg.endpoint,
			region: cfg.region,
		});
	}
}
