// A queue (FIFO)
// Not async safe
export class Queue<T> {
	private _store: T[] = [];
	private readonly _maxLength: number;

	constructor(maxLength = 0) {
		this._maxLength = maxLength;
	}

	Length(): number {
		return this._store.length;
	}

	Push(val: T) {
		this._store.push(val);
		if (this._maxLength > 0 && this._store.length > this._maxLength) {
			this._store.shift();
		}
	}

	First(): T {
		if (this._store.length > 0) {
			return this._store[0];
		}
	}

	Shift(): T {
		return this._store.shift();
	}
}
