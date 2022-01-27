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
Default Link names. Examples:

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

// Link interface
interface ILink {
	id: string;         // Link UUID
	src: string;        // Source node
	dst: string;        // Destination node
	directed: boolean;  // Link direction
	weight: number;     // Link weight
}

class Link implements ILink {
	readonly id: string;
	readonly _src: string;
	readonly _dst: string;

	constructor(src: string, dst: string, directed = true, weight = 0, id = NewUUID()) {
		this._src = src;
		this._dst = dst;
		this._directed = directed;
		this._weight = weight;
		this.id = id;
	}

	private _directed: boolean;

	get directed(): boolean {
		return this._directed;
	}

	set directed(value: boolean) {
		this._directed = value;
	}

	private _weight: number;

	get weight(): number {
		return this._weight;
	}

	set weight(value: number) {
		this._weight = value;
	}

	get src(): string {
		return this._src;
	}

	get dst(): string {
		return this._dst;
	}
}

// TODO:
type Nodes<T> = Map<string, Node<T>>

// Links between nodes
// map key: link name
// map value: link
type Links = Map<any, Link>

// Header interface
interface IHeader {
	links: Links;
}

// Payload interface
interface IPayload<T> {
	value: T;
}

// Node interface
interface INode<T> {
	header: IHeader;
	payload: IPayload<T>;
}

// Header of node
class Header implements IHeader {
	links: Links;

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
	header: Header;
	payload: Payload<T>;
	_connected: Nodes<T>;

	constructor(val: T, id = NewUUID()) {
		this.id = id;
		this.header = new Header();
		this.payload = new Payload<T>();

		if (val) {
			this.payload.value = val;
		}

		this._connected = new Map<string, Node<T>>();
	}

	// Append a new node after current node (default)
	Append(val: T, id = NewUUID(), linkName: any = Next): Node<T> {
		const next = new Node<T>(val, id);
		next.header.links.set(Prev, new Link(next.id, this.id));
		this.header.links.set(linkName, new Link(this.id, next.id));

		next._connected.set(id, this);
		this._connected.set(id, next);

		return next;
	}

	// OutDegree returns node's out degree
	OutDegree(): number {
		return this.header.links.size;
	}

	// Connect two nodes with a link (undirected)
	Link(dst: Node<T>, linkName: any = Next) {
		if (dst) {
			this.header.links.set(linkName, new Link(this.id, dst.id, false));
		}
	}

	// Points from src to dst (directed)
	PointTo(dst: Node<T>, linkName: any = Next) {
		if (dst) {
			this.header.links.set(linkName, new Link(this.id, dst.id, true));
		}
	}

	// Links return node's links
	Links(): Links {
		return this.header.links;
	}

	// Entries return an iterator
	Entries(linkName: any = Next) {
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
				const link = cur.header.links.get(linkName);
				if (link) {
					cur = cur._connected.get(link.dst);
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
		this._tail.header.links.set(Next, new Link(this._tail.id, this._head.id));
		this._head.header.links.set(Prev, new Link(this._head.id, this._tail.id));

		return this._tail;
	}

	// Entries return an iterator
	Entries(linkName: any = Next) {
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
				const link = cur.header.links.get(linkName);
				if (link) {
					cur = cur._connected.get(link.dst);
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
