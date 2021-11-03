interface Exp<T> {
}

// Check
// Throw an error message if the express not true
export function Check(exp: Exp<any>, message: string) {
	if (!exp) {
		throw new Error(message);
	}
}
