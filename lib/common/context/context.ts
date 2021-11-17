type ContextType = Map<any, any>;

interface IContext {
	context: ContextType;
	id: string;
}

export interface IOptions {
	parent?: Context;
	id?: string;
}

export class Context implements IContext {
	protected readonly _parent: Context;
	private readonly _id: string;

	constructor(opts?: IOptions) {
		if (opts) {
			this._parent = opts.parent;
			this._id = opts.id;
		}
		this._context = new Map();
	}

	get parent(): Context {
		return this._parent;
	}

	protected _context: ContextType;

	get context(): ContextType {
		return this._context;
	}

	get id(): string {
		return this._id;
	}
}

export function NewContext(opts?: IOptions): Context {
	return new Context(opts);
}
