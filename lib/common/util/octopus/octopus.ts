/*

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

*/

/*
  Examples:
       N3
     /    \
    N1 -- N2 -- N4

    next: N1's next is N2
    prev: N2's prev is N1
    parallel: N2's parallel is N4
*/
export const Prev = "prev";
export const Next = "next";
export const Parallel = "parallel";

// Links between nodes
// map key: direction
// map value: Node
type Links<T> = Map<any, Node<T>>;

// Header interface
interface IHeader<T> {
	links: Links<T>;
}

// Payload interface
interface IPayload<T> {
	value: T;
}

// Node interface
interface INode<T> {
	header: IHeader<T>;
	payload: IPayload<T>;
}

// Header of node
class Header<T> implements IHeader<T> {
	links: Links<T>;

	constructor() {
		this.links = new Map();
	}
}

// Payload of node
class Payload<T> implements IPayload<T> {
	value: T;
}

// Node
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

	// Append a new node after current node
	Append(val: T, direction: any = Next): Node<T> {
		const next = new Node<T>(val);
		next.header.links.set(Prev, this);
		this.header.links.set(direction, next);

		return next;
	}

	// Connect two nodes with a link
	Link(node: Node<T>, direction: any = Next) {
		if (node) {
			this.header.links.set(direction, node);
		}
	}

	// Links returns node's links
	Links(): Links<T> {
		return this.header.links;
	}

	// Entries return an iterator
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

// Octopus
export class Octopus<T> {
	private readonly _head: Node<T>;
	private _tail: Node<T>;

	constructor(val: T) {
		this._head = this._tail = new Node(val);
	}

	// Head returns octopus' head (1st node)
	Head(): Node<T> {
		return this._head;
	}

	// Tail returns octopus' tail (the last node)
	Tail(): Node<T> {
		return this._tail;
	}

	// Push a new node to octopus
	Push(val: T): Node<T> {
		this._tail = this._tail.Append(val);
		this._tail.header.links.set(Next, this._head);
		this._head.header.links.set(Prev, this._tail);

		return this._tail;
	}

	// Entries return an iterator
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
