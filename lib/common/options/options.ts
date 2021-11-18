import {Context, NewContext} from '../context';

// IOptions default option interface
export interface IOptions {
	dryRun?: boolean;
	context: Context;
}

// OptionFunc option initializer function interface
export interface OptionFunc<T> {
	(arg: T): T;
}

// NewOptions returns new options
export function NewOptions<T extends IOptions>(...optionFunc: OptionFunc<T>[]): T {
	let opts = <T>{
		dryRun: false,
		context: NewContext(),
	}

	for (const f of optionFunc) {
		f(opts);
	}

	return opts;
}

// WithContext set the context
export function WithContext(c: Context): OptionFunc<any> {
	return <T extends IOptions>(o: T) => {
		o.context = c;
	};
}

// WithDryRun enable/disable dry run
export function WithDryRun(isDryRun: boolean): OptionFunc<any> {
	return <T extends IOptions>(o: T) => {
		o.dryRun = isDryRun;
	}
}
