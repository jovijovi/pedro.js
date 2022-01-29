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

import {NewUUID} from '../../uuid';

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
interface ILink<T> {
	id?: string;        // Link UUID
	name?: string;      // Link name
	src: Node<T>;       // Source node
	dst: Node<T>;       // Destination node
	directed?: boolean; // true: directed; false: undirected
	weight?: number;    // Link weight
}

export type LinkOptions<T> = ILink<T>;

class Link<T> implements ILink<T> {
	readonly id: string;
	private readonly _name: string;
	private readonly _src: Node<T>;
	private readonly _dst: Node<T>;
	private readonly _directed: boolean;

	// constructor(src: string, dst: string, directed = true, weight = 0, id = NewUUID()) {
	constructor(opts: LinkOptions<T>) {
		this._src = opts.src;
		this._dst = opts.dst;
		this._directed = opts.directed;
		this._weight = opts.weight ? opts.weight : 0;
		this._name = opts.name;
		this.id = opts.id ? opts.id : NewUUID();
	}

	get name(): string {
		return this._name;
	}

	get directed(): boolean {
		return this._directed;
	}

	private _weight: number;

	get weight(): number {
		return this._weight;
	}

	set weight(value: number) {
		this._weight = value;
	}

	get src(): Node<T> {
		return this._src;
	}

	get dst(): Node<T> {
		return this._dst;
	}
}

// type Nodes<T> = Map<string, Node<T>>

// Links between nodes
// map key: link name
// map value: link
// type Links<T> = Map<any, Link<T>>

// Header interface
interface IHeader {
	id: string;
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
	readonly id: string;

	constructor(id = NewUUID()) {
		this.id = id;
	}
}

// Payload of node
class Payload<T> implements IPayload<T> {
	value: T;

	constructor(val: T) {
		this.value = val;
	}
}

export type NodeOptions<T> = {
	index: number;
	val: T,
	id?: string,
}

export type AppendOptions<T> = LinkOptions<T> & NodeOptions<T>;

// Connector
class Connector<T> {
	Connect<T>(opts: LinkOptions<T>): Link<T> {
		return new Link(opts);
	}

	// // Append a new node(dst) after the specified node(src)
	// Append(opts: AppendOptions<T>): Link<T> {
	// 	const next = new Node<T>({
	// 		val: opts.val,
	// 		id: opts.id,
	// 	});
	//
	// 	return this.Connect({
	// 			directed: opts.directed,
	// 			dst: next,
	// 			name: opts.name,
	// 			src: opts.src,
	// 			weight: opts.weight
	// 		}
	// 	);
	// }
}

// Node
export class Node<T> implements INode<T> {
	readonly index: number;
	header: IHeader;
	payload: Payload<T>;

	constructor(opts: NodeOptions<T>) {
		this.index = opts.index;
		this.header = new Header(opts.id);
		this.payload = new Payload<T>(opts.val);
	}

	// // OutDegree returns node's out degree
	// OutDegree(): number {
	// 	return this.header.links.size;
	// }

	// // Connect two nodes with a link (undirected)
	// Link(dst: Node<T>, linkName: any = Next) {
	// 	if (dst) {
	// 		this.header.links.set(linkName, new Link(this.id, dst.id, false));
	// 	}
	// }

	// // Points from src to dst (directed)
	// PointTo(dst: Node<T>, linkName: any = Next) {
	// 	if (dst) {
	// 		this.header.links.set(linkName, new Link(this.id, dst.id, true));
	// 	}
	// }

	// // Links return node's links
	// Links(): Links {
	// 	return this.header.links;
	// }

	// // Entries return an iterator
	// Entries(linkName: any = Next) {
	// 	let cur = this as Node<T>;
	// 	return {
	// 		[Symbol.iterator]() {
	// 			return this;
	// 		},
	// 		next: () => {
	// 			if (!cur) {
	// 				return {
	// 					done: true,
	// 					value: undefined
	// 				}
	// 			}
	//
	// 			const rsp = {
	// 				done: false,
	// 				value: cur
	// 			};
	// 			const link = cur.header.links.get(linkName);
	// 			if (link) {
	// 				cur = cur._connected.get(link.dst);
	// 			} else {
	// 				cur = undefined;
	// 			}
	//
	// 			return rsp;
	// 		}
	// 	}
	// }
}

//                 1   2   3   4
// const nodeA = [ 1,  0, -1,  1];
// const nodeB = [-1,  1,  0,  0];
// const nodeC = [ 0, -1,  1,  0];
// const nodeD = [ 0,  0,  0, -1];
// const matrix: number[][] = [nodeA, nodeB, nodeC, nodeD];

type Links<T> = Link<T>[];
type Nodes<T> = Node<T>[];
type Matrix = number[][];   // Adjacency matrix
type Entry = number[];      // Adjacency matrix entry

// Octopus
export class Octopus<T> {
	private readonly _head: Node<T>;    // Head
	private _tail: Node<T>;             // Tail
	private _links: Links<T>;           // Link list
	private _nodes: Nodes<T>;           // Node list
	private _matrix: Matrix;            // Adjacency matrix
	private _connector = new Connector();

	constructor(val: T) {
		this._head = this._tail = new Node<T>({
			index: 0,
			val: val,
		});
		this._links = [];
		this._nodes = [];
		this._matrix = [];
		this._nodes.push(this._head);
	}

	// Head returns octopus' head (1st node)
	Head(): Node<T> {
		return this._head;
	}

	// Tail returns octopus' tail (the last node)
	Tail(): Node<T> {
		return this._tail;
	}

	private updateMatrix(entry: number[]) {
		if (this._matrix[this._tail.index]) {
			this._matrix[this._tail.index] = entry;
		} else {
			this._matrix.push(entry);
		}
		this._matrix.push(entry);
	}

	// Push a new node to octopus
	Add(val: T): Node<T> {
		const next = new Node<T>({
			index: this._nodes.length,
			val: val,
		});

		const link = this._connector.Connect({
			directed: true,
			src: this._tail,
			dst: next,
			name: Next,
		});

		this._links.push(link);
		this._nodes.push(next);
		const entry = new Array<number>(this._links.length);
		entry.fill(0);
		entry[this._links.length - 1] = 1;
		this.updateMatrix(entry);

		this._tail = next;

		// this._tail = this._tail.Append(val);
		// this._tail.header.links.set(Next, new Link(this._tail.id, this._head.id));
		// this._head.header.links.set(Prev, new Link(this._head.id, this._tail.id));

		return this._tail;
	}

	// // Entries return an iterator
	// Entries(linkName: any = Next) {
	// 	let cur = this._head;
	// 	return {
	// 		[Symbol.iterator]() {
	// 			return this;
	// 		},
	// 		next: () => {
	// 			if (!cur) {
	// 				return {
	// 					done: true,
	// 					value: undefined
	// 				}
	// 			}
	//
	// 			const rsp = {
	// 				done: false,
	// 				value: cur
	// 			};
	// 			const link = cur.header.links.get(linkName);
	// 			if (link) {
	// 				cur = cur._connected.get(link.dst);
	// 			} else {
	// 				cur = undefined;
	// 			}
	//
	// 			if (cur === this._head) {
	// 				// Traversed to the end(tail)
	// 				// To exit the iterator, set cur to undefined
	// 				cur = undefined;
	// 			}
	//
	// 			return rsp;
	// 		}
	// 	}
	// }
}
