// A stack (LIFO)
// Not async safe
export class Stack<T> {
	private _store: T[] = [];
	private readonly _maxLength: number;

	constructor(maxLength: number) {
		this._maxLength = maxLength;
	}

	Length(): number {
		return this._store.length;
	}

	Push(val: T) {
		if (this._store.length < this._maxLength) {
			this._store.push(val);
		}
	}

	Pop(): T {
		return this._store.pop();
	}
}
