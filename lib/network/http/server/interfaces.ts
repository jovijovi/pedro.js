import * as core from 'express-serve-static-core';

export interface ITaskHandler {
	RegisterHandlers(router: core.Express): void;
}
