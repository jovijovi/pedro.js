import {IOptionFunc, IOptions} from '../../lib/common/options';
import {context, options} from '../../lib/common';

interface IMyOptions extends IOptions {
	name: string;
	score?: number;
}

export function WithName(name: string): IOptionFunc<any> {
	return <T extends IMyOptions>(o: T) => {
		o.name = name;
	};

}

export function WithScore(score: number): IOptionFunc<any> {
	return (o: IMyOptions) => {
		o.score = score;
	}
}

test('NewOptions', () => {
	let opts = options.NewOptions();
	console.log("Options=", opts);
})

test('NewOptions with custom options', () => {
	const opts = options.NewOptions<IMyOptions>(
		options.WithContext(context.NewContext().WithValue('key1', 'value1')),
		options.WithDryRun(true),
		WithName('foo'),
		WithScore(3.14),
	);

	console.log("Options=", opts);
	console.log("Options.Context=", opts.context);
	console.log("Options.DryRun=", opts.dryRun);
	console.log("Options.Name=", opts.name);
	console.log("Options.Score=", opts.score);

	expect(opts.context.context.get('key1')).toMatch('value1');
	expect(opts.dryRun).toBeTruthy();
	expect(opts.name).toMatch('foo');
	expect(opts.score).toEqual(3.14);
})
