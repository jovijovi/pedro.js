// Check
// throw an error message if the expression not true
export function Check<T>(exp: T, message: string) {
	if (!exp) {
		throw new Error(message);
	}
}

// Assert
// throw an error message if the expression not true
class Assert<T> {
	private readonly _exp: T;

	constructor(exp: T) {
		this._exp = exp;
	}

	Check<T>(exp: T, message: string) {
		if (!this._exp) {
			return;
		}

		if (!exp) {
			throw new Error(message);
		}
	}
}

// OnlyValid
// check only if the expression is valid.
export function OnlyValid<T>(exp: T): Assert<T> {
	return new Assert<T>(exp);
}
