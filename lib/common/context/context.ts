import {randomUUID} from 'crypto';

type ContextType = Map<any, any>;

interface IContext {
	context: ContextType;

	// Context Id
	id: string;

	// Context index
	index: number;
}

export interface IOptions {
	parent?: Context;
	id?: string;
}

export class Context implements IContext {
	protected readonly _parent: Context;
	private readonly _id: string;
	private readonly _index: number;

	constructor(opts?: IOptions) {
		this._index = 0;
		this._context = new Map();

		if (opts) {
			this._parent = opts.parent;
			this._id = opts.id;
		}

		if (this._parent) {
			this._index = this._parent._index + 1;
		}
	}

	protected _context: ContextType;

	get context(): ContextType {
		return this._context;
	}

	get parent(): Context {
		return this._parent;
	}

	get id(): string {
		return this._id;
	}

	get index(): number {
		return this._index;
	}

	// WithValue set key/value
	WithValue(key: any, value: any): Context {
		this._context.set(key, value);
		return this;
	}

	// Trace to the context by index
	Trace(index: number): Context {
		if (this.index == index) {
			return this;
		}

		return this._parent.Trace(index);
	}

	// The length from the start to the current context
	Length(): number {
		return this.index + 1;
	}
}

// NewContext returns new context
export function NewContext(opts?: IOptions): Context {
	return new Context(opts);
}

export interface IBornOptions {
	// Max index value
	max: number;

	// Parent context
	ctx?: Context;

	// ID provider
	idProvider?: () => string;
}

// Born the context chain
export function Born(arg: IBornOptions): Context {
	if (arg.ctx) {
		if (arg.ctx.index == arg.max - 1) {
			return arg.ctx;
		}

		const child = NewContext({
			parent: arg.ctx,
			id: arg.idProvider ? arg.idProvider() : randomUUID(),
		})

		return Born({
			max: arg.max,
			ctx: child,
			idProvider: arg.idProvider,
		});
	}

	const root = NewContext({
		id: arg.idProvider ? arg.idProvider() : randomUUID(),
	})

	return Born({
		max: arg.max,
		ctx: root,
		idProvider: arg.idProvider,
	});
}
