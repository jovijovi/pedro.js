import {NSEvent} from "../lib/event";

test('NewEvent', () => {
	const event = NSEvent.New();
	console.log("NewEvent=", event);
})
