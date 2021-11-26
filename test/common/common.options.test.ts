import {IOptions, NewOptions, OptionFunc, WithContext, WithDryRun} from '../../lib/common/options';
import {NewContext} from '../../lib/common/context';

interface IMyOptions extends IOptions {
	name: string;
	score?: number;
}

export function WithName(name: string): OptionFunc<any> {
	return <T extends IMyOptions>(o: T) => {
		o.name = name;
	};

}

export function WithScore(score: number): OptionFunc<any> {
	return (o: IMyOptions) => {
		o.score = score;
	}
}

test('NewOptions', () => {
	let opts = NewOptions();
	console.log("Options=", opts);
})

test('NewOptions with custom options', () => {
	const opts = NewOptions<IMyOptions>(
		WithContext(NewContext().WithValue('key1', 'value1')),
		WithDryRun(true),
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
