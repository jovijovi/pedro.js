/*********************************
A data structure like an octopus.

        N       N       N
         \      |      /
          N     N     N
           \    |    /
            N---N---N
           /         \
  N---N---N           N---N---N
           \         /
            N---N---N
           /    |    \
          N     N     N
         /      |      \
        N       N       N

 *********************************/

export const Prev = "prev";
export const Next = "next";
export const Parallel = "parallel";

type Links<T> = Map<any, Node<T>>;

interface IHeader<T> {
	links: Links<T>;
}

interface IPayload<T> {
	value: T;
}

interface INode<T> {
	header: IHeader<T>;
	payload: IPayload<T>;
}

class Header<T> implements IHeader<T> {
	links: Links<T>;

	constructor() {
		this.links = new Map();
	}
}

class Payload<T> implements IPayload<T> {
	value: T;
}

export class Node<T> implements INode<T> {
	header: IHeader<T>;
	payload: IPayload<T>;

	constructor(val: T) {
		this.header = new Header();
		this.payload = new Payload();

		if (val) {
			this.payload.value = val;
		}
	}

	Append(val: T, direction: any = Next): Node<T> {
		const next = new Node<T>(val);
		next.header.links.set(Prev, this);
		this.header.links.set(direction, next);

		return next;
	}

	Link(node: Node<T>, direction: any = Next) {
		if (node) {
			this.header.links.set(direction, node);
		}
	}

	Entries(direction: any = Next) {
		let cur = this as Node<T>;
		return {
			[Symbol.iterator]() {
				return this;
			},
			next: () => {
				if (!cur) {
					return {
						done: true,
						value: undefined
					}
				}

				const rsp = {
					done: false,
					value: cur
				};
				cur = cur.header.links.get(direction);

				return rsp;
			}
		}
	}
}

export class Octopus<T> {
	private readonly _head: Node<T>;
	private _tail: Node<T>;

	constructor(val: T) {
		this._head = this._tail = new Node(val);
	}

	Head(): Node<T> {
		return this._head;
	}

	Tail(): Node<T> {
		return this._tail;
	}

	Push(val: T): Node<T> {
		this._tail = this._tail.Append(val);
		this._tail.header.links.set(Next, this._head);
		this._head.header.links.set(Prev, this._tail);

		return this._tail;
	}

	Entries(direction: any = Next) {
		let cur = this._head;
		return {
			[Symbol.iterator]() {
				return this;
			},
			next: () => {
				if (!cur) {
					return {
						done: true,
						value: undefined
					}
				}

				const rsp = {
					done: false,
					value: cur
				};
				cur = cur.header.links.get(direction);

				if (cur === this._head) {
					// Traversed to the end(tail)
					// To exit the iterator, set cur to undefined
					cur = undefined;
				}

				return rsp;
			}
		}
	}
}
