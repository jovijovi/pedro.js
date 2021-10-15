import * as log from '../../../common/log';
import {config} from '../../../common/config';
import jayson from 'jayson/promise'
import {URL} from 'url';
import {IJsonRpcHandler} from '../../../taskhandler/jsonrpc_handler';

export namespace server {
	function RunProxy(port: number, handler: IJsonRpcHandler, provider: string,
	                  relayMethods: string[], relayMethodPrefix: string[]) {
		const methods = {
			all: async function (params, callback) {
				callback(null, await handler.Callback(params));
			},

			relayReq: jayson.Client.http(new URL(provider)),
		};

		const app = new jayson.Server(methods, {
			router: function (method, params) {
				log.RequestId().trace("JSON-RPC Method=%s, params=%s", method, params);
				if (relayMethods.includes(method)) {
					return methods['relayReq'];
				} else {
					for (let i = 0; i < relayMethodPrefix.length; i++) {
						if (method.startsWith(relayMethodPrefix[i])) {
							return methods['relayReq'];
						}
					}
				}

				return methods['all'];
			}
		});

		const s = app.http().listen(port, () => {
			log.RequestId().info('The JSON-RPC-Proxy(%s) is running...', s.address());
		});
	}

	// Support proxy right now
	export function Run(handler: IJsonRpcHandler, provider: string, relayMethods: string[], relayMethodPrefix: string[]) {
		const networkConf = config.GetYmlConfig().network;
		if (networkConf.jsonRpcProxy.enable) {
			RunProxy(networkConf.jsonRpcProxy.port, handler, provider, relayMethods, relayMethodPrefix);
		}
	}
}
