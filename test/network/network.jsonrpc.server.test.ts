import {config} from '@jovijovi/pedrojs-common';
import {jsonrpc} from '../../lib/network';
import {IJsonRpcHandler} from '../../lib/network/json-rpc'

class privateImplHandlers implements IJsonRpcHandler {
	async Callback(params: any) {
		return 42;
	}
}

test('JSON-RPC-Server', () => {
	config.LoadConfig('./conf/app.config.yaml');
	console.log("JSON-RPC-Proxy Config=", config.GetYmlConfig().network.jsonRpcProxy);
	jsonrpc.server.Run(new privateImplHandlers(), "http://localhost:8080", ["hello_world"], ["pedro_"]);
})
