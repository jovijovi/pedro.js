import {Loader, LoaderMapper} from './types';
import {ErrorInvalidLoader, ErrorInvalidModuleName, ErrorNotFoundModule} from './errors';

// Module loader mapper
const moduleLoaderMapper = NewLoaderMapper();

// New loader mapper
export function NewLoaderMapper(): LoaderMapper {
	return new Map<string, Loader>();
}

// Register module
export function Register(moduleName: string, loader: Loader) {
	if (!moduleName) {
		throw new Error(ErrorInvalidModuleName);
	}

	if (!loader) {
		throw new Error(ErrorInvalidLoader);
	}

	if (moduleLoaderMapper.has(moduleName)) {
		return;
	}

	moduleLoaderMapper.set(moduleName, loader);
}

// Load module
export function Load(moduleName: string, loader?: Loader) {
	if (!moduleName) {
		throw new Error(ErrorInvalidModuleName);
	}

	if (loader) {
		Register(moduleName, loader);
	}

	if (!moduleLoaderMapper.has(moduleName)) {
		throw new Error(ErrorNotFoundModule);
	}

	return moduleLoaderMapper.get(moduleName)();
}
