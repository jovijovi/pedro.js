// Check throw an error message if the expression not true
export function Check<T>(exp: T, message: string) {
	if (!exp) {
		throw new Error(message);
	}
}
