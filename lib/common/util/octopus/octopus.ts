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

import {NewUUID} from '../uuid';

/*
Default edge names.
Examples:

     N3
   /    \
  N1 -- N2 -- N

  next: N1's next is N2
  prev: N2's prev is N1
  parallel: N2's parallel is N4
*/
export const Prev = "prev";
export const Next = "next";
export const Parallel = "parallel";

// Directions
export enum Direction {
	None,       // A -- B
	Forward,    // A -> B
	Backward,   // A <- B
}

// Link interface
interface ILink<T> {
	id: string;             // Link UUID
	src: string;            // Source node
	dst: string;            // Destination node
	direction: Direction;   // Link direction
}

class Link<T> implements ILink<T> {
	readonly id: string;
	readonly dst: string;
	readonly src: string;
	readonly direction: Direction;

	constructor(src: string, dst: string, direction = Direction.Forward) {
		this.id = NewUUID();
		this.src = src;
		this.dst = dst;
		this.direction = direction;
	}

	Dst(direction = Direction.Forward): Node<T> {
		switch (direction) {
			case Direction.Forward || Direction.None:
				return _nodes.get(this.dst);
			case Direction.Backward:
				return _nodes.get(this.src);
		}
	}
}

// TODO:
type Nodes<T> = Map<string, Node<T>>
const _nodes = new Map();

// Links between nodes
// map key: edge name
// map value: link
type Links<T> = Map<any, Link<T>>

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
	id: string;
	header: IHeader<T>;
	payload: IPayload<T>;

	constructor(val: T) {
		this.id = NewUUID();
		this.header = new Header<T>();
		this.payload = new Payload<T>();

		if (val) {
			this.payload.value = val;
		}

		_nodes.set(this.id, this);
	}

	// Append a new node after current node
	Append(val: T, edge: any = Next): Node<T> {
		const next = new Node<T>(val);
		next.header.links.set(Prev, new Link<T>(next.id, this.id));
		this.header.links.set(edge, new Link<T>(this.id, next.id));

		return next;
	}

	// OutDegree returns node's out degree
	OutDegree(): number {
		return this.header.links.size;
	}

	// Connect two nodes with a link
	Link(node: Node<T>, edge: any = Next) {
		if (node) {
			this.header.links.set(edge, new Link<T>(this.id, node.id));
		}
	}

	// Links returns number of node's links
	Links(): Links<T> {
		return this.header.links;
	}

	// Entries return an iterator
	Entries(edge: any = Next, direction = Direction.Forward) {
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
				const link = cur.header.links.get(edge);
				if (link) {
					cur = link.Dst(direction);
				} else {
					cur = undefined;
				}

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
		this._head = this._tail = new Node<T>(val);
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
		this._tail.header.links.set(Next, new Link<T>(this._tail.id, this._head.id));
		this._head.header.links.set(Prev, new Link<T>(this._head.id, this._tail.id));

		return this._tail;
	}

	// Entries return an iterator
	Entries(edge: any = Next, direction = Direction.Forward) {
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
				const link = cur.header.links.get(edge);
				if (link) {
					cur = link.Dst(direction);
				} else {
					cur = undefined;
				}

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
