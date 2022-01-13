// A queue (FIFO)
// Not async safe
export class Queue<T> {
	private _store: T[] = [];
	private _first: T;
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
		this._first = this._store[0];
	}

	First(): T {
		return this._first;
	}

	Shift(): T {
		return this._store.shift();
	}
}
