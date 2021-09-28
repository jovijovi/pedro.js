// Exported Types

export interface Bytes extends ArrayLike<number> {
	toString(encoding?: BufferEncoding, start?: number, end?: number): string;
}
