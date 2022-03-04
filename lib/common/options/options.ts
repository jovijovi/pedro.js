import {Context, NewContext} from '../context';

// IOptions default option interface
export interface IOptions {
	dryRun?: boolean;
	context: Context;
}

// OptionFunc option initializer function interface
export interface IOptionFunc<T> {
	(arg: T): T;
}

// NewOptions returns new options
export function NewOptions<T extends IOptions>(...optionFunc: IOptionFunc<T>[]): T {
	const opts = <T>{
		dryRun: false,
		context: NewContext(),
	}

	for (const f of optionFunc) {
		f(opts);
	}

	return opts;
}

// WithContext set the context
export function WithContext(c: Context): IOptionFunc<any> {
	return <T extends IOptions>(o: T) => {
		o.context = c;
	};
}

// WithDryRun enable/disable dry run
export function WithDryRun(isDryRun: boolean): IOptionFunc<any> {
	return <T extends IOptions>(o: T) => {
		o.dryRun = isDryRun;
	}
}
