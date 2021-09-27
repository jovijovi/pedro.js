import {Event} from "../lib/event";

test('NewEvent', () => {
	const event = Event.New();
	console.log("NewEvent=", event);
})
