// Response Builder

// BuildResponse returns response by params
export function BuildResponse(code: string, msg: string, body: any): any {
	return {
		code: code,
		msg: msg,
		body: body
	};
}
