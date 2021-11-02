// StreamToBuffer convert a ReadableStream to a buffer
export const StreamToBuffer = (stream) =>
	new Promise((resolve, reject) => {
		const chunks = [];
		stream.on("error", reject);
		stream.on("data", (chunk) => chunks.push(chunk));
		stream.on("end", () => resolve(Buffer.concat(chunks)));
	});

// StreamToString convert a ReadableStream to a string
export async function StreamToString(stream): Promise<string> {
	return (await StreamToBuffer(stream)).toString();
}
